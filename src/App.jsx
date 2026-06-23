import { useState } from "react";

// jsPDF loaded from CDN via index.html — we'll use window.jspdf.jsPDF

const CompanyHeader = ({ compact = false }) => (
  <div style={{ marginBottom: compact ? 8 : 12 }}>
    <div style={{ fontSize: compact ? 20 : 26, fontWeight: 900, letterSpacing: 3, color: "#1a1a2e", fontFamily: "'Arial Black', sans-serif", textAlign: "center" }}>YS APPARELS</div>
    <div style={{ fontSize: compact ? 7 : 8, color: "#555", lineHeight: 1.6, marginTop: 3, textAlign: "center" }}>
      Plot # 106, Street # 3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore<br />
      ☎ +92 42 35965348-49 &nbsp;✉ yasir@ysapparels.com
    </div>
  </div>
);

function SampleCardFront({ data, onChange }) {
  const f = (name, label, half = false) => (
    <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 14, ...(half ? { flex: 1 } : {}) }}>
      <label style={{ fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}>{label}:</label>
      <div style={{ flex: 1, borderBottom: "1.5px solid #000" }}>
        <input name={name} value={data[name] || ""} onChange={onChange}
          style={{ width: "100%", border: "none", outline: "none", fontSize: 13, background: "transparent", padding: "1px 4px" }} />
      </div>
    </div>
  );
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ display: "inline-block", background: "#000", color: "#fff", fontWeight: 900, fontSize: 16, letterSpacing: 3, padding: "5px 24px" }}>SAMPLE CARD</div>
      </div>
      {f("style", "Style")}
      {f("leather", "Leather")}
      <div style={{ display: "flex", gap: 16 }}>{f("color", "Color", true)}{f("size", "Size", true)}</div>
      {f("typeOfSample", "Type of Sample")}
      <div style={{ display: "flex", gap: 16 }}>{f("season", "Season", true)}{f("brand", "Brand", true)}</div>
      <div style={{ display: "flex", gap: 16 }}>{f("paddingBody", "Padding Body", true)}{f("paddingGms", "Gms", true)}</div>
      <div style={{ display: "flex", gap: 16 }}>{f("sleeves", "Sleeves", true)}{f("sleevesGms", "Gms", true)}</div>
      {f("remarks", "Remarks")}
      <div style={{ borderBottom: "1.5px solid #000", marginBottom: 6 }} />
      <div style={{ borderBottom: "1.5px solid #000", marginBottom: 12 }} />
    </div>
  );
}

const measurements = [
  "Chest 1/2 (1cm below Armhole)", "Waist Height", "Waist 1/2", "Bottom 1/2",
  "Centre Back Length", "Front Length", "Shoulder", "Across Shoulder",
  "Front Across", "Armhole Straight", "Sleeve Length", "Bicep 1/2",
  "Elbow", "Cuff 1/2 Relaxed", "Collar Length From Upper Edge",
  "Front Neck Drop Vertical CF", "Hood Height Top Edge", "Hood Height Centre",
  "Measurements in CMS", "", "", ""
];

function MeasurementsBack({ data, onChange }) {
  const th = { border: "1px solid #999", padding: "5px 6px", textAlign: "left", fontWeight: 700, fontSize: 10, background: "#ddd" };
  const td = { border: "1px solid #ccc", padding: "3px 6px", fontSize: 10 };
  const ci = { width: "100%", border: "none", outline: "none", fontSize: 10, background: "transparent", padding: "1px 2px" };
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: 2, color: "#1a1a2e" }}>MEASUREMENTS</div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr><th style={th}>DESCRIPTION</th><th style={th}>REQUIRED</th><th style={th}>ACTUAL</th><th style={th}>DEVIATION</th></tr>
        </thead>
        <tbody>
          {measurements.map((m, i) => (
            <tr key={i}>
              <td style={{ ...td, background: "#fafafa" }}>{m}</td>
              <td style={td}><input name={`m_req_${i}`} value={data[`m_req_${i}`] || ""} onChange={onChange} style={ci} /></td>
              <td style={td}><input name={`m_act_${i}`} value={data[`m_act_${i}`] || ""} onChange={onChange} style={ci} /></td>
              <td style={td}><input name={`m_dev_${i}`} value={data[`m_dev_${i}`] || ""} onChange={onChange} style={ci} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CollectionCard({ data, onChange }) {
  const td = { border: "1px solid #ccc", padding: "5px 7px" };
  const ci = { width: "100%", border: "none", outline: "none", fontSize: 12, background: "transparent", padding: "1px 2px" };
  const rows = [
    ["Leather","leather"],["Color","color"],["Lining","lining"],
    ["ACC","acc"],["Special Notes","specialNotes"],
    ["Ready to Ship","readyToShip"],["Price","price"]
  ];
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ display: "inline-block", background: "#000", color: "#fff", fontWeight: 900, fontSize: 16, letterSpacing: 3, padding: "5px 24px" }}>SAMPLE CARD</div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <tbody>
          <tr style={{ background: "#e0e0e0" }}>
            <td style={{ ...td, fontWeight: 700, width: "28%" }}>Style</td>
            <td style={td}><input name="style" value={data.style||""} onChange={onChange} style={ci}/></td>
            <td style={{ ...td, fontWeight: 700, width: "28%" }}>Collection</td>
            <td style={td}><input name="collection" value={data.collection||""} onChange={onChange} style={ci}/></td>
          </tr>
          {rows.map(([label, key]) => (
            <tr key={key}>
              <td style={{ ...td, fontWeight: 700, background: "#f5f5f5" }}>{label}</td>
              <td style={td} colSpan={3}><input name={key} value={data[key]||""} onChange={onChange} style={{ ...ci, width: "100%" }}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MaterialSticker({ data, onChange }) {
  const rowStyle = { display: "flex", alignItems: "center", border: "2px solid #000", borderBottom: "none" };
  const lblStyle = { fontWeight: 700, fontSize: 13, padding: "6px 10px", minWidth: 130, borderRight: "2px solid #000" };
  const inpStyle = { flex: 1, border: "none", outline: "none", fontSize: 13, padding: "6px 8px", background: "transparent" };
  return (
    <div>
      <div style={{ border: "2px solid #000" }}>
        {[["date","DATE"],["leather","LEATHER"],["article","ARTICLE"],["colour","COLOUR"]].map(([k,l]) => (
          <div key={k} style={rowStyle}>
            <div style={lblStyle}>{l}:</div>
            <input name={k} value={data[k]||""} onChange={onChange} style={inpStyle}/>
          </div>
        ))}
        <div style={{ display: "flex", border: "2px solid #000", borderBottom: "none" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", borderRight: "2px solid #000" }}>
            <div style={{ ...lblStyle, fontSize: 12 }}>CUSTOMER:</div>
            <input name="customer" value={data.customer||""} onChange={onChange} style={{ ...inpStyle, fontSize: 12 }}/>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <div style={{ ...lblStyle, fontSize: 11, minWidth: 120 }}>LEATHER THICKNESS:</div>
            <input name="leatherThickness" value={data.leatherThickness||""} onChange={onChange} style={{ ...inpStyle, fontSize: 12 }}/>
          </div>
        </div>
        <div style={{ ...rowStyle, borderBottom: "2px solid #000" }}>
          <div style={lblStyle}>REMARKS:</div>
          <input name="remarks" value={data.remarks||""} onChange={onChange} style={inpStyle}/>
        </div>
      </div>
    </div>
  );
}

// ── PDF GENERATORS ────────────────────────────────────────────────────────────
function getJsPDF() {
  if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
  if (window.jsPDF) return window.jsPDF;
  return null;
}

function pdfHeader(doc, w) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("YS APPARELS", w / 2, 7, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.text("Plot # 106, Street # 3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore", w / 2, 11, { align: "center" });
  doc.text("\u260E +92 42 35965348-49    \u2709 yasir@ysapparels.com", w / 2, 14, { align: "center" });
  doc.setDrawColor(0); doc.setLineWidth(0.4);
  doc.line(4, 16, w - 4, 16);
}

function pdfBadge(doc, label, w, y) {
  doc.setFillColor(0, 0, 0);
  const bw = 40, bh = 6;
  doc.rect((w - bw) / 2, y, bw, bh, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(255, 255, 255);
  doc.text(label, w / 2, y + 4.2, { align: "center" });
  doc.setTextColor(0, 0, 0);
  return y + bh + 4;
}

function generateSampleCardPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded. Please refresh the page."); return; }
  const doc = new JsPDF({ unit: "mm", format: [100, 140] });
  const w = 100; let y = 4;

  pdfHeader(doc, w);
  y = 18;
  y = pdfBadge(doc, "SAMPLE CARD", w, y);

  const field = (label, value, yPos) => {
    doc.setFont("helvetica", "bold"); doc.setFontSize(8);
    doc.text(label + ":", 5, yPos);
    doc.setFont("helvetica", "normal");
    doc.setDrawColor(0); doc.setLineWidth(0.3);
    const lx = 5 + doc.getTextWidth(label + ":") + 2;
    doc.line(lx, yPos + 0.5, w - 5, yPos + 0.5);
    if (value) doc.text(value, lx + 1, yPos);
    return yPos + 7;
  };

  const halfField = (label, value, x, maxX, yPos) => {
    doc.setFont("helvetica", "bold"); doc.setFontSize(8);
    doc.text(label + ":", x, yPos);
    doc.setFont("helvetica", "normal");
    const lx = x + doc.getTextWidth(label + ":") + 2;
    doc.setDrawColor(0); doc.setLineWidth(0.3);
    doc.line(lx, yPos + 0.5, maxX, yPos + 0.5);
    if (value) doc.text(value, lx + 1, yPos);
  };

  y = field("Style", data.style || "", y);
  y = field("Leather", data.leather || "", y);
  halfField("Color", data.color || "", 5, 52, y);
  halfField("Size", data.size || "", 55, w - 5, y);
  y += 7;
  y = field("Type of Sample", data.typeOfSample || "", y);
  halfField("Season", data.season || "", 5, 52, y);
  halfField("Brand", data.brand || "", 55, w - 5, y);
  y += 7;
  halfField("Padding Body", data.paddingBody || "", 5, 52, y);
  halfField("Gms", data.paddingGms || "", 55, w - 5, y);
  y += 7;
  halfField("Sleeves", data.sleeves || "", 5, 52, y);
  halfField("Gms", data.sleevesGms || "", 55, w - 5, y);
  y += 7;
  y = field("Remarks", data.remarks || "", y);
  doc.setLineWidth(0.5); doc.line(5, y, w - 5, y); y += 3;
  doc.line(5, y, w - 5, y);

  // Page 2 — Measurements
  doc.addPage([100, 140]);
  y = 4;
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text("MEASUREMENTS", w / 2, 10, { align: "center" });
  y = 14;

  const cols = [52, 16, 16, 16];
  const headers = ["DESCRIPTION", "REQUIRED", "ACTUAL", "DEVIATION"];
  const rh = 5;
  doc.setFillColor(220, 220, 220);
  doc.rect(4, y, 92, rh, "F");
  doc.setDrawColor(150); doc.setLineWidth(0.2);
  doc.rect(4, y, 92, rh);
  doc.setFont("helvetica", "bold"); doc.setFontSize(6.5);
  let cx = 4;
  headers.forEach((h, i) => {
    doc.text(h, cx + 1, y + 3.5);
    cx += cols[i];
    if (i < 3) doc.line(cx, y, cx, y + rh);
  });
  y += rh;

  doc.setFont("helvetica", "normal"); doc.setFontSize(6);
  measurements.forEach((m, i) => {
    if (y > 136) return;
    doc.setFillColor(i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 250 : 255);
    doc.rect(4, y, 92, rh, "F");
    doc.setDrawColor(180); doc.rect(4, y, 92, rh);
    doc.setTextColor(0);
    doc.text(m, 5, y + 3.5);
    cx = 4 + cols[0];
    const vals = [data[`m_req_${i}`]||"", data[`m_act_${i}`]||"", data[`m_dev_${i}`]||""];
    vals.forEach((v, j) => {
      doc.line(cx, y, cx, y + rh);
      if (v) doc.text(v, cx + 1, y + 3.5);
      cx += cols[j + 1];
    });
    y += rh;
  });

  doc.save("YSApparels_SampleCard.pdf");
}

function generateCollectionPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded. Please refresh the page."); return; }
  const doc = new JsPDF({ unit: "mm", format: [100, 140] });
  const w = 100; let y = 4;

  pdfHeader(doc, w);
  y = 18;
  y = pdfBadge(doc, "SAMPLE CARD", w, y);

  const rows = [
    ["Style", data.style||"", "Collection", data.collection||""],
    ["Leather", data.leather||""],
    ["Color", data.color||""],
    ["Lining", data.lining||""],
    ["ACC", data.acc||""],
    ["Special Notes", data.specialNotes||""],
    ["Ready to Ship", data.readyToShip||""],
    ["Price", data.price||""],
  ];

  const rh = 8;
  doc.setDrawColor(150); doc.setLineWidth(0.2);

  rows.forEach((row, i) => {
    if (i === 0) {
      doc.setFillColor(220,220,220); doc.rect(4, y, 92, rh, "F");
      doc.rect(4, y, 92, rh);
      doc.setFont("helvetica","bold"); doc.setFontSize(8);
      doc.text(row[0], 5, y+5.5);
      doc.line(4+46, y, 4+46, y+rh);
      doc.setFont("helvetica","normal"); doc.text(row[1], 5+46, y+5.5);
      doc.line(4+46+24, y, 4+46+24, y+rh);
      doc.setFont("helvetica","bold"); doc.text(row[2], 5+46+24, y+5.5);
      doc.line(4+46+24+24, y, 4+46+24+24, y+rh);
      doc.setFont("helvetica","normal"); doc.text(row[3], 5+46+24+24, y+5.5);
    } else {
      doc.setFillColor(245,245,245); doc.rect(4, y, 28, rh, "F");
      doc.rect(4, y, 92, rh);
      doc.line(4+28, y, 4+28, y+rh);
      doc.setFont("helvetica","bold"); doc.setFontSize(8);
      doc.text(row[0], 5, y+5.5);
      doc.setFont("helvetica","normal");
      doc.text(row[1], 5+28, y+5.5);
    }
    y += rh;
  });

  doc.save("YSApparels_CollectionCard.pdf");
}

function generateStickerPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded. Please refresh the page."); return; }
  const doc = new JsPDF({ unit: "mm", format: [80, 60] });
  const w = 80; let y = 3;

  doc.setFont("helvetica", "bold"); doc.setFontSize(11);
  doc.text("YS APPARELS", w / 2, y + 4, { align: "center" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(5);
  doc.text("Plot # 106, Street # 3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore  \u260E +92 42 35965348-49", w / 2, y + 8, { align: "center" });
  y += 11;

  const rows = [
    ["DATE", data.date||"", null, null],
    ["LEATHER", data.leather||"", null, null],
    ["ARTICLE", data.article||"", null, null],
    ["COLOUR", data.colour||"", null, null],
    ["CUSTOMER", data.customer||"", "LEATH. THICK.", data.leatherThickness||""],
    ["REMARKS", data.remarks||"", null, null],
  ];

  const rh = 6.5;
  doc.setDrawColor(0); doc.setLineWidth(0.4);

  rows.forEach((row) => {
    doc.rect(3, y, 74, rh);
    doc.setFont("helvetica","bold"); doc.setFontSize(7.5);
    if (row[2]) {
      doc.text(row[0]+":", 4, y+4.3);
      doc.line(3+37, y, 3+37, y+rh);
      doc.setFont("helvetica","normal"); doc.text(row[1], 4+22, y+4.3);
      doc.setFont("helvetica","bold"); doc.text(row[2]+":", 4+37, y+4.3);
      doc.setFont("helvetica","normal"); doc.text(row[3], 4+37+22, y+4.3);
    } else {
      doc.text(row[0]+":", 4, y+4.3);
      doc.setFont("helvetica","normal"); doc.text(row[1], 4+24, y+4.3);
    }
    y += rh;
  });

  doc.save("YSApparels_MaterialSticker.pdf");
}

const TABS = [
  { id: "sample", label: "Sample Card" },
  { id: "collection", label: "Collection Card" },
  { id: "sticker", label: "Material Sticker" },
];

export default function App() {
  const [tab, setTab] = useState("sample");
  const [sampleData, setSampleData] = useState({});
  const [collData, setCollData] = useState({});
  const [stickerData, setStickerData] = useState({});

  const handleS = e => setSampleData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleC = e => setCollData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleST = e => setStickerData(p => ({ ...p, [e.target.name]: e.target.value }));

  const reset = () => {
    if (tab === "sample") setSampleData({});
    if (tab === "collection") setCollData({});
    if (tab === "sticker") setStickerData({});
  };

  const handlePDF = () => {
    if (tab === "sample") generateSampleCardPDF(sampleData);
    if (tab === "collection") generateCollectionPDF(collData);
    if (tab === "sticker") generateStickerPDF(stickerData);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", fontFamily: "Arial, sans-serif" }}>
      <div style={{ background: "#1a1a2e", padding: "14px 20px", textAlign: "center" }}>
        <div style={{ color: "#fff", fontWeight: 900, fontSize: 20, letterSpacing: 3 }}>YS APPARELS</div>
        <div style={{ color: "#c9a84c", fontSize: 9, letterSpacing: 2, marginTop: 2 }}>DIGITAL FORMS SYSTEM</div>
      </div>

      <div style={{ display: "flex", background: "#fff", borderBottom: "2px solid #e0e0e0", paddingLeft: 16 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: "12px 20px", border: "none", background: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
              color: tab === t.id ? "#1a1a2e" : "#888",
              borderBottom: tab === t.id ? "3px solid #1a1a2e" : "3px solid transparent", marginBottom: -2 }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 600, margin: "20px auto", padding: "0 12px" }}>
        <div style={{ background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <CompanyHeader compact={tab === "sticker"} />
          <hr style={{ margin: "10px 0 16px", border: "none", borderTop: "2px solid #1a1a2e" }} />

          {tab === "sample" && <><SampleCardFront data={sampleData} onChange={handleS}/><MeasurementsBack data={sampleData} onChange={handleS}/></>}
          {tab === "collection" && <CollectionCard data={collData} onChange={handleC}/>}
          {tab === "sticker" && <MaterialSticker data={stickerData} onChange={handleST}/>}

          <div style={{ background: "#e8f4e8", border: "1px solid #a0cca0", borderRadius: 6, padding: "8px 12px", marginTop: 16, fontSize: 11, color: "#2a5a2a" }}>
            ✅ PDF downloads at exact size — no print settings needed. Just open and print.
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button onClick={handlePDF}
              style={{ flex: 1, padding: "11px 0", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 7, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              ⬇️ Download PDF
            </button>
            <button onClick={reset} style={{ padding: "11px 18px", background: "transparent", color: "#888", border: "1.5px solid #ddd", borderRadius: 7, fontSize: 13, cursor: "pointer" }}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
