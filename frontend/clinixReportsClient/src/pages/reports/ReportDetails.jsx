import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchReportById, downloadReportPdf } from "../../services/api";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


export default function ReportDetails() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDownload, setLoadingDownload] = useState(false);



  useEffect(() => {
    async function load() {
      try {
        const data = await fetchReportById(id);
        setReport(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!report) return <div className="text-center py-10">No Report Found</div>;

  const getTypeStyles = (type) => {
    switch (type) {
      case "omega": return "bg-[#36E278] text-green-900 border-0";
      case "omega-advanced": return "bg-purple-100 text-purple-700 border-0";
      case "inflammation": return "bg-pink-100 text-pink-700 border-0";
      case "general": return "bg-yellow-100 text-yellow-700 border-0";
      case "comprehensive": return "bg-blue-500 text-black border-0";
      default: return "bg-gray-100 text-gray-700 border-0";
    }
  };

  const style = getTypeStyles(report.type);

  const handleDownload = async () => {
    setLoadingDownload(true);
    try {
      const blob = await downloadReportPdf(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${report.title}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);

      // Save download history
      const history = JSON.parse(localStorage.getItem("downloadHistory")) || [];
      if (!history.find(r => r.id === id)) {
        history.push({ id, title: report.title, date: new Date().toISOString() });
        localStorage.setItem("downloadHistory", JSON.stringify(history));
      }

      alert("Report downloaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to download report");
    } finally {
      setLoadingDownload(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{report.title}</h1>

      <div className="flex items-center gap-3 mb-6 text-gray-600">
        <span className={`px-3 py-1 bg-[#36E278]/10 ${style} rounded-full capitalize`}>
          {report.type}
        </span>
        <span className="text-sm">{report.date}</span>
      </div>

     
      <button
        onClick={handleDownload}
        disabled={loadingDownload}
        className="px-6 py-3 bg-[#36E278] text-black font-bold rounded-xl shadow hover:opacity-90 mb-6"
      >
        {loadingDownload ? "Downloading..." : "Download PDF"}
      </button>

  
      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3">Patient Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><span className="font-semibold">Name:</span> {report.patient.name}</p>
          <p><span className="font-semibold">Species:</span> {report.patient.species}</p>
          <p><span className="font-semibold">Source:</span> {report.patient.source}</p>
          <p><span className="font-semibold">Barcode:</span> {report.patient.barcode}</p>
        </div>
      </div>

   
      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3">Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(report.metrics).map(([key, value]) => (
            <div key={key} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-sm uppercase">{key}</p>
              <p className="text-lg font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>


      <div className="space-y-6 mb-6">
        {report.sections?.map((sec, index) => (
          <div key={index} className="bg-white shadow rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-2">{sec.heading}</h3>
            <p className="text-gray-700">{sec.content}</p>
          </div>
        ))}
      </div>

      
      <div className="bg-white p-5 shadow rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-3">Component Table</h2>
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-[#36E278]/10">
            <tr>
              {report.table[0].map((head, i) => (
                <th key={i} className="px-3 py-2 text-left font-semibold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {report.table.slice(1).map((row, i) => (
              <tr key={i} className="border-t">
                {row.map((cell, j) => (
                  <td key={j} className="px-3 py-2 text-gray-700">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
   <div className="bg-white shadow rounded-xl p-5 mb-10 space-y-6">
  <h2 className="text-xl font-semibold mb-3">Chart Data Preview</h2>

  {/* Bar Chart */}
  <div>
    <h3 className="font-semibold mb-2">Bar Chart</h3>
    <div className="w-full h-64"> {/* set height here */}
      <Bar
        data={{
          labels: report.chartData.labels,
          datasets: [{
            label: "Values",
            data: report.chartData.values,
            backgroundColor: report.chartData.labels.map(() => "#36E278"),
          }],
        }}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  </div>

  {/* Line Chart */}
  <div>
    <h3 className="font-semibold mb-2">Line Chart</h3>
    <div className="w-full h-64">
      <Line
        data={{
          labels: report.chartData.labels,
          datasets: [{
            label: "Values",
            data: report.chartData.values,
            borderColor: "#36E278",
            backgroundColor: "rgba(54, 226, 120, 0.2)",
            tension: 0.3,
          }],
        }}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  </div>

  {/* Pie Chart */}
  <div>
    <h3 className="font-semibold mb-2">Pie Chart</h3>
    <div className="w-full h-64 max-w-xs mx-auto"> {/* smaller width for pie */}
      <Pie
        data={{
          labels: report.chartData.labels,
          datasets: [{
            label: "Values",
            data: report.chartData.values,
            backgroundColor: report.chartData.labels.map(() => "#36E278"),
          }],
        }}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  </div>
</div>

    


      <p className="text-center text-gray-500 text-sm mt-10">
        © 2025 Clinix Reports. All rights reserved.
      </p>
    </div>
  );
}
