import { useEffect, useState } from "react";
import { downloadReportPdf } from "../services/api";


export default function DownloadHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("downloadHistory")) || [];
    setHistory(stored);
  }, []);

  const handleRedownload = async (id, title) => {
    try {
      const blob = await downloadReportPdf(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to redownload report");
    }
  };

  if (history.length === 0)
    return <div className="text-center py-20">No downloads yet.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Downloaded Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map(r => (
          <div
            key={r.id}
            className="bg-white shadow rounded-xl p-5 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-sm text-gray-500">
                Downloaded on {new Date(r.date).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleRedownload(r.id, r.title)}
              className="px-4 py-2 bg-[#36E278] cursor-pointer text-black rounded-lg font-bold hover:opacity-90"
            >
              Redownload
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
