import React, { useEffect } from "react";

const ApiTest = () => {
  const BASE_URL = "http://localhost:4000/api/reports";

  useEffect(() => {
    testGetReports();
    testGetReportById();
  }, []);


  const testGetReports = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      console.log("✔ All Reports:", data);
    } catch (err) {
      console.error("❌ Error fetching reports", err);
    }
  };


  const testGetReportById = async () => {
    try {
      const res = await fetch(`${BASE_URL}/rpt-001`);
      const data = await res.json();
      console.log("✔ Report By ID:", data);
    } catch (err) {
      console.error("❌ Error fetching report by id", err);
    }
  };


  const downloadPdf = () => {
    window.open(`${BASE_URL}/rpt-001/pdf`, "_blank");
  };

  return (
    <div  className="">
      <h1 className="text-8xl font-light">API Test Page</h1>

      <button
        onClick={testGetReports}
        style={{ marginRight: 10, padding: 10 }}
      >
        Test Get Reports
      </button>

      <button
        onClick={testGetReportById}
        style={{ marginRight: 10, padding: 10 }}
      >
        Test Get By ID
      </button>

      <button onClick={downloadPdf} style={{ padding: 10 }}>
        Download PDF
      </button>
    </div>
  );
};

export default ApiTest;
