import { useState } from "react";

function getJsPDF() {
  if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
  if (window.jsPDF) return window.jsPDF;
  return null;
}

// ── SAMPLE CARD PDF ───────────────────────────────────────────────────────────
// Page 1: front top-left (5,5), Page 2: back top-right (105,5)
// Card size: 100×140mm

function generateSampleCardPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded."); return; }
  const doc = new JsPDF({ unit: "mm", format: [210, 297] });
  const CW = 100, CH = 140;

  function drawFront(ox, oy) {
    // Outer border
    doc.setDrawColor(0); doc.setLineWidth(0.8);
    doc.rect(ox, oy, CW, CH);

    // Header black bar
    doc.setFillColor(0, 0, 0);
    doc.rect(ox, oy, CW, 16, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text("YS APPARELS", ox + CW / 2, oy + 7, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.text("THE 2ND SKIN  ·  LEATHER & LEATHER GARMENTS", ox + CW / 2, oy + 12, { align: "center" });

    // SAMPLE CARD badge
    doc.setFillColor(0, 0, 0);
    doc.rect(ox + 20, oy + 18, 60, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text("SAMPLE CARD", ox + CW / 2, oy + 23.5, { align: "center" });

    // Fields
    const fields = [
      { label: "STYLE", value: data.style, h: 11 },
      { label: "LEATHER", value: data.leather, h: 11 },
      { label: "COLOR / SIZE", value: `${data.color||""}${data.size ? "  /  " + data.size : ""}`, h: 11 },
      { label: "TYPE OF SAMPLE", value: data.typeOfSample, h: 11 },
      { label: "SEASON / BRAND", value: `${data.season||""}${data.brand ? "  /  " + data.brand : ""}`, h: 11 },
      { label: "PADDING BODY / GMS", value: `${data.paddingBody||""}${data.paddingGms ? "  /  " + data.paddingGms : ""}`, h: 11 },
      { label: "SLEEVES / GMS", value: `${data.sleeves||""}${data.sleevesGms ? "  /  " + data.sleevesGms : ""}`, h: 11 },
      { label: "REMARKS", value: data.remarks, h: 13 },
    ];

    let y = oy + 28;
    doc.setDrawColor(0); doc.setLineWidth(0.3);

    fields.forEach((f) => {
      // Row border
      doc.rect(ox + 2, y, CW - 4, f.h);
      // Label cell background
      doc.setFillColor(220, 220, 220);
      doc.rect(ox + 2, y, 30, f.h, "F");
      doc.setDrawColor(0); doc.rect(ox + 2, y, CW - 4, f.h);
      doc.line(ox + 32, y, ox + 32, y + f.h);
      // Label text
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(0, 0, 0);
      doc.text(f.label, ox + 3, y + f.h / 2 + 1.2);
      // Value text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      if (f.value) doc.text(String(f.value), ox + 34, y + f.h / 2 + 1.5);
      y += f.h;
    });

    // Double line divider
    doc.setLineWidth(0.6);
    doc.line(ox + 2, y + 2, ox + CW - 2, y + 2);
    doc.line(ox + 2, y + 5, ox + CW - 2, y + 5);

    // Footer
    doc.setFillColor(0, 0, 0);
    doc.rect(ox, oy + CH - 9, CW, 9, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(4.2);
    doc.setTextColor(200, 200, 200);
    doc.text("Plot #106, Street #3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore  |  +92 42 35965348-49  |  yasir@ysapparels.com", ox + CW / 2, oy + CH - 3.5, { align: "center" });

    // Cut marks
    doc.setDrawColor(150); doc.setLineWidth(0.2);
    doc.setLineDashPattern([2, 2], 0);
    doc.line(ox, oy + CH, ox + CW + 5, oy + CH);
    doc.line(ox + CW, oy - 3, ox + CW, oy + CH + 3);
    doc.setLineDashPattern([], 0);
  }

  function drawBack(ox, oy) {
    const measurements = [
      "Chest 1/2 (1cm below Armhole)", "Waist Height", "Waist 1/2",
      "Bottom 1/2", "Centre Back Length", "Front Length", "Shoulder",
      "Across Shoulder", "Front Across", "Armhole Straight",
      "Sleeve Length", "Bicep 1/2", "Elbow", "Cuff 1/2 Relaxed",
      "Collar Lgth From Upper Edge", "Front Neck Drop Vertical CF",
      "Hood Height Top Edge", "Hood Height Centre", "Measurements in CMS",
      "", "", ""
    ];

    doc.setDrawColor(0); doc.setLineWidth(0.8);
    doc.rect(ox, oy, CW, CH);

    // Header
    doc.setFillColor(0, 0, 0);
    doc.rect(ox, oy, CW, 14, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.text("MEASUREMENTS", ox + CW / 2, oy + 7, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.text("YS APPARELS  ·  THE 2ND SKIN", ox + CW / 2, oy + 11.5, { align: "center" });

    // Table header
    const cols = [50, 15, 15, 16];
    const heads = ["DESCRIPTION", "REQUIRED", "ACTUAL", "DEVIATION"];
    let ty = oy + 16;
    const rh = (CH - 26) / measurements.length;

    doc.setFillColor(50, 50, 50);
    doc.rect(ox + 2, ty, CW - 4, 6, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.setTextColor(255, 255, 255);
    let cx = ox + 2;
    heads.forEach((h, i) => {
      doc.text(h, cx + 1, ty + 4);
      cx += cols[i];
    });
    ty += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.setTextColor(0, 0, 0);
    measurements.forEach((m, i) => {
      doc.setDrawColor(0); doc.setLineWidth(0.2);
      doc.rect(ox + 2, ty, CW - 4, rh);
      cx = ox + 2;
      cols.forEach((cw, j) => {
        if (j > 0) { doc.line(cx, ty, cx, ty + rh); }
        cx += cw;
      });
      if (m) doc.text(m, ox + 3, ty + rh - 1);
      const vals = [data[`m_req_${i}`]||"", data[`m_act_${i}`]||"", data[`m_dev_${i}`]||""];
      cx = ox + 2 + cols[0];
      vals.forEach((v, j) => {
        if (v) doc.text(v, cx + 1, ty + rh - 1);
        cx += cols[j + 1];
      });
      ty += rh;
    });

    // Footer
    doc.setFillColor(0, 0, 0);
    doc.rect(ox, oy + CH - 9, CW, 9, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(4.2);
    doc.setTextColor(200, 200, 200);
    doc.text("Plot #106, Street #3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore  |  +92 42 35965348-49  |  yasir@ysapparels.com", ox + CW / 2, oy + CH - 3.5, { align: "center" });

    // Cut marks
    doc.setDrawColor(150); doc.setLineWidth(0.2);
    doc.setLineDashPattern([2, 2], 0);
    doc.line(ox, oy + CH, ox + CW + 5, oy + CH);
    doc.line(ox, oy - 3, ox, oy + CH + 3);
    doc.setLineDashPattern([], 0);
  }

  drawFront(5, 5);
  doc.addPage();
  drawBack(105, 5);
  doc.save("YSApparels_SampleCard.pdf");
}

// ── COLLECTION CARD PDF ───────────────────────────────────────────────────────
function generateCollectionPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded."); return; }
  const doc = new JsPDF({ unit: "mm", format: [210, 297] });
  const CW = 100, CH = 140, ox = 5, oy = 5;

  doc.setDrawColor(0); doc.setLineWidth(0.8);
  doc.rect(ox, oy, CW, CH);

  doc.setFillColor(0, 0, 0);
  doc.rect(ox, oy, CW, 16, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(14); doc.setTextColor(255, 255, 255);
  doc.text("YS APPARELS", ox + CW / 2, oy + 7, { align: "center" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(6);
  doc.text("THE 2ND SKIN  ·  LEATHER & LEATHER GARMENTS", ox + CW / 2, oy + 12, { align: "center" });

  doc.setFillColor(0, 0, 0);
  doc.rect(ox + 20, oy + 18, 60, 8, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(255, 255, 255);
  doc.text("SAMPLE CARD", ox + CW / 2, oy + 23.5, { align: "center" });

  // Style + Collection row — dark
  let y = oy + 28;
  doc.setFillColor(30, 30, 30);
  doc.rect(ox + 2, y, CW - 4, 12, "F");
  doc.setDrawColor(100); doc.line(ox + 2 + (CW - 4) / 2, y, ox + 2 + (CW - 4) / 2, y + 12);
  doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(180, 150, 50);
  doc.text("STYLE", ox + 3, y + 4.5);
  doc.text("COLLECTION", ox + 3 + (CW - 4) / 2, y + 4.5);
  doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(255, 255, 255);
  if (data.style) doc.text(data.style, ox + 3, y + 10);
  if (data.collection) doc.text(data.collection, ox + 3 + (CW - 4) / 2, y + 10);
  y += 12;

  const rows = [
    ["LEATHER", data.leather],
    ["COLOR", data.color],
    ["LINING", data.lining],
    ["ACC", data.acc],
    ["SPECIAL NOTES", data.specialNotes],
    ["READY TO SHIP", data.readyToShip],
    ["PRICE", data.price],
  ];

  const rh = 11;
  doc.setTextColor(0, 0, 0);
  rows.forEach((row) => {
    doc.setDrawColor(0); doc.setLineWidth(0.3);
    doc.rect(ox + 2, y, CW - 4, rh);
    doc.setFillColor(220, 220, 220);
    doc.rect(ox + 2, y, 28, rh, "F");
    doc.setDrawColor(0); doc.rect(ox + 2, y, CW - 4, rh);
    doc.line(ox + 30, y, ox + 30, y + rh);
    doc.setFont("helvetica", "bold"); doc.setFontSize(7);
    doc.text(row[0], ox + 3, y + rh / 2 + 1.5);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9);
    if (row[1]) doc.text(String(row[1]), ox + 31, y + rh / 2 + 1.5);
    y += rh;
  });

  doc.setFillColor(0, 0, 0);
  doc.rect(ox, oy + CH - 9, CW, 9, "F");
  doc.setFont("helvetica", "normal"); doc.setFontSize(4.2); doc.setTextColor(200, 200, 200);
  doc.text("Plot #106, Street #3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore  |  +92 42 35965348-49  |  yasir@ysapparels.com", ox + CW / 2, oy + CH - 3.5, { align: "center" });

  doc.setDrawColor(150); doc.setLineWidth(0.2);
  doc.setLineDashPattern([2, 2], 0);
  doc.line(ox, oy + CH, ox + CW + 5, oy + CH);
  doc.line(ox + CW, oy - 3, ox + CW, oy + CH + 3);
  doc.setLineDashPattern([], 0);

  doc.save("YSApparels_CollectionCard.pdf");
}

// ── STICKER PDF ───────────────────────────────────────────────────────────────
function generateStickerPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded."); return; }
  const doc = new JsPDF({ unit: "mm", format: [210, 297] });
  const sx = 5, sy = 5, SW = 80, SH = 60;

  doc.setDrawColor(0); doc.setLineWidth(0.8);
  doc.rect(sx, sy, SW, SH);

  doc.setFillColor(0, 0, 0);
  doc.rect(sx, sy, SW, 13, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.setTextColor(255, 255, 255);
  doc.text("YS APPARELS", sx + SW / 2, sy + 7, { align: "center" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(5); doc.setTextColor(200, 200, 200);
  doc.text("THE 2ND SKIN  ·  LEATHER & LEATHER GARMENTS", sx + SW / 2, sy + 11, { align: "center" });

  const rows = [
    ["DATE", data.date, null, null],
    ["LEATHER", data.leather, null, null],
    ["ARTICLE", data.article, null, null],
    ["COLOUR", data.colour, null, null],
    ["CUSTOMER", data.customer, "L.THICK.", data.leatherThickness],
    ["REMARKS", data.remarks, null, null],
  ];

  let ry = sy + 14;
  const rh = (SH - 14) / rows.length;

  rows.forEach((row) => {
    doc.setDrawColor(0); doc.setLineWidth(0.3);
    doc.rect(sx, ry, SW, rh);
    doc.setFillColor(220, 220, 220);
    if (row[2]) {
      // split row
      doc.rect(sx, ry, SW / 2, rh, "F");
      doc.setDrawColor(0); doc.rect(sx, ry, SW, rh);
      doc.line(sx + SW / 2, ry, sx + SW / 2, ry + rh);
      doc.setFont("helvetica", "bold"); doc.setFontSize(6.5);
      doc.setTextColor(0, 0, 0);
      doc.text(row[0] + ":", sx + 1, ry + rh / 2 + 1.2);
      doc.setFont("helvetica", "normal"); doc.setFontSize(7.5);
      if (row[1]) doc.text(String(row[1]), sx + 1 + 18, ry + rh / 2 + 1.2);
      doc.setFillColor(220, 220, 220);
      doc.rect(sx + SW / 2, ry, SW / 2, rh, "F");
      doc.setDrawColor(0); doc.rect(sx, ry, SW, rh);
      doc.setFont("helvetica", "bold"); doc.setFontSize(6.5);
      doc.text(row[2] + ":", sx + SW / 2 + 1, ry + rh / 2 + 1.2);
      doc.setFont("helvetica", "normal"); doc.setFontSize(7.5);
      if (row[3]) doc.text(String(row[3]), sx + SW / 2 + 1 + 16, ry + rh / 2 + 1.2);
    } else {
      doc.rect(sx, ry, 22, rh, "F");
      doc.setDrawColor(0); doc.rect(sx, ry, SW, rh);
      doc.line(sx + 22, ry, sx + 22, ry + rh);
      doc.setFont("helvetica", "bold"); doc.setFontSize(6.5); doc.setTextColor(0, 0, 0);
      doc.text(row[0], sx + 1, ry + rh / 2 + 1.2);
      doc.setFont("helvetica", "normal"); doc.setFontSize(7.5);
      if (row[1]) doc.text(String(row[1]), sx + 23, ry + rh / 2 + 1.2);
    }
    ry += rh;
  });

  doc.setDrawColor(150); doc.setLineWidth(0.2);
  doc.setLineDashPattern([2, 2], 0);
  doc.line(sx, sy + SH, sx + SW + 5, sy + SH);
  doc.line(sx + SW, sy - 3, sx + SW, sy + SH + 3);
  doc.setLineDashPattern([], 0);

  doc.save("YSApparels_MaterialSticker.pdf");
}

// ── FORM COMPONENTS ───────────────────────────────────────────────────────────
const IS = { width: "100%", border: "none", borderBottom: "2px solid #111", outline: "none", fontSize: 14, background: "transparent", padding: "5px 2px", color: "#111", fontFamily: "Arial, sans-serif" };
const LS = { display: "block", fontSize: 11, fontWeight: 700, color: "#333", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 };
const FB = { marginBottom: 16 };
const R2 = { display: "flex", gap: 16 };

function Field({ name, label, value, onChange, flex }) {
  return (
    <div style={{ ...FB, ...(flex ? { flex } : {}) }}>
      <label style={LS}>{label}</label>
      <input name={name} value={value || ""} onChange={onChange} style={IS} />
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

function SampleCardForm({ data, onChange }) {
  return (
    <div>
      <Field name="style" label="Style" value={data.style} onChange={onChange} />
      <Field name="leather" label="Leather" value={data.leather} onChange={onChange} />
      <div style={R2}>
        <Field name="color" label="Color" value={data.color} onChange={onChange} flex={2} />
        <Field name="size" label="Size" value={data.size} onChange={onChange} flex={1} />
      </div>
      <Field name="typeOfSample" label="Type of Sample" value={data.typeOfSample} onChange={onChange} />
      <div style={R2}>
        <Field name="season" label="Season" value={data.season} onChange={onChange} flex={1} />
        <Field name="brand" label="Brand" value={data.brand} onChange={onChange} flex={1} />
      </div>
      <div style={R2}>
        <Field name="paddingBody" label="Padding Body" value={data.paddingBody} onChange={onChange} flex={2} />
        <Field name="paddingGms" label="Gms" value={data.paddingGms} onChange={onChange} flex={1} />
      </div>
      <div style={R2}>
        <Field name="sleeves" label="Sleeves" value={data.sleeves} onChange={onChange} flex={2} />
        <Field name="sleevesGms" label="Gms" value={data.sleevesGms} onChange={onChange} flex={1} />
      </div>
      <Field name="remarks" label="Remarks" value={data.remarks} onChange={onChange} />
      <div style={{ marginTop: 24, marginBottom: 12, fontWeight: 900, fontSize: 14, color: "#111", textTransform: "uppercase", letterSpacing: 2, borderBottom: "2px solid #111", paddingBottom: 6 }}>Measurements — Back of Card</div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>{["Description", "Required", "Actual", "Deviation"].map(h => (
            <th key={h} style={{ padding: "8px", background: "#111", color: "#fff", textAlign: "left", fontSize: 11, fontWeight: 700, border: "1px solid #111" }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {measurements.map((m, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#f5f5f5" : "#fff" }}>
              <td style={{ padding: "4px 6px", fontSize: 11, color: "#333", border: "1px solid #ddd", fontWeight: 500 }}>{m}</td>
              {["req", "act", "dev"].map(t => (
                <td key={t} style={{ border: "1px solid #ddd", padding: "2px 4px" }}>
                  <input name={`m_${t}_${i}`} value={data[`m_${t}_${i}`] || ""} onChange={onChange}
                    style={{ width: "100%", border: "none", outline: "none", fontSize: 12, background: "transparent" }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CollectionForm({ data, onChange }) {
  return (
    <div>
      <div style={R2}>
        <Field name="style" label="Style" value={data.style} onChange={onChange} flex={1} />
        <Field name="collection" label="Collection" value={data.collection} onChange={onChange} flex={1} />
      </div>
      {[["leather", "Leather"], ["color", "Color"], ["lining", "Lining"], ["acc", "ACC"],
        ["specialNotes", "Special Notes"], ["readyToShip", "Ready to Ship"], ["price", "Price"]
      ].map(([k, l]) => <Field key={k} name={k} label={l} value={data[k]} onChange={onChange} />)}
    </div>
  );
}

function StickerForm({ data, onChange }) {
  return (
    <div>
      <Field name="date" label="Date" value={data.date} onChange={onChange} />
      <Field name="leather" label="Leather" value={data.leather} onChange={onChange} />
      <Field name="article" label="Article" value={data.article} onChange={onChange} />
      <Field name="colour" label="Colour" value={data.colour} onChange={onChange} />
      <div style={R2}>
        <Field name="customer" label="Customer" value={data.customer} onChange={onChange} flex={1} />
        <Field name="leatherThickness" label="Leather Thickness" value={data.leatherThickness} onChange={onChange} flex={1} />
      </div>
      <Field name="remarks" label="Remarks" value={data.remarks} onChange={onChange} />
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
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

  const hS = e => setSampleData(p => ({ ...p, [e.target.name]: e.target.value }));
  const hC = e => setCollData(p => ({ ...p, [e.target.name]: e.target.value }));
  const hST = e => setStickerData(p => ({ ...p, [e.target.name]: e.target.value }));

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

  const tip = tab === "sticker"
    ? "Single sticker — 80×60mm top-left of A4. Print → cut on dashed lines."
    : "Page 1 top-LEFT (front). Page 2 top-RIGHT (back). Duplex printer aligns them automatically. Cut on dashed lines.";

  return (
    <div style={{ minHeight: "100vh", background: "#f0f0f0", fontFamily: "Arial, sans-serif" }}>
      <div style={{ background: "#111", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54 }}>
        <div>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 17, letterSpacing: 3 }}>YS APPARELS</span>
          <span style={{ color: "#aaa", fontSize: 9, letterSpacing: 2, marginLeft: 12 }}>THE 2ND SKIN</span>
        </div>
        <span style={{ color: "#555", fontSize: 10, letterSpacing: 1 }}>DIGITAL FORMS</span>
      </div>

      <div style={{ background: "#222", display: "flex", paddingLeft: 24, borderBottom: "2px solid #444" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "12px 22px", border: "none", background: "none", cursor: "pointer",
            fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase",
            color: tab === t.id ? "#fff" : "#666",
            borderBottom: tab === t.id ? "3px solid #fff" : "3px solid transparent",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 580, margin: "28px auto", padding: "0 16px" }}>
        <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 2px 12px rgba(0,0,0,0.12)", overflow: "hidden" }}>
          <div style={{ background: "#111", padding: "18px 24px" }}>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 20, letterSpacing: 3 }}>YS APPARELS</div>
            <div style={{ color: "#aaa", fontSize: 9, letterSpacing: 2, marginTop: 3 }}>
              {tab === "sample" ? "SAMPLE CARD" : tab === "collection" ? "COLLECTION CARD" : "MATERIAL STICKER"}
            </div>
          </div>

          <div style={{ padding: "24px" }}>
            {tab === "sample" && <SampleCardForm data={sampleData} onChange={hS} />}
            {tab === "collection" && <CollectionForm data={collData} onChange={hC} />}
            {tab === "sticker" && <StickerForm data={stickerData} onChange={hST} />}
          </div>

          <div style={{ margin: "0 24px 16px", background: "#f5f5f5", border: "1px solid #ddd", borderRadius: 4, padding: "10px 14px", fontSize: 11, color: "#555", lineHeight: 1.8 }}>
            <strong>Print instructions:</strong> {tip}
          </div>

          <div style={{ background: "#f9f9f9", borderTop: "1px solid #e0e0e0", padding: "14px 24px", display: "flex", gap: 10 }}>
            <button onClick={handlePDF} style={{ flex: 1, padding: "12px 0", background: "#111", color: "#fff", border: "none", borderRadius: 4, fontWeight: 700, fontSize: 13, letterSpacing: 1, cursor: "pointer" }}>
              ⬇ DOWNLOAD PDF
            </button>
            <button onClick={reset} style={{ padding: "12px 20px", background: "#fff", color: "#666", border: "1.5px solid #ccc", borderRadius: 4, fontSize: 12, cursor: "pointer" }}>
              Reset
            </button>
          </div>

          <div style={{ background: "#111", padding: "8px 24px", textAlign: "center" }}>
            <div style={{ color: "#555", fontSize: 9, lineHeight: 1.8 }}>
              Plot #106, Street #3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore<br />
              ☎ +92 42 35965348-49 &nbsp;·&nbsp; yasir@ysapparels.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
