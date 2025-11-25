const express = require("express");
const router = express.Router();

const {
  getReports,
  getReportById,
  generatePdf,
  createReport,
  deleteReport,
} = require("../controllers/reportController");

router.get("/", getReports);
router.get("/:id", getReportById);
router.delete("/:id", deleteReport);
router.get("/:id/pdf", generatePdf);
router.post("/", createReport);

module.exports = router;

