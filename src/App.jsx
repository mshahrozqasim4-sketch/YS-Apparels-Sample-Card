import { useState } from "react";

function getJsPDF() {
  if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
  if (window.jsPDF) return window.jsPDF;
  return null;
}

// A4 = 210×297mm
// Card = 100×140mm
// Two cards side by side on A4 landscape (297×210mm): left=front, right=back
// Each card starts at x=5 (left) and x=155 (right), y=35 (centered vertically)

const GOLD = [180, 150, 80];
const BLACK = [15, 15, 15];
const WHITE = [255, 255, 255];
const LGRAY = [240, 240, 240];
const MGRAY = [200, 200, 200];

function drawCardHeader(doc, ox, oy, w, subtitle) {
  // Black header bar
  doc.setFillColor(...BLACK);
  doc.rect(ox, oy, w, 18, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...WHITE);
  doc.text("YS APPARELS", ox + w / 2, oy + 8, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.setTextColor(...GOLD);
  doc.text("THE 2ND SKIN  ·  LEATHER & LEATHER GARMENTS", ox + w / 2, oy + 13, { align: "center" });
  // Gold badge
  doc.setFillColor(...GOLD);
  doc.rect(ox + (w - 44) / 2, oy + 19, 44, 7, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...BLACK);
  doc.text(subtitle, ox + w / 2, oy + 24, { align: "center" });
}

function drawCardFooter(doc, ox, oy, w, h) {
  doc.setFillColor(...BLACK);
  doc.rect(ox, oy + h - 9, w, 9, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(4.5);
  doc.setTextColor(150, 150, 150);
  doc.text("Plot #106, Street #3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore  |  +92 42 35965348-49  |  yasir@ysapparels.com", ox + w / 2, oy + h - 3.5, { align: "center" });
}

function drawField(doc, label, value, x, y, w, h) {
  doc.setFillColor(...LGRAY);
  doc.rect(x, y, w, h, "F");
  doc.setDrawColor(...MGRAY);
  doc.setLineWidth(0.2);
  doc.rect(x, y, w, h);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(5.5);
  doc.setTextColor(100, 100, 100);
  doc.text(label, x + 1.5, y + 3);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);
  if (value) doc.text(String(value).substring(0, 40), x + 1.5, y + h - 2);
}

// ── SAMPLE CARD PDF (A4 landscape, front left / back right) ──────────────────
function generateSampleCardPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded. Refresh and try again."); return; }

  // A4 landscape
  const doc = new JsPDF({ unit: "mm", format: [297, 210], orientation: "landscape" });

  const CW = 100, CH = 140;
  const LX = 5,  RX = 155; // left card X, right card X
  const CY = (210 - CH) / 2; // centered vertically = 35

  // ── FRONT (LEFT) ──
  drawCardHeader(doc, LX, CY, CW, "SAMPLE CARD");
  let y = CY + 28;
  const fh = 8.2; // field height

  const fieldL = (label, value, yy) => {
    drawField(doc, label, value, LX + 2, yy, CW - 4, fh);
    return yy + fh + 1;
  };
  const fieldHalf = (l1, v1, l2, v2, yy) => {
    drawField(doc, l1, v1, LX + 2, yy, (CW - 5) / 2, fh);
    drawField(doc, l2, v2, LX + 2 + (CW - 5) / 2 + 1, yy, (CW - 5) / 2, fh);
    return yy + fh + 1;
  };

  y = fieldL("STYLE", data.style, y);
  y = fieldL("LEATHER", data.leather, y);
  y = fieldHalf("COLOR", data.color, "SIZE", data.size, y);
  y = fieldL("TYPE OF SAMPLE", data.typeOfSample, y);
  y = fieldHalf("SEASON", data.season, "BRAND", data.brand, y);
  y = fieldHalf("PADDING BODY", data.paddingBody, "GMS", data.paddingGms, y);
  y = fieldHalf("SLEEVES", data.sleeves, "GMS", data.sleevesGms, y);
  fieldL("REMARKS", data.remarks, y);

  // Dividers at bottom of front
  doc.setDrawColor(...BLACK); doc.setLineWidth(0.5);
  doc.line(LX + 2, CY + CH - 14, LX + CW - 2, CY + CH - 14);
  doc.line(LX + 2, CY + CH - 11, LX + CW - 2, CY + CH - 11);

  drawCardFooter(doc, LX, CY, CW, CH);

  // ── BACK (RIGHT) ──
  drawCardHeader(doc, RX, CY, CW, "MEASUREMENTS");

  const measurements = [
    "Chest 1/2 (1cm below Armhole)", "Waist Height", "Waist 1/2", "Bottom 1/2",
    "Centre Back Length", "Front Length", "Shoulder", "Across Shoulder",
    "Front Across", "Armhole Straight", "Sleeve Length", "Bicep 1/2",
    "Elbow", "Cuff 1/2 Relaxed", "Collar Lgth From Upper Edge",
    "Front Neck Drop Vertical CF", "Hood Height Top Edge", "Hood Height Centre",
    "Measurements in CMS", "", "", ""
  ];

  const cols = [48, 13, 13, 13]; // widths
  const startX = RX + 2;
  const rh = 4.8;
  let ty = CY + 28;

  // Table header
  doc.setFillColor(...BLACK);
  doc.rect(startX, ty, 96, rh, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(5.5); doc.setTextColor(...WHITE);
  const heads = ["DESCRIPTION", "REQUIRED", "ACTUAL", "DEVIATION"];
  let cx = startX;
  heads.forEach((h, i) => {
    doc.text(h, cx + 1, ty + 3.3);
    cx += cols[i];
  });
  ty += rh;

  doc.setFont("helvetica", "normal"); doc.setFontSize(5.5); doc.setTextColor(0, 0, 0);
  measurements.forEach((m, i) => {
    if (ty > CY + CH - 11) return;
    doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 248 : 255);
    doc.rect(startX, ty, 96, rh, "F");
    doc.setDrawColor(210); doc.setLineWidth(0.15);
    doc.rect(startX, ty, 96, rh);
    if (m) doc.text(m, startX + 1, ty + 3.3);
    cx = startX + cols[0];
    [data[`m_req_${i}`]||"", data[`m_act_${i}`]||"", data[`m_dev_${i}`]||""].forEach((v, j) => {
      doc.setDrawColor(180); doc.line(cx, ty, cx, ty + rh);
      if (v) doc.text(v, cx + 1, ty + 3.3);
      cx += cols[j + 1];
    });
    ty += rh;
  });

  drawCardFooter(doc, RX, CY, CW, CH);

  // Cut guide dashed line in centre
  doc.setDrawColor(180, 180, 180); doc.setLineWidth(0.3);
  doc.setLineDashPattern([2, 2], 0);
  doc.line(152, 10, 152, 200);
  doc.setFont("helvetica", "normal"); doc.setFontSize(6); doc.setTextColor(180, 180, 180);
  doc.text("✂  FOLD & CUT HERE", 152, 8, { align: "center" });

  doc.save("YSApparels_SampleCard.pdf");
}

// ── COLLECTION CARD PDF (A4 landscape, single card centred — one sided) ──────
function generateCollectionPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded."); return; }
  const doc = new JsPDF({ unit: "mm", format: [297, 210], orientation: "landscape" });

  const CW = 100, CH = 140;
  const LX = 5, RX = 155;
  const CY = (210 - CH) / 2;

  // Front — left side
  drawCardHeader(doc, LX, CY, CW, "SAMPLE CARD");
  let y = CY + 28;
  const rh = 10;

  // Style + Collection dark row
  doc.setFillColor(...BLACK);
  doc.rect(LX + 2, y, CW - 4, rh, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(6); doc.setTextColor(...GOLD);
  doc.text("STYLE", LX + 3, y + 4);
  doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(...WHITE);
  if (data.style) doc.text(data.style, LX + 3, y + 8.5);
  doc.setDrawColor(60); doc.line(LX + 2 + 48, y, LX + 2 + 48, y + rh);
  doc.setFont("helvetica", "bold"); doc.setFontSize(6); doc.setTextColor(...GOLD);
  doc.text("COLLECTION", LX + 3 + 49, y + 4);
  doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(...WHITE);
  if (data.collection) doc.text(data.collection, LX + 3 + 49, y + 8.5);
  y += rh;

  const rows = [
    ["LEATHER", data.leather||""], ["COLOR", data.color||""],
    ["LINING", data.lining||""], ["ACC", data.acc||""],
    ["SPECIAL NOTES", data.specialNotes||""],
    ["READY TO SHIP", data.readyToShip||""], ["PRICE", data.price||""],
  ];

  rows.forEach((row, i) => {
    doc.setFillColor(i % 2 === 0 ? 245 : 255, i % 2 === 0 ? 245 : 255, i % 2 === 0 ? 245 : 255);
    doc.rect(LX + 2, y, CW - 4, rh, "F");
    doc.setDrawColor(...MGRAY); doc.setLineWidth(0.2); doc.rect(LX + 2, y, CW - 4, rh);
    doc.setDrawColor(180); doc.line(LX + 2 + 26, y, LX + 2 + 26, y + rh);
    doc.setFont("helvetica", "bold"); doc.setFontSize(6.5); doc.setTextColor(60, 60, 60);
    doc.text(row[0], LX + 3, y + 6.5);
    doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(0, 0, 0);
    if (row[1]) doc.text(row[1], LX + 3 + 27, y + 6.5);
    y += rh;
  });

  drawCardFooter(doc, LX, CY, CW, CH);

  // Right side — blank with border (back of card, nothing printed)
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  doc.rect(RX, CY, CW, CH);
  doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(200, 200, 200);
  doc.text("(BACK — BLANK)", RX + CW / 2, CY + CH / 2, { align: "center" });

  // Cut guide
  doc.setDrawColor(180); doc.setLineWidth(0.3);
  doc.setLineDashPattern([2, 2], 0);
  doc.line(152, 10, 152, 200);
  doc.setFont("helvetica", "normal"); doc.setFontSize(6); doc.setTextColor(180, 180, 180);
  doc.text("✂  FOLD & CUT HERE", 152, 8, { align: "center" });

  doc.save("YSApparels_CollectionCard.pdf");
}

// ── STICKER PDF (4 stickers per A4, 2×2 grid) ────────────────────────────────
function generateStickerPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded."); return; }
  const doc = new JsPDF({ unit: "mm", format: [210, 297] });

  const SW = 90, SH = 58;
  const positions = [
    [10, 15], [110, 15],
    [10, 85], [110, 85],
    [10, 155], [110, 155],
  ];

  positions.forEach(([sx, sy]) => {
    // Header
    doc.setFillColor(...BLACK); doc.rect(sx, sy, SW, 12, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(...WHITE);
    doc.text("YS APPARELS", sx + SW / 2, sy + 6, { align: "center" });
    doc.setFont("helvetica", "normal"); doc.setFontSize(4.5); doc.setTextColor(...GOLD);
    doc.text("THE 2ND SKIN  ·  LEATHER & LEATHER GARMENTS", sx + SW / 2, sy + 10, { align: "center" });

    const rows = [
      ["DATE", data.date||"", null, null],
      ["LEATHER", data.leather||"", null, null],
      ["ARTICLE", data.article||"", null, null],
      ["COLOUR", data.colour||"", null, null],
      ["CUSTOMER", data.customer||"", "L.THICK.", data.leatherThickness||""],
      ["REMARKS", data.remarks||"", null, null],
    ];

    let ry = sy + 13;
    const rh = 7.2;

    rows.forEach((row, i) => {
      doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 248 : 255);
      doc.rect(sx, ry, SW, rh, "F");
      doc.setDrawColor(190); doc.setLineWidth(0.2); doc.rect(sx, ry, SW, rh);
      if (row[2]) {
        doc.setDrawColor(170); doc.line(sx + SW / 2, ry, sx + SW / 2, ry + rh);
        doc.setFont("helvetica", "bold"); doc.setFontSize(5.5); doc.setTextColor(80, 80, 80);
        doc.text(row[0] + ":", sx + 1.5, ry + 4.5);
        doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(0, 0, 0);
        if (row[1]) doc.text(row[1], sx + 1.5 + 18, ry + 4.5);
        doc.setFont("helvetica", "bold"); doc.setFontSize(5.5); doc.setTextColor(80, 80, 80);
        doc.text(row[2] + ":", sx + SW / 2 + 1.5, ry + 4.5);
        doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(0, 0, 0);
        if (row[3]) doc.text(row[3], sx + SW / 2 + 1.5 + 16, ry + 4.5);
      } else {
        doc.setFont("helvetica", "bold"); doc.setFontSize(5.5); doc.setTextColor(80, 80, 80);
        doc.text(row[0] + ":", sx + 1.5, ry + 4.5);
        doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(0, 0, 0);
        if (row[1]) doc.text(row[1], sx + 1.5 + 20, ry + 4.5);
      }
      ry += rh;
    });

    // Cut guides
    doc.setDrawColor(200); doc.setLineWidth(0.2);
    doc.setLineDashPattern([1.5, 1.5], 0);
    doc.line(sx, sy + SH, sx + SW, sy + SH);
    doc.line(sx + SW, sy, sx + SW, sy + SH);
  });

  doc.setFont("helvetica", "normal"); doc.setFontSize(6); doc.setTextColor(180, 180, 180);
  doc.text("✂  Cut along dashed lines — 6 stickers per page", 105, 285, { align: "center" });

  doc.save("YSApparels_MaterialSticker.pdf");
}

// ── FORM COMPONENTS ───────────────────────────────────────────────────────────
const IS = { width: "100%", border: "none", borderBottom: "1.5px solid #333", outline: "none", fontSize: 13, background: "transparent", padding: "4px 2px", color: "#111", fontFamily: "Arial, sans-serif" };
const LS = { display: "block", fontSize: 10, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 };
const FB = { marginBottom: 14 };
const R2 = { display: "flex", gap: 16 };

function Field({ name, label, value, onChange, flex }) {
  return (
    <div style={{ ...FB, ...(flex ? { flex } : {}) }}>
      <label style={LS}>{label}</label>
      <input name={name} value={value||""} onChange={onChange} style={IS} />
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
      <div style={{ marginTop: 20, fontWeight: 900, fontSize: 13, color: "#1a1a2e", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Measurements (Back)</div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr>{["Description","Required","Actual","Deviation"].map(h => (
            <th key={h} style={{ padding: "6px 8px", background: "#1a1a2e", color: "#fff", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {measurements.map((m, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fafafa" : "#fff" }}>
              <td style={{ padding: "3px 6px", fontSize: 10, color: "#444", borderBottom: "1px solid #eee" }}>{m}</td>
              {["req","act","dev"].map(t => (
                <td key={t} style={{ padding: "2px 4px", borderBottom: "1px solid #eee" }}>
                  <input name={`m_${t}_${i}`} value={data[`m_${t}_${i}`]||""} onChange={onChange}
                    style={{ width: "100%", border: "none", outline: "none", fontSize: 11, background: "transparent" }} />
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
  const rows = [["leather","Leather"],["color","Color"],["lining","Lining"],["acc","ACC"],["specialNotes","Special Notes"],["readyToShip","Ready to Ship"],["price","Price"]];
  return (
    <div>
      <div style={R2}>
        <Field name="style" label="Style" value={data.style} onChange={onChange} flex={1} />
        <Field name="collection" label="Collection" value={data.collection} onChange={onChange} flex={1} />
      </div>
      {rows.map(([key, label]) => <Field key={key} name={key} label={label} value={data[key]} onChange={onChange} />)}
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

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f4", fontFamily: "Arial, sans-serif" }}>
      <div style={{ background: "#0f0f0f", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <div>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 17, letterSpacing: 3 }}>YS APPARELS</span>
          <span style={{ color: "#b49650", fontSize: 9, letterSpacing: 2, marginLeft: 10 }}>THE 2ND SKIN</span>
        </div>
        <span style={{ color: "#555", fontSize: 10, letterSpacing: 1 }}>DIGITAL FORMS</span>
      </div>

      <div style={{ background: "#1a1a1a", display: "flex", paddingLeft: 24 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "11px 20px", border: "none", background: "none", cursor: "pointer",
            fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase",
            color: tab === t.id ? "#b49650" : "#666",
            borderBottom: tab === t.id ? "2px solid #b49650" : "2px solid transparent",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 560, margin: "28px auto", padding: "0 16px" }}>
        <div style={{ background: "#fff", borderRadius: 6, boxShadow: "0 2px 16px rgba(0,0,0,0.1)", overflow: "hidden" }}>
          <div style={{ background: "#0f0f0f", padding: "16px 24px" }}>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 18, letterSpacing: 3 }}>YS APPARELS</div>
            <div style={{ color: "#b49650", fontSize: 9, letterSpacing: 2, marginTop: 2 }}>
              {tab === "sample" ? "SAMPLE CARD" : tab === "collection" ? "COLLECTION CARD" : "MATERIAL STICKER"}
            </div>
          </div>

          <div style={{ padding: "24px" }}>
            {tab === "sample" && <SampleCardForm data={sampleData} onChange={hS} />}
            {tab === "collection" && <CollectionForm data={collData} onChange={hC} />}
            {tab === "sticker" && <StickerForm data={stickerData} onChange={hST} />}
          </div>

          {/* Print tip */}
          <div style={{ margin: "0 24px 16px", background: "#fff8e8", border: "1px solid #e0c060", borderRadius: 5, padding: "10px 14px", fontSize: 11, color: "#7a5500", lineHeight: 1.7 }}>
            <strong>How to print:</strong><br />
            {tab === "sticker"
              ? "PDF has 6 stickers on one A4 page. Print → cut along dashed lines."
              : "PDF puts front & back side-by-side on one A4 landscape sheet. Print → fold in half → cut on the dashed line. Perfect alignment every time."}
          </div>

          <div style={{ background: "#f9f9f9", borderTop: "1px solid #eee", padding: "14px 24px", display: "flex", gap: 10 }}>
            <button onClick={handlePDF} style={{ flex: 1, padding: "11px 0", background: "#0f0f0f", color: "#fff", border: "none", borderRadius: 5, fontWeight: 700, fontSize: 13, letterSpacing: 1, cursor: "pointer" }}>
              ⬇ DOWNLOAD PDF
            </button>
            <button onClick={reset} style={{ padding: "11px 20px", background: "#fff", color: "#666", border: "1.5px solid #ddd", borderRadius: 5, fontSize: 12, cursor: "pointer" }}>
              Reset
            </button>
          </div>

          <div style={{ background: "#0f0f0f", padding: "8px 24px", textAlign: "center" }}>
            <div style={{ color: "#555", fontSize: 9, lineHeight: 1.7 }}>
              Plot #106, Street #3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore<br />
              ☎ +92 42 35965348-49 &nbsp;·&nbsp; yasir@ysapparels.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
