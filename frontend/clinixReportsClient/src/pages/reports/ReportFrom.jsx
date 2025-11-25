import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createReport as apiCreateReport } from "../../services/api";
import { v4 as uuidv4 } from "uuid";

function MetricInput({ name, value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label className="w-32 text-sm text-gray-600">{name}</label>
      <input
        type="number"
        step="any"
        value={value ?? ""}
        onChange={(e) => onChange(name, e.target.value)}
        className="flex-1 border rounded px-2 py-1"
      />
    </div>
  );
}

export default function CreateReportForm() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const type = params.get("type") || "default";

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      id: "",
      title: "",
      date: "",
      type,

      patient: {
        name: "",
        species: "",
        source: "",
        barcode: "",
      },

    
      metrics: {
        valueA: 0,
        valueB: 0,
        valueC: 0,
      },

      sections: [
        { heading: "Introduction", content: "" },
      ],

      table: [
        ["Component", "Value"],
      ],

      chartData: {
        labels: ["EPA", "DHA","FFA","LMA"],
        values: [1.0, 3.0,5.0,6.0],
      },
    });
  }, [type]);

  if (!form) return <div className="p-6">Loading...</div>;

  function setField(path, value) {
    setForm((prev) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let ref = next;
      for (let i = 0; i < keys.length - 1; i++) ref = ref[keys[i]];
      ref[keys[keys.length - 1]] = value;
      return next;
    });
  }

  function setMetric(name, value) {
    setForm((prev) => ({
      ...prev,
      metrics: { ...prev.metrics, [name]: parseFloat(value) || 0 },
    }));
  }

  function updateSection(i, key, value) {
    setForm((prev) => {
      const copy = [...prev.sections];
      copy[i] = { ...copy[i], [key]: value };
      return { ...prev, sections: copy };
    });
  }

  function addSection() {
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, { heading: "New Section", content: "" }],
    }));
  }

  function addTableRow() {
    setForm((prev) => ({
      ...prev,
      table: [...prev.table, ["", ""]],
    }));
  }

  async function handleSave(e) {
    e.preventDefault();

    if (!form.title.trim()) return alert("Enter report title");
    if (!form.patient.name.trim()) return alert("Enter patient name");

    const newReport = {
      ...form,
      id: form.id || `rpt-${uuidv4().slice(0, 8)}`,
      date: form.date || new Date().toISOString().slice(0, 10),
    };

    try {
      setSaving(true);

 
      try {
        await apiCreateReport(newReport);
      } catch (err) {
        console.warn("Backend failed -> storing locally instead");
      }

      const all = JSON.parse(localStorage.getItem("reports") || "[]");
      all.unshift(newReport);
      localStorage.setItem("reports", JSON.stringify(all));

      navigate("/myreports");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Create Report — {type}</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 rounded-xl shadow">

   
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Report title"
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setField("date", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

    
        <div>
          <h3 className="font-semibold mb-2">Patient</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              placeholder="Patient name"
              value={form.patient.name}
              onChange={(e) => setField("patient.name", e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              placeholder="Species"
              value={form.patient.species}
              onChange={(e) => setField("patient.species", e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              placeholder="Source"
              value={form.patient.source}
              onChange={(e) => setField("patient.source", e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              placeholder="Barcode"
              value={form.patient.barcode}
              onChange={(e) => setField("patient.barcode", e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>
        </div>


        <div>
          <h3 className="font-semibold mb-3">Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.keys(form.metrics).map((m) => (
              <MetricInput key={m} name={m} value={form.metrics[m]} onChange={setMetric} />
            ))}
          </div>
        </div>


        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Sections</h3>
            <button type="button" onClick={addSection} className="text-sm text-[#36E278]">+ Add Section</button>
          </div>

          {form.sections.map((s, i) => (
            <div key={i} className="p-3 border border-gray-300 rounded space-y-2">
              <input
                value={s.heading}
                onChange={(e) => updateSection(i, "heading", e.target.value)}
                className="w-full border-b border-gray-300 pb-1 font-semibold"
              />
              <textarea
                value={s.content}
                onChange={(e) => updateSection(i, "content", e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-2"
              />
            </div>
          ))}
        </div>

  
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Table</h3>
            <button type="button" onClick={addTableRow} className="text-sm text-[#36E278]">+ Add Row</button>
          </div>

          {form.table.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-2 mb-2">
              <input
                value={row[0]}
                onChange={(e) => {
                  const t = [...form.table];
                  t[rIdx][0] = e.target.value;
                  setField("table", t);
                }}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
              />
              <input
                value={row[1]}
                onChange={(e) => {
                  const t = [...form.table];
                  t[rIdx][1] = e.target.value;
                  setField("table", t);
                }}
                className="w-40 border border-gray-300 rounded px-2 py-1"
              />
            </div>
          ))}
        </div>

  
        <div>
          <h3 className="font-semibold">Chart Data</h3>
          <div className="grid grid-cols-2 gap-3">
            <textarea
              rows={2}
              value={form.chartData.labels.join(",")}
              onChange={(e) =>
                setField(
                  "chartData.labels",
                  e.target.value.split(",").map((s) => s.trim())
                )
              }
              className="border border-gray-300 rounded px-2 py-1"
            />
            <input
              value={form.chartData.values.join(",")}
              onChange={(e) =>
                setField(
                  "chartData.values",
                  e.target.value
                    .split(",")
                    .map((v) => parseFloat(v) || 0)
                )
              }
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            disabled={saving}
            type="submit"
            className="px-6 py-2 bg-[#36E278] text-black rounded font-semibold"
          >
            {saving ? "Saving..." : "Create Report"}
          </button>
        </div>
      </form>
    </div>
  );
}


