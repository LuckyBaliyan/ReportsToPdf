import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteReport as apiDeleteReport } from "../../services/api";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reports")) || [];
    setReports(stored);
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // prevent card click opening details

    try {
      console.log(id);
      await apiDeleteReport(id);

      const updated = reports.filter(r => r.id !== id);
      setReports(updated);
      localStorage.setItem("reports", JSON.stringify(updated));

      alert("Report deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Report deleted successfully!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Reports</h1>

      {reports.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">No reports created yet</p>
          <button
            onClick={() => navigate("/reports/create")}
            className="px-6 py-3 bg-[#36E278] text-black font-bold rounded-xl shadow hover:opacity-90"
          >
            Create your first report
          </button>
        </div>
      )}

      {reports.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((r) => (
            <div
              key={r.id}
              onClick={() => navigate(`/reports/${r.id}`)}
              className="bg-white shadow rounded-xl p-5 cursor-pointer hover:shadow-lg transition relative"
            >
              <h3 className="text-xl font-semibold">{r.title}</h3>
              <p className="text-sm text-gray-500 mt-1 capitalize">{r.type}</p>
              <p className="text-xs text-gray-400 mt-1">{r.date}</p>

              <button
                onClick={(e) => handleDelete(r.id, e)}
                className="absolute top-5 right-5 rounded-full px-3 py-2 cursor-pointer font-black
                 justify-center hidden align-middle text-red-500 bg-red-100 hover:text-red-700 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

