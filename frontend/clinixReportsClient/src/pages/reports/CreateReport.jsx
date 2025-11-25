import { useNavigate } from "react-router-dom";

const types = [
  { id: "omega", label: "Omega Analysis" },
  { id: "omega-advanced", label: "Advanced Omega Profile" },
  { id: "inflammation", label: "Inflammation Biomarker" },
  { id: "general", label: "General Health Report" },
  { id: "comprehensive", label: "Comprehensive Profile" },
];

export default function CreateReport() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Select Report Type</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {types.map((t) => (
          <div
            key={t.id}
            onClick={() => navigate(`/create-report/form?type=${t.id}`)}
            className="bg-white shadow p-6 rounded-xl cursor-pointer hover:bg-gray-100 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{t.label}</h3>
            <p className="text-gray-500">{t.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
