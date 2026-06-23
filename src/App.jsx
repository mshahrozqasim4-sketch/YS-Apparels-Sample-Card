import { useState } from "react";

function getJsPDF() {
  if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
  if (window.jsPDF) return window.jsPDF;
  return null;
}

// ── PDF: SAMPLE CARD (100×140mm) ─────────────────────────────────────────────
function generateSampleCardPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded. Refresh and try again."); return; }
  const doc = new JsPDF({ unit: "mm", format: [100, 140] });
  const W = 100, H = 140;

  // Black header bar
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, W, 18, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text("YS APPARELS", W / 2, 8, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.setTextColor(180, 150, 80);
  doc.text("THE 2ND SKIN  ·  LEATHER & LEATHER GARMENTS", W / 2, 13, { align: "center" });

  // Badge
  doc.setFillColor(180, 150, 80);
  doc.rect(28, 20, 44, 7, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(15, 15, 15);
  doc.text("SAMPLE CARD", W / 2, 25.2, { align: "center" });

  // Fields
  doc.setTextColor(0, 0, 0);
  let y = 33;
  const lh = 8;

  const field = (label, value, x1, x2, yy) => {
    doc.setFillColor(240, 240, 240);
    doc.rect(x1, yy - 5.5, x2 - x1, lh, "F");
    doc.setDrawColor(200);
    doc.setLineWidth(0.2);
    doc.rect(x1, yy - 5.5, x2 - x1, lh);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(80, 80, 80);
    doc.text(label, x1 + 1.5, yy - 1.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    if (value) doc.text(value, x1 + 1.5, yy + 2.5);
    return yy + lh;
  };

  y = field("STYLE", data.style||"", 4, 96, y);
  y = field("LEATHER", data.leather||"", 4, 96, y);

  // Color + Size side by side
  field("COLOR", data.color||"", 4, 55, y);
  field("SIZE", data.size||"", 57, 96, y);
  y += lh;

  y = field("TYPE OF SAMPLE", data.typeOfSample||"", 4, 96, y);

  field("SEASON", data.season||"", 4, 55, y);
  field("BRAND", data.brand||"", 57, 96, y);
  y += lh;

  field("PADDING BODY", data.paddingBody||"", 4, 55, y);
  field("GMS", data.paddingGms||"", 57, 96, y);
  y += lh;

  field("SLEEVES", data.sleeves||"", 4, 55, y);
  field("GMS", data.sleevesGms||"", 57, 96, y);
  y += lh;

  y = field("REMARKS", data.remarks||"", 4, 96, y);

  // Dividers
  doc.setDrawColor(15,15,15); doc.setLineWidth(0.5);
  doc.line(4, y+1, 96, y+1);
  doc.line(4, y+4, 96, y+4);

  // Footer
  doc.setFillColor(15, 15, 15);
  doc.rect(0, H - 10, W, 10, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5);
  doc.setTextColor(160, 160, 160);
  doc.text("Plot #106, Street #3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore  |  +92 42 35965348-49  |  yasir@ysapparels.com", W/2, H-5.5, { align: "center" });

  // ── PAGE 2: MEASUREMENTS ──────────────────────────────────────────────────
  doc.addPage([100, 140]);

  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, W, 14, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("MEASUREMENTS", W / 2, 6, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.setTextColor(180, 150, 80);
  doc.text("YS APPARELS  ·  THE 2ND SKIN", W / 2, 11, { align: "center" });

  const measurements = [
    "Chest 1/2 (1cm below Armhole)", "Waist Height", "Waist 1/2", "Bottom 1/2",
    "Centre Back Length", "Front Length", "Shoulder", "Across Shoulder",
    "Front Across", "Armhole Straight", "Sleeve Length", "Bicep 1/2",
    "Elbow", "Cuff 1/2 Relaxed", "Collar Length From Upper Edge",
    "Front Neck Drop Vertical CF", "Hood Height Top Edge", "Hood Height Centre",
    "Measurements in CMS", "", "", ""
  ];

  const cols = [50, 14, 14, 14]; // desc, req, act, dev
  const startX = 4;
  const rh = 5.2;
  let ty = 17;

  // Header row
  doc.setFillColor(30, 30, 30);
  doc.rect(startX, ty, 92, rh, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(6); doc.setTextColor(255,255,255);
  const heads = ["DESCRIPTION","REQUIRED","ACTUAL","DEVIATION"];
  let cx = startX;
  heads.forEach((h, i) => {
    doc.text(h, cx + 1, ty + 3.5);
    cx += cols[i];
  });
  ty += rh;

  doc.setFont("helvetica", "normal"); doc.setFontSize(5.8); doc.setTextColor(0,0,0);
  measurements.forEach((m, i) => {
    if (ty > 130) return;
    doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 248 : 255);
    doc.rect(startX, ty, 92, rh, "F");
    doc.setDrawColor(210); doc.setLineWidth(0.15);
    doc.rect(startX, ty, 92, rh);
    doc.setTextColor(20,20,20);
    doc.text(m, startX + 1, ty + 3.5);
    cx = startX + cols[0];
    [data[`m_req_${i}`]||"", data[`m_act_${i}`]||"", data[`m_dev_${i}`]||""].forEach((v, j) => {
      doc.setDrawColor(180); doc.line(cx, ty, cx, ty + rh);
      if (v) doc.text(v, cx + 1, ty + 3.5);
      cx += cols[j + 1];
    });
    ty += rh;
  });

  doc.setFillColor(15, 15, 15);
  doc.rect(0, H - 10, W, 10, "F");
  doc.setFont("helvetica", "normal"); doc.setFontSize(5); doc.setTextColor(160,160,160);
  doc.text("Plot #106, Street #3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore  |  +92 42 35965348-49", W/2, H-5.5, { align: "center" });

  doc.save("YSApparels_SampleCard.pdf");
}

// ── PDF: COLLECTION CARD (100×140mm) ─────────────────────────────────────────
function generateCollectionPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded."); return; }
  const doc = new JsPDF({ unit: "mm", format: [100, 140] });
  const W = 100, H = 140;

  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, W, 18, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.setTextColor(255,255,255);
  doc.text("YS APPARELS", W/2, 8, { align: "center" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(6); doc.setTextColor(180,150,80);
  doc.text("THE 2ND SKIN  ·  LEATHER & LEATHER GARMENTS", W/2, 13, { align: "center" });

  doc.setFillColor(180,150,80);
  doc.rect(28, 20, 44, 7, "F");
  doc.setFont("helvetica","bold"); doc.setFontSize(7.5); doc.setTextColor(15,15,15);
  doc.text("SAMPLE CARD", W/2, 25.2, { align: "center" });

  // Style + Collection header row
  let y = 32;
  const rh = 10;
  doc.setFillColor(30,30,30); doc.rect(4, y, 92, rh, "F");
  doc.setFont("helvetica","bold"); doc.setFontSize(7); doc.setTextColor(180,150,80);
  doc.text("STYLE", 5, y+4);
  doc.setTextColor(255,255,255); doc.setFont("helvetica","normal"); doc.setFontSize(8);
  if (data.style) doc.text(data.style, 5, y+8.5);
  doc.setDrawColor(80); doc.line(4+46, y, 4+46, y+rh);
  doc.setFont("helvetica","bold"); doc.setFontSize(7); doc.setTextColor(180,150,80);
  doc.text("COLLECTION", 5+46, y+4);
  doc.setTextColor(255,255,255); doc.setFont("helvetica","normal"); doc.setFontSize(8);
  if (data.collection) doc.text(data.collection, 5+46, y+8.5);
  y += rh;

  const rows = [
    ["LEATHER", data.leather||""],
    ["COLOR", data.color||""],
    ["LINING", data.lining||""],
    ["ACC", data.acc||""],
    ["SPECIAL NOTES", data.specialNotes||""],
    ["READY TO SHIP", data.readyToShip||""],
    ["PRICE", data.price||""],
  ];

  rows.forEach((row, i) => {
    doc.setFillColor(i%2===0 ? 245:255, i%2===0 ? 245:255, i%2===0 ? 245:255);
    doc.rect(4, y, 92, rh, "F");
    doc.setDrawColor(200); doc.setLineWidth(0.2); doc.rect(4, y, 92, rh);
    doc.setDrawColor(180); doc.line(4+26, y, 4+26, y+rh);
    doc.setFont("helvetica","bold"); doc.setFontSize(7); doc.setTextColor(60,60,60);
    doc.text(row[0], 5, y+6.5);
    doc.setFont("helvetica","normal"); doc.setFontSize(8.5); doc.setTextColor(0,0,0);
    if (row[1]) doc.text(row[1], 5+27, y+6.5);
    y += rh;
  });

  doc.setFillColor(15,15,15); doc.rect(0, H-10, W, 10, "F");
  doc.setFont("helvetica","normal"); doc.setFontSize(5); doc.setTextColor(160,160,160);
  doc.text("Plot #106, Street #3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore  |  +92 42 35965348-49  |  yasir@ysapparels.com", W/2, H-5.5, { align: "center" });

  doc.save("YSApparels_CollectionCard.pdf");
}

// ── PDF: MATERIAL STICKER (80×60mm) ──────────────────────────────────────────
function generateStickerPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded."); return; }
  const doc = new JsPDF({ unit: "mm", format: [80, 60] });
  const W = 80, H = 60;

  doc.setFillColor(15,15,15); doc.rect(0, 0, W, 13, "F");
  doc.setFont("helvetica","bold"); doc.setFontSize(11); doc.setTextColor(255,255,255);
  doc.text("YS APPARELS", W/2, 6, { align: "center" });
  doc.setFont("helvetica","normal"); doc.setFontSize(5.5); doc.setTextColor(180,150,80);
  doc.text("THE 2ND SKIN  ·  LEATHER & LEATHER GARMENTS", W/2, 10.5, { align: "center" });

  const rows = [
    ["DATE", data.date||"", null, null],
    ["LEATHER", data.leather||"", null, null],
    ["ARTICLE", data.article||"", null, null],
    ["COLOUR", data.colour||"", null, null],
    ["CUSTOMER", data.customer||"", "LEATH. THICK.", data.leatherThickness||""],
    ["REMARKS", data.remarks||"", null, null],
  ];

  let y = 15;
  const rh = 7;
  rows.forEach((row, i) => {
    doc.setFillColor(i%2===0 ? 248:255, i%2===0 ? 248:255, i%2===0 ? 248:255);
    doc.rect(3, y, 74, rh, "F");
    doc.setDrawColor(180); doc.setLineWidth(0.2); doc.rect(3, y, 74, rh);
    if (row[2]) {
      doc.setDrawColor(180); doc.line(3+37, y, 3+37, y+rh);
      doc.setFont("helvetica","bold"); doc.setFontSize(6); doc.setTextColor(80,80,80);
      doc.text(row[0]+":", 4, y+4.5);
      doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(0,0,0);
      if (row[1]) doc.text(row[1], 4+18, y+4.5);
      doc.setFont("helvetica","bold"); doc.setFontSize(6); doc.setTextColor(80,80,80);
      doc.text(row[2]+":", 4+38, y+4.5);
      doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(0,0,0);
      if (row[3]) doc.text(row[3], 4+38+18, y+4.5);
    } else {
      doc.setFont("helvetica","bold"); doc.setFontSize(6); doc.setTextColor(80,80,80);
      doc.text(row[0]+":", 4, y+4.5);
      doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(0,0,0);
      if (row[1]) doc.text(row[1], 4+20, y+4.5);
    }
    y += rh;
  });

  doc.setFillColor(15,15,15); doc.rect(0, H-8, W, 8, "F");
  doc.setFont("helvetica","normal"); doc.setFontSize(4.5); doc.setTextColor(160,160,160);
  doc.text("Plot #106, Street #3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore  |  +92 42 35965348-49", W/2, H-3.5, { align: "center" });

  doc.save("YSApparels_MaterialSticker.pdf");
}

// ── FORM COMPONENTS ───────────────────────────────────────────────────────────
const inputStyle = {
  width: "100%", border: "none", borderBottom: "1.5px solid #333",
  outline: "none", fontSize: 13, background: "transparent",
  padding: "4px 2px", color: "#111", fontFamily: "Arial, sans-serif"
};
const labelStyle = {
  display: "block", fontSize: 10, fontWeight: 700, color: "#888",
  textTransform: "uppercase", letterSpacing: 1, marginBottom: 3
};
const fieldBox = { marginBottom: 14 };
const row2 = { display: "flex", gap: 16 };

function Field({ name, label, value, onChange, flex }) {
  return (
    <div style={{ ...fieldBox, ...(flex ? { flex } : {}) }}>
      <label style={labelStyle}>{label}</label>
      <input name={name} value={value||""} onChange={onChange} style={inputStyle} />
    </div>
  );
}

function SampleCardForm({ data, onChange }) {
  return (
    <div>
      <Field name="style" label="Style" value={data.style} onChange={onChange} />
      <Field name="leather" label="Leather" value={data.leather} onChange={onChange} />
      <div style={row2}>
        <Field name="color" label="Color" value={data.color} onChange={onChange} flex={2} />
        <Field name="size" label="Size" value={data.size} onChange={onChange} flex={1} />
      </div>
      <Field name="typeOfSample" label="Type of Sample" value={data.typeOfSample} onChange={onChange} />
      <div style={row2}>
        <Field name="season" label="Season" value={data.season} onChange={onChange} flex={1} />
        <Field name="brand" label="Brand" value={data.brand} onChange={onChange} flex={1} />
      </div>
      <div style={row2}>
        <Field name="paddingBody" label="Padding Body" value={data.paddingBody} onChange={onChange} flex={2} />
        <Field name="paddingGms" label="Gms" value={data.paddingGms} onChange={onChange} flex={1} />
      </div>
      <div style={row2}>
        <Field name="sleeves" label="Sleeves" value={data.sleeves} onChange={onChange} flex={2} />
        <Field name="sleevesGms" label="Gms" value={data.sleevesGms} onChange={onChange} flex={1} />
      </div>
      <Field name="remarks" label="Remarks" value={data.remarks} onChange={onChange} />
      <div style={{ borderTop: "2px solid #111", marginTop: 4, marginBottom: 4 }} />
      <div style={{ borderTop: "1px solid #333" }} />
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

function MeasurementsForm({ data, onChange }) {
  const th = { padding: "6px 8px", textAlign: "left", fontSize: 10, fontWeight: 700, background: "#1a1a2e", color: "#fff", letterSpacing: 1 };
  const td = { padding: "3px 4px", borderBottom: "1px solid #eee", fontSize: 11 };
  const ci = { width: "100%", border: "none", outline: "none", fontSize: 11, background: "transparent" };
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ fontWeight: 900, fontSize: 13, letterSpacing: 2, color: "#1a1a2e", marginBottom: 10, textTransform: "uppercase" }}>Measurements</div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr><th style={th}>Description</th><th style={th}>Required</th><th style={th}>Actual</th><th style={th}>Deviation</th></tr>
        </thead>
        <tbody>
          {measurements.map((m, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fafafa" : "#fff" }}>
              <td style={{ ...td, fontSize: 10, color: "#444" }}>{m}</td>
              <td style={td}><input name={`m_req_${i}`} value={data[`m_req_${i}`]||""} onChange={onChange} style={ci}/></td>
              <td style={td}><input name={`m_act_${i}`} value={data[`m_act_${i}`]||""} onChange={onChange} style={ci}/></td>
              <td style={td}><input name={`m_dev_${i}`} value={data[`m_dev_${i}`]||""} onChange={onChange} style={ci}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CollectionForm({ data, onChange }) {
  const rows = [
    ["leather","Leather"],["color","Color"],["lining","Lining"],
    ["acc","ACC"],["specialNotes","Special Notes"],
    ["readyToShip","Ready to Ship"],["price","Price"]
  ];
  return (
    <div>
      <div style={row2}>
        <Field name="style" label="Style" value={data.style} onChange={onChange} flex={1} />
        <Field name="collection" label="Collection" value={data.collection} onChange={onChange} flex={1} />
      </div>
      {rows.map(([key, label]) => (
        <Field key={key} name={key} label={label} value={data[key]} onChange={onChange} />
      ))}
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
      <div style={row2}>
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
    <div style={{ minHeight: "100vh", background: "#f4f4f4", fontFamily: "Arial, sans-serif" }}>

      {/* Top bar */}
      <div style={{ background: "#0f0f0f", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <div>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 17, letterSpacing: 3 }}>YS APPARELS</span>
          <span style={{ color: "#b49650", fontSize: 9, letterSpacing: 2, marginLeft: 10 }}>THE 2ND SKIN</span>
        </div>
        <span style={{ color: "#555", fontSize: 10, letterSpacing: 1 }}>DIGITAL FORMS</span>
      </div>

      {/* Tabs */}
      <div style={{ background: "#1a1a1a", display: "flex", paddingLeft: 24 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "11px 20px", border: "none", background: "none", cursor: "pointer",
            fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase",
            color: tab === t.id ? "#b49650" : "#666",
            borderBottom: tab === t.id ? "2px solid #b49650" : "2px solid transparent",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Form area */}
      <div style={{ maxWidth: 560, margin: "28px auto", padding: "0 16px" }}>
        <div style={{ background: "#fff", borderRadius: 6, boxShadow: "0 2px 16px rgba(0,0,0,0.1)", overflow: "hidden" }}>

          {/* Card header */}
          <div style={{ background: "#0f0f0f", padding: "16px 24px" }}>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 18, letterSpacing: 3 }}>YS APPARELS</div>
            <div style={{ color: "#b49650", fontSize: 9, letterSpacing: 2, marginTop: 2 }}>
              {tab === "sample" ? "SAMPLE CARD" : tab === "collection" ? "COLLECTION CARD" : "MATERIAL STICKER"}
            </div>
          </div>

          <div style={{ padding: "24px" }}>
            {tab === "sample" && <><SampleCardForm data={sampleData} onChange={handleS}/><MeasurementsForm data={sampleData} onChange={handleS}/></>}
            {tab === "collection" && <CollectionForm data={collData} onChange={handleC}/>}
            {tab === "sticker" && <StickerForm data={stickerData} onChange={handleST}/>}
          </div>

          {/* Footer actions */}
          <div style={{ background: "#f9f9f9", borderTop: "1px solid #eee", padding: "14px 24px", display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={handlePDF} style={{
              flex: 1, padding: "11px 0", background: "#0f0f0f", color: "#fff",
              border: "none", borderRadius: 5, fontWeight: 700, fontSize: 13,
              letterSpacing: 1, cursor: "pointer"
            }}>
              ⬇ DOWNLOAD PDF
            </button>
            <button onClick={reset} style={{
              padding: "11px 20px", background: "#fff", color: "#666",
              border: "1.5px solid #ddd", borderRadius: 5, fontSize: 12, cursor: "pointer"
            }}>
              Reset
            </button>
          </div>

          {/* Address footer */}
          <div style={{ background: "#0f0f0f", padding: "8px 24px", textAlign: "center" }}>
            <div style={{ color: "#555", fontSize: 9, lineHeight: 1.7 }}>
              Plot #106, Street #3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore
            </div>
            <div style={{ color: "#555", fontSize: 9 }}>
              ☎ +92 42 35965348-49 &nbsp;·&nbsp; yasir@ysapparels.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
