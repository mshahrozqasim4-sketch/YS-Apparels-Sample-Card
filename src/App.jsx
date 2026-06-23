import { useState } from "react";

// YSA Logo as SVG (recreated from the colorful version)
const YSALogo = ({ size = 60 }) => (
  <svg width={size} height={size * 0.55} viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Y */}
    <polygon points="0,0 25,0 40,35 55,0 80,0 55,55 55,85 25,85 25,55" fill="#B8860B"/>
    {/* S overlapping */}
    <rect x="30" y="20" width="50" height="45" fill="#1a1a2e" opacity="0.85"/>
    {/* A triangle */}
    <polygon points="100,0 160,0 160,85 130,85" fill="#2d5a27"/>
    {/* small square accent */}
    <rect x="62" y="38" width="28" height="28" fill="#8B0000"/>
    <text x="100" y="105" textAnchor="middle" fontSize="13" fill="#333" fontFamily="Georgia,serif" letterSpacing="3">THE 2ND SKIN</text>
    <line x1="10" y1="100" x2="75" y2="100" stroke="#333" strokeWidth="1.5"/>
    <line x1="125" y1="100" x2="190" y2="100" stroke="#333" strokeWidth="1.5"/>
  </svg>
);

const CompanyHeader = ({ compact = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: compact ? 10 : 16, marginBottom: compact ? 8 : 12 }}>
    <YSALogo size={compact ? 50 : 70} />
    <div>
      <div style={{ fontSize: compact ? 18 : 24, fontWeight: 900, letterSpacing: 2, color: "#1a1a2e", fontFamily: "'Arial Black', sans-serif", lineHeight: 1 }}>YS APPARELS</div>
      <div style={{ fontSize: compact ? 7 : 9, color: "#555", lineHeight: 1.5, marginTop: 2 }}>
        Plot # 106, Street # 3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore<br />
        ☎ +92 42 35965348-49 &nbsp;✉ yasir@ysapparels.com
      </div>
    </div>
  </div>
);

// ─── FORM 1: SAMPLE CARD (FRONT) ────────────────────────────────────────────
function SampleCardFront({ data, onChange }) {
  const f = (name, label, half = false, sibling = null) => (
    <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 14, ...(half ? { flex: 1 } : {}) }}>
      <label style={{ fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", minWidth: half ? "auto" : 120 }}>{label}:</label>
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
      <div style={{ display: "flex", gap: 16 }}>
        {f("color", "Color", true)}
        {f("size", "Size", true)}
      </div>
      {f("typeOfSample", "Type of Sample")}
      <div style={{ display: "flex", gap: 16 }}>
        {f("season", "Season", true)}
        {f("brand", "Brand", true)}
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {f("paddingBody", "Padding Body", true)}
        {f("paddingGms", "Gms", true)}
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {f("sleeves", "Sleeves", true)}
        {f("sleevesGms", "Gms", true)}
      </div>
      {f("remarks", "Remarks")}
      <div style={{ borderBottom: "1.5px solid #000", marginBottom: 6 }} />
      <div style={{ borderBottom: "1.5px solid #000", marginBottom: 12 }} />
    </div>
  );
}

// ─── FORM 1: MEASUREMENTS (BACK) ────────────────────────────────────────────
const measurements = [
  "Chest 1/2 (1cm below Armhole)", "Waist Height", "Waist 1/2", "Bottom 1/2",
  "Centre Back Length", "Front Length", "Shoulder", "Across Shoulder",
  "Front Across", "Armhole Straight", "Sleeve Length", "Bicep 1/2",
  "Elbow", "Cuff 1/2 Relaxed", "Collar Length From Upper Edge",
  "Front Neck Drop Vertical CF", "Hood Height Top Edge", "Hood Height Centre",
  "Measurements in CMS", "", "", ""
];

function MeasurementsBack({ data, onChange }) {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: 2, color: "#1a1a2e" }}>MEASUREMENTS</div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr style={{ background: "#ddd" }}>
            <th style={th}>DESCRIPTION</th>
            <th style={th}>REQUIRED</th>
            <th style={th}>ACTUAL</th>
            <th style={th}>DEVIATION</th>
          </tr>
        </thead>
        <tbody>
          {measurements.map((m, i) => (
            <tr key={i}>
              <td style={{ ...td, fontWeight: m ? 400 : 400, background: "#fafafa" }}>{m}</td>
              <td style={td}>
                <input name={`m_req_${i}`} value={data[`m_req_${i}`] || ""} onChange={onChange}
                  style={cellInput} />
              </td>
              <td style={td}>
                <input name={`m_act_${i}`} value={data[`m_act_${i}`] || ""} onChange={onChange}
                  style={cellInput} />
              </td>
              <td style={td}>
                <input name={`m_dev_${i}`} value={data[`m_dev_${i}`] || ""} onChange={onChange}
                  style={cellInput} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── FORM 2: COLLECTION CARD ─────────────────────────────────────────────────
function CollectionCard({ data, onChange }) {
  const rows = [
    { label: "Leather", key: "leather" },
    { label: "Color", key: "color" },
    { label: "Lining", key: "lining" },
    { label: "ACC", key: "acc" },
    { label: "Special Notes", key: "specialNotes" },
    { label: "Ready to Ship", key: "readyToShip" },
    { label: "Price", key: "price" },
  ];
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ display: "inline-block", background: "#000", color: "#fff", fontWeight: 900, fontSize: 16, letterSpacing: 3, padding: "5px 24px" }}>SAMPLE CARD</div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <tbody>
          <tr style={{ background: "#e0e0e0" }}>
            <td style={{ ...td, fontWeight: 700, width: "35%" }}>Style</td>
            <td style={td}>
              <input name="style" value={data.style || ""} onChange={onChange} style={cellInput} />
            </td>
            <td style={{ ...td, fontWeight: 700, width: "28%" }}>Collection</td>
            <td style={td}>
              <input name="collection" value={data.collection || ""} onChange={onChange} style={cellInput} />
            </td>
          </tr>
          {rows.map(({ label, key }) => (
            <tr key={key}>
              <td style={{ ...td, fontWeight: 700, background: "#f5f5f5" }}>{label}</td>
              <td style={td} colSpan={3}>
                <input name={key} value={data[key] || ""} onChange={onChange} style={{ ...cellInput, width: "100%" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── FORM 3: MATERIAL STICKER ────────────────────────────────────────────────
function MaterialSticker({ data, onChange }) {
  const f = (name, label) => (
    <div style={{ display: "flex", alignItems: "center", border: "2px solid #000", marginBottom: -2 }}>
      <div style={{ fontWeight: 700, fontSize: 13, padding: "6px 10px", minWidth: 120 }}>{label}:</div>
      <input name={name} value={data[name] || ""} onChange={onChange}
        style={{ flex: 1, border: "none", outline: "none", fontSize: 13, padding: "6px 8px", background: "transparent" }} />
    </div>
  );
  return (
    <div>
      <div style={{ border: "2px solid #000" }}>
        {f("date", "DATE")}
        {f("leather", "LEATHER")}
        {f("article", "ARTICLE")}
        {f("colour", "COLOUR")}
        <div style={{ display: "flex", borderTop: "2px solid #000" }}>
          <div style={{ flex: 1, borderRight: "2px solid #000" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 12, padding: "6px 8px", whiteSpace: "nowrap" }}>CUSTOMER:</div>
              <input name="customer" value={data.customer || ""} onChange={onChange}
                style={{ flex: 1, border: "none", outline: "none", fontSize: 12, padding: "6px 4px", background: "transparent" }} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 11, padding: "6px 6px", whiteSpace: "nowrap" }}>LEATHER THICKNESS:</div>
              <input name="leatherThickness" value={data.leatherThickness || ""} onChange={onChange}
                style={{ flex: 1, border: "none", outline: "none", fontSize: 12, padding: "6px 4px", background: "transparent" }} />
            </div>
          </div>
        </div>
        {f("remarks", "REMARKS")}
      </div>
    </div>
  );
}

// ─── PRINT FUNCTIONS ─────────────────────────────────────────────────────────
function printSampleCard(data) {
  const win = window.open("", "_blank");
  const logoSVG = `<svg width="70" height="39" viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="0,0 25,0 40,35 55,0 80,0 55,55 55,85 25,85 25,55" fill="#B8860B"/><rect x="30" y="20" width="50" height="45" fill="#1a1a2e" opacity="0.85"/><polygon points="100,0 160,0 160,85 130,85" fill="#2d5a27"/><rect x="62" y="38" width="28" height="28" fill="#8B0000"/><text x="100" y="105" text-anchor="middle" font-size="13" fill="#333" font-family="Georgia,serif" letter-spacing="3">THE 2ND SKIN</text><line x1="10" y1="100" x2="75" y2="100" stroke="#333" stroke-width="1.5"/><line x1="125" y1="100" x2="190" y2="100" stroke="#333" stroke-width="1.5"/></svg>`;

  const frontHTML = `
    <div class="page">
      <div class="header">
        ${logoSVG}
        <div class="co-info">
          <div class="co-name">YS APPARELS</div>
          <div class="co-sub">Plot # 106, Street # 3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore<br>☎ +92 42 35965348-49 &nbsp; ✉ yasir@ysapparels.com</div>
        </div>
      </div>
      <div class="badge">SAMPLE CARD</div>
      <div class="field"><span class="lbl">Style:</span><span class="line">${data.style||""}</span></div>
      <div class="field"><span class="lbl">Leather:</span><span class="line">${data.leather||""}</span></div>
      <div class="field-row">
        <div class="field half"><span class="lbl">Color:</span><span class="line">${data.color||""}</span></div>
        <div class="field half"><span class="lbl">Size:</span><span class="line">${data.size||""}</span></div>
      </div>
      <div class="field"><span class="lbl">Type of Sample:</span><span class="line">${data.typeOfSample||""}</span></div>
      <div class="field-row">
        <div class="field half"><span class="lbl">Season:</span><span class="line">${data.season||""}</span></div>
        <div class="field half"><span class="lbl">Brand:</span><span class="line">${data.brand||""}</span></div>
      </div>
      <div class="field-row">
        <div class="field half"><span class="lbl">Padding Body:</span><span class="line">${data.paddingBody||""}</span></div>
        <div class="field half"><span class="lbl">Gms:</span><span class="line">${data.paddingGms||""}</span></div>
      </div>
      <div class="field-row">
        <div class="field half"><span class="lbl">Sleeves:</span><span class="line">${data.sleeves||""}</span></div>
        <div class="field half"><span class="lbl">Gms:</span><span class="line">${data.sleevesGms||""}</span></div>
      </div>
      <div class="field"><span class="lbl">Remarks:</span><span class="line">${data.remarks||""}</span></div>
      <div class="divider"></div><div class="divider mt4"></div>
    </div>`;

  const mRows = measurements.map((m, i) => `
    <tr>
      <td class="desc">${m}</td>
      <td>${data[`m_req_${i}`]||""}</td>
      <td>${data[`m_act_${i}`]||""}</td>
      <td>${data[`m_dev_${i}`]||""}</td>
    </tr>`).join("");

  const backHTML = `
    <div class="page page2">
      <div style="text-align:center;margin-bottom:10px">
        <span style="font-weight:900;font-size:18px;letter-spacing:2px">MEASUREMENTS</span>
      </div>
      <table>
        <thead><tr class="thead"><th>DESCRIPTION</th><th>REQUIRED</th><th>ACTUAL</th><th>DEVIATION</th></tr></thead>
        <tbody>${mRows}</tbody>
      </table>
    </div>`;

  win.document.write(`<html><head><title>Sample Card – YS Apparels</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:Arial,sans-serif;background:#fff;}
    .page{width:100mm;min-height:140mm;padding:8px 10px;border:1px solid #ccc;margin:4mm auto;page-break-after:always;}
    .page2{page-break-after:auto;}
    .header{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
    .co-name{font-size:18px;font-weight:900;letter-spacing:2px;}
    .co-sub{font-size:7px;color:#555;line-height:1.5;margin-top:2px;}
    .badge{display:inline-block;background:#000;color:#fff;font-weight:900;font-size:13px;letter-spacing:3px;padding:3px 18px;margin-bottom:10px;}
    .field{display:flex;align-items:baseline;gap:4px;margin-bottom:10px;}
    .field-row{display:flex;gap:10px;margin-bottom:10px;}
    .half{flex:1;}
    .lbl{font-weight:700;font-size:11px;white-space:nowrap;}
    .line{flex:1;border-bottom:1px solid #000;display:inline-block;min-width:40px;font-size:11px;padding:0 3px;}
    .divider{border-bottom:1.5px solid #000;margin-bottom:4px;}
    .mt4{margin-top:4px;}
    table{width:100%;border-collapse:collapse;font-size:9px;}
    th,td{border:1px solid #999;padding:3px 5px;text-align:left;}
    .thead{background:#ddd;font-weight:700;font-size:9px;}
    .desc{background:#fafafa;}
    @media print{body{margin:0;}@page{size:100mm 140mm;margin:0;}}
  </style></head><body>${frontHTML}${backHTML}</body></html>`);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 700);
}

function printCollectionCard(data) {
  const win = window.open("", "_blank");
  const logoSVG = `<svg width="60" height="33" viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="0,0 25,0 40,35 55,0 80,0 55,55 55,85 25,85 25,55" fill="#B8860B"/><rect x="30" y="20" width="50" height="45" fill="#1a1a2e" opacity="0.85"/><polygon points="100,0 160,0 160,85 130,85" fill="#2d5a27"/><rect x="62" y="38" width="28" height="28" fill="#8B0000"/><text x="100" y="105" text-anchor="middle" font-size="13" fill="#333" font-family="Georgia,serif" letter-spacing="3">THE 2ND SKIN</text><line x1="10" y1="100" x2="75" y2="100" stroke="#333" stroke-width="1.5"/><line x1="125" y1="100" x2="190" y2="100" stroke="#333" stroke-width="1.5"/></svg>`;
  const rows = [
    ["Leather", data.leather], ["Color", data.color], ["Lining", data.lining],
    ["ACC", data.acc], ["Special Notes", data.specialNotes],
    ["Ready to Ship", data.readyToShip], ["Price", data.price]
  ];
  win.document.write(`<html><head><title>Collection Card – YS Apparels</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:Arial,sans-serif;background:#fff;}
    .page{width:100mm;min-height:140mm;padding:8px 10px;margin:0 auto;}
    .header{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
    .co-name{font-size:16px;font-weight:900;letter-spacing:2px;}
    .co-sub{font-size:7px;color:#555;line-height:1.5;margin-top:2px;}
    .badge{display:inline-block;background:#000;color:#fff;font-weight:900;font-size:13px;letter-spacing:3px;padding:3px 18px;margin-bottom:10px;}
    table{width:100%;border-collapse:collapse;font-size:11px;}
    td{border:1px solid #999;padding:5px 7px;}
    .lbl{font-weight:700;background:#f0f0f0;width:30%;}
    .srow{background:#e0e0e0;font-weight:700;}
    @media print{@page{size:100mm 140mm;margin:0;}}
  </style></head><body>
  <div class="page">
    <div class="header">${logoSVG}<div class="co-info"><div class="co-name">YS APPARELS</div><div class="co-sub">Plot # 106, Street # 3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore<br>☎ +92 42 35965348-49 &nbsp; ✉ yasir@ysapparels.com</div></div></div>
    <div class="badge">SAMPLE CARD</div>
    <table>
      <tr class="srow"><td class="lbl">Style</td><td>${data.style||""}</td><td class="lbl">Collection</td><td>${data.collection||""}</td></tr>
      ${rows.map(([l, v]) => `<tr><td class="lbl">${l}</td><td colspan="3">${v||""}</td></tr>`).join("")}
    </table>
  </div></body></html>`);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 700);
}

function printSticker(data) {
  const win = window.open("", "_blank");
  const logoSVG = `<svg width="55" height="30" viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="0,0 25,0 40,35 55,0 80,0 55,55 55,85 25,85 25,55" fill="#B8860B"/><rect x="30" y="20" width="50" height="45" fill="#1a1a2e" opacity="0.85"/><polygon points="100,0 160,0 160,85 130,85" fill="#2d5a27"/><rect x="62" y="38" width="28" height="28" fill="#8B0000"/><text x="100" y="105" text-anchor="middle" font-size="13" fill="#333" font-family="Georgia,serif" letter-spacing="3">THE 2ND SKIN</text><line x1="10" y1="100" x2="75" y2="100" stroke="#333" stroke-width="1.5"/><line x1="125" y1="100" x2="190" y2="100" stroke="#333" stroke-width="1.5"/></svg>`;
  win.document.write(`<html><head><title>Material Sticker – YS Apparels</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:Arial,sans-serif;background:#fff;}
    .page{width:80mm;height:60mm;padding:5px 7px;margin:0 auto;overflow:hidden;}
    .header{display:flex;align-items:center;gap:8px;margin-bottom:5px;}
    .co-name{font-size:14px;font-weight:900;letter-spacing:1px;}
    .co-sub{font-size:6px;color:#555;line-height:1.4;margin-top:1px;}
    .field{display:flex;align-items:center;border:1.5px solid #000;border-bottom:none;font-size:10px;}
    .field:last-child{border-bottom:1.5px solid #000;}
    .lbl{font-weight:700;padding:3px 6px;min-width:90px;}
    .val{flex:1;padding:3px 5px;border-left:1.5px solid #000;}
    .half-row{display:flex;border:1.5px solid #000;border-bottom:none;}
    .half{flex:1;display:flex;align-items:center;font-size:10px;}
    .half:first-child{border-right:1.5px solid #000;}
    @media print{@page{size:80mm 60mm;margin:0;}}
  </style></head><body>
  <div class="page">
    <div class="header">
      ${logoSVG}
      <div><div class="co-name">YS APPARELS</div><div class="co-sub">Plot # 106, Street # 3, Nader Chowk, Rohi Nala<br>21-Km Ferozepur Road, Lahore &nbsp; ☎ +92 42 35965348-49</div></div>
    </div>
    <div class="field"><span class="lbl">DATE:</span><span class="val">${data.date||""}</span></div>
    <div class="field"><span class="lbl">LEATHER:</span><span class="val">${data.leather||""}</span></div>
    <div class="field"><span class="lbl">ARTICLE:</span><span class="val">${data.article||""}</span></div>
    <div class="field"><span class="lbl">COLOUR:</span><span class="val">${data.colour||""}</span></div>
    <div class="half-row">
      <div class="half"><span class="lbl">CUSTOMER:</span><span style="flex:1;padding:3px 4px">${data.customer||""}</span></div>
      <div class="half"><span class="lbl" style="min-width:110px">LEATHER THICKNESS:</span><span style="flex:1;padding:3px 4px">${data.leatherThickness||""}</span></div>
    </div>
    <div class="field" style="border-top:1.5px solid #000"><span class="lbl">REMARKS:</span><span class="val">${data.remarks||""}</span></div>
  </div></body></html>`);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 700);
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: "sample", label: "Sample Card" },
  { id: "collection", label: "Collection Card" },
  { id: "sticker", label: "Material Sticker" },
];

export default function App() {
  const [tab, setTab] = useState("sample");
  const [sampleFront, setSampleFront] = useState({});
  const [collData, setCollData] = useState({});
  const [stickerData, setStickerData] = useState({});

  const handleSF = e => setSampleFront(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleC = e => setCollData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleST = e => setStickerData(p => ({ ...p, [e.target.name]: e.target.value }));

  const resetAll = () => {
    if (tab === "sample") setSampleFront({});
    if (tab === "collection") setCollData({});
    if (tab === "sticker") setStickerData({});
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", fontFamily: "Arial, sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: "#1a1a2e", padding: "12px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <YSALogo size={40} />
        <div>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 16, letterSpacing: 2 }}>YS APPARELS</div>
          <div style={{ color: "#c9a84c", fontSize: 9, letterSpacing: 1 }}>DIGITAL FORMS SYSTEM</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "2px solid #e0e0e0", paddingLeft: 16 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: "12px 20px", border: "none", background: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
              color: tab === t.id ? "#1a1a2e" : "#888",
              borderBottom: tab === t.id ? "3px solid #1a1a2e" : "3px solid transparent",
              marginBottom: -2 }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 600, margin: "20px auto", padding: "0 12px" }}>
        <div style={{ background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <CompanyHeader compact={tab === "sticker"} />
          <hr style={{ margin: "10px 0 16px", border: "none", borderTop: "2px solid #1a1a2e" }} />

          {tab === "sample" && <SampleCardFront data={sampleFront} onChange={handleSF} />}
          {tab === "sample" && <MeasurementsBack data={sampleFront} onChange={handleSF} />}
          {tab === "collection" && <CollectionCard data={collData} onChange={handleC} />}
          {tab === "sticker" && <MaterialSticker data={stickerData} onChange={handleST} />}

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={() => {
              if (tab === "sample") printSampleCard(sampleFront);
              if (tab === "collection") printCollectionCard(collData);
              if (tab === "sticker") printSticker(stickerData);
            }} style={{ flex: 1, padding: "11px 0", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 7, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              🖨️ Print / Download PDF
            </button>
            <button onClick={resetAll}
              style={{ padding: "11px 18px", background: "transparent", color: "#888", border: "1.5px solid #ddd", borderRadius: 7, fontSize: 13, cursor: "pointer" }}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared styles
const th = { border: "1px solid #999", padding: "5px 6px", textAlign: "left", fontWeight: 700, fontSize: 10, background: "#ddd" };
const td = { border: "1px solid #ccc", padding: "3px 6px", fontSize: 10 };
const cellInput = { width: "100%", border: "none", outline: "none", fontSize: 10, background: "transparent", padding: "1px 2px" };
