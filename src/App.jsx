import { useState } from "react";

const CompanyHeader = ({ compact = false }) => (
  <div style={{ marginBottom: compact ? 8 : 12 }}>
    <div style={{ fontSize: compact ? 20 : 26, fontWeight: 900, letterSpacing: 3, color: "#1a1a2e", fontFamily: "'Arial Black', sans-serif", textAlign: "center" }}>YS APPARELS</div>
    <div style={{ fontSize: compact ? 7 : 8, color: "#555", lineHeight: 1.6, marginTop: 3, textAlign: "center" }}>
      Plot # 106, Street # 3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore<br />
      ☎ +92 42 35965348-49 &nbsp;✉ yasir@ysapparels.com
    </div>
  </div>
);

function PrintInstructions({ tab, onConfirm, onCancel }) {
  const isSample = tab === "sample";
  const isSticker = tab === "sticker";
  const size = isSticker ? "80mm × 60mm" : "100mm × 140mm";
  const label = isSticker ? "Material Sticker" : isSample ? "Sample Card (2 pages: front + measurements)" : "Collection Card";

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 10, padding: 24, maxWidth: 420, width: "100%", boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}>
        <div style={{ fontWeight: 900, fontSize: 16, color: "#1a1a2e", marginBottom: 6 }}>🖨️ Before You Print</div>
        <div style={{ fontSize: 12, color: "#555", marginBottom: 16 }}>Printing: <strong>{label}</strong></div>

        <div style={{ background: "#f5f5f5", borderRadius: 8, padding: 14, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "#1a1a2e" }}>Set these in the print dialog:</div>
          <div style={{ fontSize: 12, lineHeight: 2 }}>
            <div>① <strong>Destination:</strong> Choose your printer or Save as PDF</div>
            <div>② <strong>Paper size:</strong> Select <strong style={{ color: "#c00" }}>Custom</strong> → enter <strong style={{ color: "#c00" }}>{size}</strong></div>
            <div>③ <strong>Margins:</strong> Set to <strong>None</strong></div>
            <div>④ <strong>Scale:</strong> Set to <strong>100%</strong> (do not fit to page)</div>
            {isSample && <div>⑤ <strong>Pages:</strong> It will print 2 pages — front then measurements</div>}
          </div>
        </div>

        <div style={{ background: "#fff8e1", border: "1px solid #f0c040", borderRadius: 6, padding: 10, marginBottom: 16, fontSize: 11, color: "#7a5500" }}>
          ⚠️ If you leave paper size as A4, the card will print the wrong size and waste paper.
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onConfirm} style={{ flex: 1, padding: "10px 0", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 7, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            I've read this — Print Now
          </button>
          <button onClick={onCancel} style={{ padding: "10px 16px", background: "transparent", color: "#888", border: "1.5px solid #ddd", borderRadius: 7, fontSize: 13, cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

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

function printSampleCard(data) {
  const win = window.open("", "_blank");
  const mRows = measurements.map((m, i) => `<tr><td class="desc">${m}</td><td>${data[`m_req_${i}`]||""}</td><td>${data[`m_act_${i}`]||""}</td><td>${data[`m_dev_${i}`]||""}</td></tr>`).join("");
  win.document.write(`<html><head><title>Sample Card</title><style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:Arial,sans-serif;}
    .page{width:100mm;padding:6mm 6mm;page-break-after:always;}
    .co{font-size:18px;font-weight:900;letter-spacing:3px;text-align:center;}
    .co-sub{font-size:6.5px;color:#555;text-align:center;line-height:1.6;margin-bottom:7px;}
    .badge{display:inline-block;background:#000;color:#fff;font-weight:900;font-size:12px;letter-spacing:3px;padding:3px 16px;margin-bottom:9px;}
    .bc{text-align:center;}
    .field{display:flex;align-items:baseline;gap:4px;margin-bottom:9px;}
    .field-row{display:flex;gap:8px;margin-bottom:9px;}
    .half{flex:1;display:flex;align-items:baseline;gap:4px;}
    .lbl{font-weight:700;font-size:10px;white-space:nowrap;}
    .line{flex:1;border-bottom:1px solid #000;font-size:10px;padding:0 2px;min-width:20px;display:inline-block;}
    .divider{border-bottom:1.5px solid #000;margin-bottom:3px;}
    table{width:100%;border-collapse:collapse;font-size:8px;}
    th,td{border:1px solid #999;padding:2.5px 4px;text-align:left;}
    thead tr{background:#ddd;font-weight:700;}
    .desc{background:#fafafa;width:52%;}
    .page2{page-break-after:auto;}
    @media print{@page{size:100mm 140mm;margin:0;}body{margin:0;}}
  </style></head><body>
  <div class="page">
    <div class="co">YS APPARELS</div>
    <div class="co-sub">Plot # 106, Street # 3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore<br>☎ +92 42 35965348-49 &nbsp; ✉ yasir@ysapparels.com</div>
    <div class="bc"><div class="badge">SAMPLE CARD</div></div>
    <div class="field"><span class="lbl">Style:</span><span class="line">${data.style||""}</span></div>
    <div class="field"><span class="lbl">Leather:</span><span class="line">${data.leather||""}</span></div>
    <div class="field-row">
      <div class="half"><span class="lbl">Color:</span><span class="line">${data.color||""}</span></div>
      <div class="half"><span class="lbl">Size:</span><span class="line">${data.size||""}</span></div>
    </div>
    <div class="field"><span class="lbl">Type of Sample:</span><span class="line">${data.typeOfSample||""}</span></div>
    <div class="field-row">
      <div class="half"><span class="lbl">Season:</span><span class="line">${data.season||""}</span></div>
      <div class="half"><span class="lbl">Brand:</span><span class="line">${data.brand||""}</span></div>
    </div>
    <div class="field-row">
      <div class="half"><span class="lbl">Padding Body:</span><span class="line">${data.paddingBody||""}</span></div>
      <div class="half"><span class="lbl">Gms:</span><span class="line">${data.paddingGms||""}</span></div>
    </div>
    <div class="field-row">
      <div class="half"><span class="lbl">Sleeves:</span><span class="line">${data.sleeves||""}</span></div>
      <div class="half"><span class="lbl">Gms:</span><span class="line">${data.sleevesGms||""}</span></div>
    </div>
    <div class="field"><span class="lbl">Remarks:</span><span class="line">${data.remarks||""}</span></div>
    <div class="divider"></div><div class="divider" style="margin-top:3px"></div>
  </div>
  <div class="page page2">
    <div style="text-align:center;margin-bottom:8px;font-weight:900;font-size:16px;letter-spacing:2px">MEASUREMENTS</div>
    <table><thead><tr><th>DESCRIPTION</th><th>REQUIRED</th><th>ACTUAL</th><th>DEVIATION</th></tr></thead>
    <tbody>${mRows}</tbody></table>
  </div>
  </body></html>`);
  win.document.close(); win.focus(); setTimeout(() => win.print(), 700);
}

function printCollectionCard(data) {
  const win = window.open("", "_blank");
  const rows = [["Leather","leather"],["Color","color"],["Lining","lining"],["ACC","acc"],["Special Notes","specialNotes"],["Ready to Ship","readyToShip"],["Price","price"]];
  win.document.write(`<html><head><title>Collection Card</title><style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:Arial,sans-serif;}
    .page{width:100mm;padding:6mm 6mm;}
    .co{font-size:18px;font-weight:900;letter-spacing:3px;text-align:center;}
    .co-sub{font-size:6.5px;color:#555;text-align:center;line-height:1.6;margin-bottom:7px;}
    .badge{display:inline-block;background:#000;color:#fff;font-weight:900;font-size:12px;letter-spacing:3px;padding:3px 16px;margin-bottom:9px;}
    .bc{text-align:center;}
    table{width:100%;border-collapse:collapse;font-size:10px;}
    td{border:1px solid #999;padding:5px 6px;}
    .lbl{font-weight:700;background:#f0f0f0;width:28%;}
    .srow td{background:#e0e0e0;font-weight:700;}
    @media print{@page{size:100mm 140mm;margin:0;}body{margin:0;}}
  </style></head><body>
  <div class="page">
    <div class="co">YS APPARELS</div>
    <div class="co-sub">Plot # 106, Street # 3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore<br>☎ +92 42 35965348-49 &nbsp; ✉ yasir@ysapparels.com</div>
    <div class="bc"><div class="badge">SAMPLE CARD</div></div>
    <table>
      <tr class="srow"><td class="lbl">Style</td><td>${data.style||""}</td><td class="lbl">Collection</td><td>${data.collection||""}</td></tr>
      ${rows.map(([l,k])=>`<tr><td class="lbl">${l}</td><td colspan="3">${data[k]||""}</td></tr>`).join("")}
    </table>
  </div></body></html>`);
  win.document.close(); win.focus(); setTimeout(() => win.print(), 700);
}

function printSticker(data) {
  const win = window.open("", "_blank");
  win.document.write(`<html><head><title>Material Sticker</title><style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:Arial,sans-serif;}
    .page{width:80mm;height:60mm;padding:3mm 4mm;overflow:hidden;}
    .co{font-size:13px;font-weight:900;letter-spacing:2px;text-align:center;}
    .co-sub{font-size:5.5px;color:#555;text-align:center;line-height:1.4;margin-bottom:4px;}
    .field{display:flex;align-items:center;border:1.5px solid #000;border-bottom:none;font-size:9px;}
    .lbl{font-weight:700;padding:2.5px 5px;min-width:95px;border-right:1.5px solid #000;}
    .val{flex:1;padding:2.5px 5px;}
    .half-row{display:flex;border:1.5px solid #000;border-bottom:none;font-size:9px;}
    .half{flex:1;display:flex;align-items:center;}
    .half:first-child{border-right:1.5px solid #000;}
    .hlbl{font-weight:700;padding:2.5px 5px;border-right:1.5px solid #000;}
    .hval{flex:1;padding:2.5px 4px;}
    .last{border-bottom:1.5px solid #000;}
    @media print{@page{size:80mm 60mm;margin:0;}body{margin:0;}}
  </style></head><body>
  <div class="page">
    <div class="co">YS APPARELS</div>
    <div class="co-sub">Plot # 106, Street # 3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore &nbsp; ☎ +92 42 35965348-49</div>
    <div class="field"><span class="lbl">DATE:</span><span class="val">${data.date||""}</span></div>
    <div class="field"><span class="lbl">LEATHER:</span><span class="val">${data.leather||""}</span></div>
    <div class="field"><span class="lbl">ARTICLE:</span><span class="val">${data.article||""}</span></div>
    <div class="field"><span class="lbl">COLOUR:</span><span class="val">${data.colour||""}</span></div>
    <div class="half-row">
      <div class="half"><span class="hlbl">CUSTOMER:</span><span class="hval">${data.customer||""}</span></div>
      <div class="half"><span class="hlbl">LEATH. THICK.:</span><span class="hval">${data.leatherThickness||""}</span></div>
    </div>
    <div class="field last"><span class="lbl">REMARKS:</span><span class="val">${data.remarks||""}</span></div>
  </div></body></html>`);
  win.document.close(); win.focus(); setTimeout(() => win.print(), 700);
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
  const [showInstructions, setShowInstructions] = useState(false);

  const handleS = e => setSampleData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleC = e => setCollData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleST = e => setStickerData(p => ({ ...p, [e.target.name]: e.target.value }));

  const reset = () => {
    if (tab === "sample") setSampleData({});
    if (tab === "collection") setCollData({});
    if (tab === "sticker") setStickerData({});
  };

  const handlePrintConfirm = () => {
    setShowInstructions(false);
    if (tab === "sample") printSampleCard(sampleData);
    if (tab === "collection") printCollectionCard(collData);
    if (tab === "sticker") printSticker(stickerData);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", fontFamily: "Arial, sans-serif" }}>
      {showInstructions && (
        <PrintInstructions
          tab={tab}
          onConfirm={handlePrintConfirm}
          onCancel={() => setShowInstructions(false)}
        />
      )}

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

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={() => setShowInstructions(true)}
              style={{ flex: 1, padding: "11px 0", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 7, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              🖨️ Print / Download PDF
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
