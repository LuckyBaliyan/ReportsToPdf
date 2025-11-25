const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");

const reports = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../sampleData/reports.json"))
);


const getReports = (req, res) => {
  res.json(reports);
};


const getReportById = (req, res) => {
  const report = reports.find(r => r.id === req.params.id);
  if (!report) return res.status(404).json({ message: "Report not found" });
  res.json(report);
};


const createReport = (req, res) => {
  const newReport = req.body;
  reports.push(newReport);
  res.status(201).json({ message: "Report created", data: newReport });
};

const deleteReport = (req, res) => {
  const index = reports.findIndex(r => r.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Report not found" });

  const deletedReport = reports.splice(index, 1);

  // Note: This only deletes from memory, not from the sample JSON file on disk
  res.json({ message: "Report deleted", data: deletedReport[0] });
};

const ejs = require("ejs");

const generatePdf = async (req, res) => {
  const report = reports.find(r => r.id === req.params.id);
  if (!report) return res.status(404).json({ message: "Report not found" });

  try {
    const html = await ejs.renderFile(
      path.join(__dirname, "../views/reportTemplate.ejs"),
      { report } 
    );


    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

 
    await page.setContent(html, { waitUntil: "networkidle0" });

 
    const pdf = await page.pdf({ format: "A4" });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });

    return res.send(pdf);

  } catch (err) {
    console.error("PDF ERROR => ", err);
    return res.status(500).json({ message: "PDF generation failed", err });
  }
};

module.exports = {
  getReports,
  getReportById,
  generatePdf,
  createReport,
  deleteReport,
};

