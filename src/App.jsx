import { useState } from "react";

function getJsPDF() {
  if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
  if (window.jsPDF) return window.jsPDF;
  return null;
}

const GOLD = [180, 150, 80];
const BLACK = [15, 15, 15];
const WHITE = [255, 255, 255];
const LGRAY = [240, 240, 240];
const MGRAY = [200, 200, 200];

// A4 = 210×297mm, Card = 100×140mm
// Page 1: card at top-LEFT  (x=5,  y=5)
// Page 2: card at top-RIGHT (x=105, y=5)  ← flips to align behind page 1

const P1X = 5,   CY = 5;
const P2X = 105;
const CW = 100, CH = 140;

function cardHeader(doc, ox, oy, badge) {
  doc.setFillColor(...BLACK);
  doc.rect(ox, oy, CW, 18, "F");
  doc.setFont("helvetica","bold"); doc.setFontSize(13); doc.setTextColor(...WHITE);
  doc.text("YS APPARELS", ox + CW/2, oy+8, {align:"center"});
  doc.setFont("helvetica","normal"); doc.setFontSize(5.5); doc.setTextColor(...GOLD);
  doc.text("THE 2ND SKIN  ·  LEATHER & LEATHER GARMENTS", ox+CW/2, oy+13, {align:"center"});
  doc.setFillColor(...GOLD);
  doc.rect(ox+(CW-44)/2, oy+19, 44, 7, "F");
  doc.setFont("helvetica","bold"); doc.setFontSize(7.5); doc.setTextColor(...BLACK);
  doc.text(badge, ox+CW/2, oy+24.2, {align:"center"});
}

function cardFooter(doc, ox, oy) {
  doc.setFillColor(...BLACK);
  doc.rect(ox, oy+CH-9, CW, 9, "F");
  doc.setFont("helvetica","normal"); doc.setFontSize(4.2); doc.setTextColor(150,150,150);
  doc.text("Plot #106, Street #3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore  |  +92 42 35965348-49  |  yasir@ysapparels.com", ox+CW/2, oy+CH-3.5, {align:"center"});
}

function drawField(doc, label, value, x, y, w, h=8) {
  doc.setFillColor(...LGRAY);
  doc.rect(x, y, w, h, "F");
  doc.setDrawColor(...MGRAY); doc.setLineWidth(0.2);
  doc.rect(x, y, w, h);
  doc.setFont("helvetica","bold"); doc.setFontSize(5.5); doc.setTextColor(100,100,100);
  doc.text(label, x+1.5, y+3);
  doc.setFont("helvetica","normal"); doc.setFontSize(8); doc.setTextColor(0,0,0);
  if (value) doc.text(String(value).substring(0,38), x+1.5, y+h-1.5);
}

function cutMarks(doc, ox, oy) {
  doc.setDrawColor(180,180,180); doc.setLineWidth(0.25);
  doc.setLineDashPattern([1.5,1.5], 0);
  // top
  doc.line(ox-3, oy, ox+CW+3, oy);
  // bottom
  doc.line(ox-3, oy+CH, ox+CW+3, oy+CH);
  // left
  doc.line(ox, oy-3, ox, oy+CH+3);
  // right
  doc.line(ox+CW, oy-3, ox+CW, oy+CH+3);
  doc.setLineDashPattern([], 0);
  doc.setFont("helvetica","normal"); doc.setFontSize(5); doc.setTextColor(180,180,180);
  doc.text("✂ cut", ox+CW+1, oy+2);
}

// ── SAMPLE CARD ───────────────────────────────────────────────────────────────
function generateSampleCardPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded. Refresh and try again."); return; }
  const doc = new JsPDF({ unit:"mm", format:[210,297] });
  const fh = 8, gap = 1;

  // ── PAGE 1: FRONT — top-left ──
  cardHeader(doc, P1X, CY, "SAMPLE CARD");
  let y = CY+28;

  const fl = (lbl, val) => { drawField(doc, lbl, val, P1X+2, y, CW-4, fh); y+=fh+gap; };
  const fh2 = (l1,v1,l2,v2) => {
    const hw=(CW-5)/2;
    drawField(doc,l1,v1, P1X+2,y, hw, fh);
    drawField(doc,l2,v2, P1X+2+hw+1,y, hw, fh);
    y+=fh+gap;
  };

  fl("STYLE", data.style);
  fl("LEATHER", data.leather);
  fh2("COLOR",data.color,"SIZE",data.size);
  fl("TYPE OF SAMPLE", data.typeOfSample);
  fh2("SEASON",data.season,"BRAND",data.brand);
  fh2("PADDING BODY",data.paddingBody,"GMS",data.paddingGms);
  fh2("SLEEVES",data.sleeves,"GMS",data.sleevesGms);
  fl("REMARKS", data.remarks);

  doc.setDrawColor(...BLACK); doc.setLineWidth(0.5);
  doc.line(P1X+2, y+1, P1X+CW-2, y+1);
  doc.line(P1X+2, y+4, P1X+CW-2, y+4);

  cardFooter(doc, P1X, CY);
  cutMarks(doc, P1X, CY);

  // ── PAGE 2: BACK — top-RIGHT ──
  doc.addPage();
  cardHeader(doc, P2X, CY, "MEASUREMENTS");

  const measurements = [
    "Chest 1/2 (1cm below Armhole)","Waist Height","Waist 1/2","Bottom 1/2",
    "Centre Back Length","Front Length","Shoulder","Across Shoulder",
    "Front Across","Armhole Straight","Sleeve Length","Bicep 1/2",
    "Elbow","Cuff 1/2 Relaxed","Collar Lgth From Upper Edge",
    "Front Neck Drop Vertical CF","Hood Height Top Edge","Hood Height Centre",
    "Measurements in CMS","","",""
  ];

  const cols=[48,13,13,13];
  let ty = CY+28;
  const sx = P2X+2;

  doc.setFillColor(...BLACK); doc.rect(sx, ty, 96, 5, "F");
  doc.setFont("helvetica","bold"); doc.setFontSize(5.5); doc.setTextColor(...WHITE);
  let cx=sx;
  ["DESCRIPTION","REQUIRED","ACTUAL","DEVIATION"].forEach((h,i)=>{
    doc.text(h, cx+1, ty+3.3); cx+=cols[i];
  });
  ty+=5;

  doc.setFont("helvetica","normal"); doc.setFontSize(5.5); doc.setTextColor(0,0,0);
  measurements.forEach((m,i)=>{
    if(ty>CY+CH-10) return;
    doc.setFillColor(i%2===0?248:255,i%2===0?248:255,i%2===0?248:255);
    doc.rect(sx,ty,96,4.8,"F");
    doc.setDrawColor(210); doc.setLineWidth(0.15); doc.rect(sx,ty,96,4.8);
    if(m) doc.text(m,sx+1,ty+3.3);
    cx=sx+cols[0];
    [data[`m_req_${i}`]||"",data[`m_act_${i}`]||"",data[`m_dev_${i}`]||""].forEach((v,j)=>{
      doc.setDrawColor(180); doc.line(cx,ty,cx,ty+4.8);
      if(v) doc.text(v,cx+1,ty+3.3);
      cx+=cols[j+1];
    });
    ty+=4.8;
  });

  cardFooter(doc, P2X, CY);
  cutMarks(doc, P2X, CY);

  doc.save("YSApparels_SampleCard.pdf");
}

// ── COLLECTION CARD ───────────────────────────────────────────────────────────
function generateCollectionPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded."); return; }
  const doc = new JsPDF({ unit:"mm", format:[210,297] });
  const rh=10;

  // PAGE 1: FRONT — top-left
  cardHeader(doc, P1X, CY, "SAMPLE CARD");
  let y = CY+28;

  doc.setFillColor(...BLACK); doc.rect(P1X+2,y,CW-4,rh,"F");
  doc.setFont("helvetica","bold"); doc.setFontSize(6); doc.setTextColor(...GOLD);
  doc.text("STYLE",P1X+3,y+4);
  doc.setFont("helvetica","normal"); doc.setFontSize(8); doc.setTextColor(...WHITE);
  if(data.style) doc.text(data.style,P1X+3,y+8.5);
  doc.setDrawColor(60); doc.line(P1X+2+48,y,P1X+2+48,y+rh);
  doc.setFont("helvetica","bold"); doc.setFontSize(6); doc.setTextColor(...GOLD);
  doc.text("COLLECTION",P1X+52,y+4);
  doc.setFont("helvetica","normal"); doc.setFontSize(8); doc.setTextColor(...WHITE);
  if(data.collection) doc.text(data.collection,P1X+52,y+8.5);
  y+=rh;

  [["LEATHER",data.leather],["COLOR",data.color],["LINING",data.lining],
   ["ACC",data.acc],["SPECIAL NOTES",data.specialNotes],
   ["READY TO SHIP",data.readyToShip],["PRICE",data.price]
  ].forEach((row,i)=>{
    doc.setFillColor(i%2===0?245:255,i%2===0?245:255,i%2===0?245:255);
    doc.rect(P1X+2,y,CW-4,rh,"F");
    doc.setDrawColor(...MGRAY); doc.setLineWidth(0.2); doc.rect(P1X+2,y,CW-4,rh);
    doc.setDrawColor(180); doc.line(P1X+2+26,y,P1X+2+26,y+rh);
    doc.setFont("helvetica","bold"); doc.setFontSize(6.5); doc.setTextColor(60,60,60);
    doc.text(row[0],P1X+3,y+6.5);
    doc.setFont("helvetica","normal"); doc.setFontSize(8.5); doc.setTextColor(0,0,0);
    if(row[1]) doc.text(row[1],P1X+30,y+6.5);
    y+=rh;
  });

  cardFooter(doc, P1X, CY);
  cutMarks(doc, P1X, CY);

  // PAGE 2: blank back — top-right (nothing to print on back of collection card)
  doc.addPage();
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  doc.rect(P2X, CY, CW, CH);
  cutMarks(doc, P2X, CY);

  doc.save("YSApparels_CollectionCard.pdf");
}

// ── STICKER (6 per A4) ────────────────────────────────────────────────────────
function generateStickerPDF(data) {
  const JsPDF = getJsPDF();
  if (!JsPDF) { alert("PDF library not loaded."); return; }
  // Single sticker — exact 80×60mm — placed top-left on A4
  const doc = new JsPDF({ unit:"mm", format:[210,297] });
  const sx=5, sy=5, SW=80, SH=60;

  // Header
  doc.setFillColor(...BLACK); doc.rect(sx,sy,SW,13,"F");
  doc.setFont("helvetica","bold"); doc.setFontSize(11); doc.setTextColor(...WHITE);
  doc.text("YS APPARELS",sx+SW/2,sy+7,{align:"center"});
  doc.setFont("helvetica","normal"); doc.setFontSize(5); doc.setTextColor(...GOLD);
  doc.text("THE 2ND SKIN  ·  LEATHER & LEATHER GARMENTS",sx+SW/2,sy+11.5,{align:"center"});

  const rows=[
    ["DATE",data.date,null,null],
    ["LEATHER",data.leather,null,null],
    ["ARTICLE",data.article,null,null],
    ["COLOUR",data.colour,null,null],
    ["CUSTOMER",data.customer,"L.THICK.",data.leatherThickness],
    ["REMARKS",data.remarks,null,null],
  ];
  let ry=sy+14;
  const rh=(SH-14)/rows.length;

  rows.forEach((row,i)=>{
    doc.setFillColor(i%2===0?248:255,i%2===0?248:255,i%2===0?248:255);
    doc.rect(sx,ry,SW,rh,"F");
    doc.setDrawColor(190); doc.setLineWidth(0.2); doc.rect(sx,ry,SW,rh);
    if(row[2]){
      doc.setDrawColor(170); doc.line(sx+SW/2,ry,sx+SW/2,ry+rh);
      doc.setFont("helvetica","bold"); doc.setFontSize(5.5); doc.setTextColor(80,80,80);
      doc.text(row[0]+":",sx+1.5,ry+rh/2+1);
      doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(0,0,0);
      if(row[1]) doc.text(String(row[1]),sx+19,ry+rh/2+1);
      doc.setFont("helvetica","bold"); doc.setFontSize(5.5); doc.setTextColor(80,80,80);
      doc.text(row[2]+":",sx+SW/2+1.5,ry+rh/2+1);
      doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(0,0,0);
      if(row[3]) doc.text(String(row[3]),sx+SW/2+17,ry+rh/2+1);
    } else {
      doc.setFont("helvetica","bold"); doc.setFontSize(5.5); doc.setTextColor(80,80,80);
      doc.text(row[0]+":",sx+1.5,ry+rh/2+1);
      doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(0,0,0);
      if(row[1]) doc.text(String(row[1]),sx+20,ry+rh/2+1);
    }
    ry+=rh;
  });

  // Cut marks
  doc.setDrawColor(160); doc.setLineWidth(0.25);
  doc.setLineDashPattern([2,2],0);
  doc.line(sx,sy+SH,sx+SW+8,sy+SH);
  doc.line(sx+SW,sy-3,sx+SW,sy+SH+3);
  doc.setLineDashPattern([],0);
  doc.setFont("helvetica","normal"); doc.setFontSize(5.5); doc.setTextColor(180,180,180);
  doc.text("✂ cut",sx+SW+1,sy+2);

  doc.save("YSApparels_MaterialSticker.pdf");
}

// ── FORM COMPONENTS ───────────────────────────────────────────────────────────
const IS={width:"100%",border:"none",borderBottom:"1.5px solid #333",outline:"none",fontSize:13,background:"transparent",padding:"4px 2px",color:"#111",fontFamily:"Arial,sans-serif"};
const LS={display:"block",fontSize:10,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:1,marginBottom:3};
const FB={marginBottom:14};
const R2={display:"flex",gap:16};

function Field({name,label,value,onChange,flex}){
  return(
    <div style={{...FB,...(flex?{flex:{}}:{}),flex}}>
      <label style={LS}>{label}</label>
      <input name={name} value={value||""} onChange={onChange} style={IS}/>
    </div>
  );
}

const measurements=[
  "Chest 1/2 (1cm below Armhole)","Waist Height","Waist 1/2","Bottom 1/2",
  "Centre Back Length","Front Length","Shoulder","Across Shoulder",
  "Front Across","Armhole Straight","Sleeve Length","Bicep 1/2",
  "Elbow","Cuff 1/2 Relaxed","Collar Length From Upper Edge",
  "Front Neck Drop Vertical CF","Hood Height Top Edge","Hood Height Centre",
  "Measurements in CMS","","",""
];

function SampleCardForm({data,onChange}){
  return(
    <div>
      <Field name="style" label="Style" value={data.style} onChange={onChange}/>
      <Field name="leather" label="Leather" value={data.leather} onChange={onChange}/>
      <div style={R2}>
        <Field name="color" label="Color" value={data.color} onChange={onChange} flex={2}/>
        <Field name="size" label="Size" value={data.size} onChange={onChange} flex={1}/>
      </div>
      <Field name="typeOfSample" label="Type of Sample" value={data.typeOfSample} onChange={onChange}/>
      <div style={R2}>
        <Field name="season" label="Season" value={data.season} onChange={onChange} flex={1}/>
        <Field name="brand" label="Brand" value={data.brand} onChange={onChange} flex={1}/>
      </div>
      <div style={R2}>
        <Field name="paddingBody" label="Padding Body" value={data.paddingBody} onChange={onChange} flex={2}/>
        <Field name="paddingGms" label="Gms" value={data.paddingGms} onChange={onChange} flex={1}/>
      </div>
      <div style={R2}>
        <Field name="sleeves" label="Sleeves" value={data.sleeves} onChange={onChange} flex={2}/>
        <Field name="sleevesGms" label="Gms" value={data.sleevesGms} onChange={onChange} flex={1}/>
      </div>
      <Field name="remarks" label="Remarks" value={data.remarks} onChange={onChange}/>
      <div style={{marginTop:20,fontWeight:900,fontSize:13,color:"#1a1a2e",letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Measurements (Back of Card)</div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
        <thead>
          <tr>{["Description","Required","Actual","Deviation"].map(h=>(
            <th key={h} style={{padding:"6px 8px",background:"#1a1a2e",color:"#fff",textAlign:"left",fontSize:10,fontWeight:700}}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {measurements.map((m,i)=>(
            <tr key={i} style={{background:i%2===0?"#fafafa":"#fff"}}>
              <td style={{padding:"3px 6px",fontSize:10,color:"#444",borderBottom:"1px solid #eee"}}>{m}</td>
              {["req","act","dev"].map(t=>(
                <td key={t} style={{padding:"2px 4px",borderBottom:"1px solid #eee"}}>
                  <input name={`m_${t}_${i}`} value={data[`m_${t}_${i}`]||""} onChange={onChange}
                    style={{width:"100%",border:"none",outline:"none",fontSize:11,background:"transparent"}}/>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CollectionForm({data,onChange}){
  return(
    <div>
      <div style={R2}>
        <Field name="style" label="Style" value={data.style} onChange={onChange} flex={1}/>
        <Field name="collection" label="Collection" value={data.collection} onChange={onChange} flex={1}/>
      </div>
      {[["leather","Leather"],["color","Color"],["lining","Lining"],["acc","ACC"],
        ["specialNotes","Special Notes"],["readyToShip","Ready to Ship"],["price","Price"]
      ].map(([k,l])=><Field key={k} name={k} label={l} value={data[k]} onChange={onChange}/>)}
    </div>
  );
}

function StickerForm({data,onChange}){
  return(
    <div>
      <Field name="date" label="Date" value={data.date} onChange={onChange}/>
      <Field name="leather" label="Leather" value={data.leather} onChange={onChange}/>
      <Field name="article" label="Article" value={data.article} onChange={onChange}/>
      <Field name="colour" label="Colour" value={data.colour} onChange={onChange}/>
      <div style={R2}>
        <Field name="customer" label="Customer" value={data.customer} onChange={onChange} flex={1}/>
        <Field name="leatherThickness" label="Leather Thickness" value={data.leatherThickness} onChange={onChange} flex={1}/>
      </div>
      <Field name="remarks" label="Remarks" value={data.remarks} onChange={onChange}/>
    </div>
  );
}

const TABS=[{id:"sample",label:"Sample Card"},{id:"collection",label:"Collection Card"},{id:"sticker",label:"Material Sticker"}];

export default function App(){
  const [tab,setTab]=useState("sample");
  const [sampleData,setSampleData]=useState({});
  const [collData,setCollData]=useState({});
  const [stickerData,setStickerData]=useState({});

  const hS=e=>setSampleData(p=>({...p,[e.target.name]:e.target.value}));
  const hC=e=>setCollData(p=>({...p,[e.target.name]:e.target.value}));
  const hST=e=>setStickerData(p=>({...p,[e.target.name]:e.target.value}));

  const reset=()=>{
    if(tab==="sample") setSampleData({});
    if(tab==="collection") setCollData({});
    if(tab==="sticker") setStickerData({});
  };

  const handlePDF=()=>{
    if(tab==="sample") generateSampleCardPDF(sampleData);
    if(tab==="collection") generateCollectionPDF(collData);
    if(tab==="sticker") generateStickerPDF(stickerData);
  };

  const tipText = tab==="sticker"
    ? "One sticker per PDF — exact 80×60mm, top-left corner of A4. Print → cut on the dashed lines."
    : "Page 1 prints top-LEFT (front). Page 2 prints top-RIGHT (back). Your duplex printer flips the paper — back aligns perfectly behind front. Cut on the dashed lines.";

  return(
    <div style={{minHeight:"100vh",background:"#f4f4f4",fontFamily:"Arial,sans-serif"}}>
      <div style={{background:"#0f0f0f",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:56}}>
        <div>
          <span style={{color:"#fff",fontWeight:900,fontSize:17,letterSpacing:3}}>YS APPARELS</span>
          <span style={{color:"#b49650",fontSize:9,letterSpacing:2,marginLeft:10}}>THE 2ND SKIN</span>
        </div>
        <span style={{color:"#555",fontSize:10,letterSpacing:1}}>DIGITAL FORMS</span>
      </div>

      <div style={{background:"#1a1a1a",display:"flex",paddingLeft:24}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            padding:"11px 20px",border:"none",background:"none",cursor:"pointer",
            fontWeight:700,fontSize:11,letterSpacing:1,textTransform:"uppercase",
            color:tab===t.id?"#b49650":"#666",
            borderBottom:tab===t.id?"2px solid #b49650":"2px solid transparent",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{maxWidth:560,margin:"28px auto",padding:"0 16px"}}>
        <div style={{background:"#fff",borderRadius:6,boxShadow:"0 2px 16px rgba(0,0,0,0.1)",overflow:"hidden"}}>
          <div style={{background:"#0f0f0f",padding:"16px 24px"}}>
            <div style={{color:"#fff",fontWeight:900,fontSize:18,letterSpacing:3}}>YS APPARELS</div>
            <div style={{color:"#b49650",fontSize:9,letterSpacing:2,marginTop:2}}>
              {tab==="sample"?"SAMPLE CARD":tab==="collection"?"COLLECTION CARD":"MATERIAL STICKER"}
            </div>
          </div>

          <div style={{padding:"24px"}}>
            {tab==="sample"&&<SampleCardForm data={sampleData} onChange={hS}/>}
            {tab==="collection"&&<CollectionForm data={collData} onChange={hC}/>}
            {tab==="sticker"&&<StickerForm data={stickerData} onChange={hST}/>}
          </div>

          <div style={{margin:"0 24px 16px",background:"#fff8e8",border:"1px solid #e0c060",borderRadius:5,padding:"10px 14px",fontSize:11,color:"#7a5500",lineHeight:1.8}}>
            <strong>How to print:</strong><br/>{tipText}
          </div>

          <div style={{background:"#f9f9f9",borderTop:"1px solid #eee",padding:"14px 24px",display:"flex",gap:10}}>
            <button onClick={handlePDF} style={{flex:1,padding:"11px 0",background:"#0f0f0f",color:"#fff",border:"none",borderRadius:5,fontWeight:700,fontSize:13,letterSpacing:1,cursor:"pointer"}}>
              ⬇ DOWNLOAD PDF
            </button>
            <button onClick={reset} style={{padding:"11px 20px",background:"#fff",color:"#666",border:"1.5px solid #ddd",borderRadius:5,fontSize:12,cursor:"pointer"}}>
              Reset
            </button>
          </div>

          <div style={{background:"#0f0f0f",padding:"8px 24px",textAlign:"center"}}>
            <div style={{color:"#555",fontSize:9,lineHeight:1.7}}>
              Plot #106, Street #3, Nader Chowk, Rohi Nala, 21-Km Ferozepur Road, Lahore<br/>
              ☎ +92 42 35965348-49 &nbsp;·&nbsp; yasir@ysapparels.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
