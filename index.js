require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const db = require("./config/mongoose");
const port = process.env.PORT || 3008;
const app = express();
const fs = require("fs");
const numWords = require("num-words");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const path = require("path");
app.use(express.static("./views"));
//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// use express router
app.post("/generateOrder", async (req, res) => {
  try {
    let data = req.body;

    for (let i = 0; i < data.length; i++) {
      data[i].amount =
        data[i].mrp -
        ((data[i].mrp * data[i].discount) / 100) * data[i].quantity;
      data[i].gst = ((data[i].amount * 18) / 100).toFixed(2);
    }

    let subTotal = 0;
    let totalGst = 0;
    for (let i = 0; i < data.length; i++) {
      subTotal += data[i].amount;
      totalGst += parseInt(data[i].gst);
    }
    const rupee = parseInt(subTotal + totalGst).toFixed(2);
    const amountInWords = numWords(rupee);
    data[0].subtotal = parseInt(subTotal.toFixed(2));
    data[0].totalGst = parseInt(totalGst.toFixed(2));
    data[0].total = subTotal + totalGst;
    data[0].words = amountInWords;

    const html = await ejs.renderFile("./views/home.ejs", { data });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      printBackground: true,
      format: "A3",
      margin: {
        top: "20mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
    });

    // fs.writeFileSync("my-page.pdf", pdfBuffer);
    await browser.close();
    res.send({
      file:
        "data:application/pdf;base64," +
        Buffer.from(pdfBuffer).toString("base64"),
      fileName: "Package.pdf",
      error: false,
    });
  } catch (err) {
    console.log(err, "error");
  }
});

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
