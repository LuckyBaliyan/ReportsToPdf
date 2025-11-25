import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
});


export const fetchAllReports = async () => {
  const res = await API.get("/api/reports");
  return res.data;
};

export async function fetchReportById(reportId) {
  try {
    console.log("REQUEST TO: ", `/api/reports/${reportId}`);
    const res = await API.get(`/api/reports/${reportId}`);
    console.log("RESPONSE: ", res.data);
    return res.data;
  } catch (error) {
    console.error("AXIOS ERROR:", error.response?.data || error.message);
    throw new Error("Failed to fetch report by ID");
  }
}

export async function createReport(reportPayload) {
  const res = await API.post("/api/reports", reportPayload);
  return res.data;
}

export async function deleteReport(id) {
  try {
    const res = await API.delete(`/api/reports/${id}`);
    return res.data;
  } catch (err) {
    console.error("DELETE ERROR:", err);
    throw err;
  }
}

export const downloadReportPdf = async (id) => {
  try {
    const res = await API.get(`/api/reports/${id}/pdf`, {
      responseType: "blob",
    });
    return res.data;
  } catch (err) {
    console.error("PDF DOWNLOAD ERROR:", err.response?.data || err.message);
    throw err;
  }
};