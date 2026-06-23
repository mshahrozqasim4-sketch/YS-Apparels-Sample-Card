import { useState, useRef } from "react";

const initialForm = {
  style: "", collection: "", leather: "", color: "",
  lining: "", acc: "", specialNotes: "", readyToShip: "", price: "",
};

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState(false);
  const printRef = useRef();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleReset = () => { setForm(initialForm); setPreview(false); };

  const handlePrint = () => {
    const win = window.open("", "_blank");
    win.document.write(`<html><head><title>YS Apparels – Sample Card</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"/>
    <style>
      *{margin:0;padding:0;box-sizing:border-box;}
      body{font-family:'Inter',sans-serif;background:#fff;display:flex;justify-content:center;align-items:flex-start;padding:20px;}
      .card{width:85mm;border:2px solid #1a1a2e;font-size:11px;}
      .hdr{background:#1a1a2e;color:#fff;padding:10px 12px;text-align:center;}
      .co{font-size:18px;font-weight:700;letter-spacing:3px;text-transform:uppercase;}
      .sub{font-size:8px;letter-spacing:1.5px;color:#c9a84c;margin-top:2px;}
      .badge{display:inline-block;background:#c9a84c;color:#1a1a2e;font-size:8px;font-weight:700;letter-spacing:2px;padding:3px 10px;margin-top:5px;}
      table{width:100%;border-collapse:collapse;position:relative;}
      td{border:1px solid #ccc;padding:6px 8px;vertical-align:top;}
      .lbl{font-weight:600;background:#f5f5f5;width:30%;color:#1a1a2e;white-space:nowrap;}
      .val{color:#333;min-height:20px;}
      .srow td{background:#eef0f7;font-weight:700;}
      .wm{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:40px;font-weight:900;color:rgba(201,168,76,0.07);letter-spacing:3px;pointer-events:none;white-space:nowrap;}
      .ftr{background:#1a1a2e;color:#999;font-size:7px;text-align:center;padding:5px 8px;line-height:1.6;}
      .ftr span{color:#c9a84c;}
    </style></head><body>
    <div class="card">
      <div class="hdr">
        <div class="co">YS Apparels</div>
        <div class="sub">LEATHER &amp; LEATHER GARMENTS · LAHORE</div>
        <div class="badge">SAMPLE CARD</div>
      </div>
      <div style="position:relative">
        <div class="wm">YS APPARELS</div>
        <table>
          <tr class="srow"><td class="lbl">Style</td><td class="val">${form.style||"&nbsp;"}</td><td class="lbl">Collection</td><td class="val">${form.collection||"&nbsp;"}</td></tr>
          <tr><td class="lbl">Leather</td><td class="val" colspan="3">${form.leather||"&nbsp;"}</td></tr>
          <tr><td class="lbl">Color</td><td class="val" colspan="3">${form.color||"&nbsp;"}</td></tr>
          <tr><td class="lbl">Lining</td><td class="val" colspan="3">${form.lining||"&nbsp;"}</td></tr>
          <tr><td class="lbl">ACC</td><td class="val" colspan="3">${form.acc||"&nbsp;"}</td></tr>
          <tr><td class="lbl">Special Notes</td><td class="val" colspan="3">${form.specialNotes||"&nbsp;"}</td></tr>
          <tr><td class="lbl">Ready to Ship</td><td class="val" colspan="3">${form.readyToShip||"&nbsp;"}</td></tr>
          <tr><td class="lbl">Price</td><td class="val" colspan="3">${form.price||"&nbsp;"}</td></tr>
        </table>
      </div>
      <div class="ftr">Lahore, Pakistan &nbsp;|&nbsp; <span>YS Apparels</span> &nbsp;|&nbsp; Leather &amp; Leather Garments</div>
    </div>
    </body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 600);
  };

  const fields = [
    {label:"Leather",key:"leather"},{label:"Color",key:"color"},{label:"Lining",key:"lining"},
    {label:"ACC",key:"acc"},{label:"Special Notes",key:"specialNotes"},
    {label:"Ready to Ship",key:"readyToShip"},{label:"Price",key:"price"},
  ];

  const L = {display:"block",fontSize:11,fontWeight:600,color:"#1a1a2e",marginBottom:4,textTransform:"uppercase",letterSpacing:0.8};
  const I = {width:"100%",padding:"8px 10px",border:"1.5px solid #ddd",borderRadius:6,fontSize:13,color:"#333",outline:"none",boxSizing:"border-box",fontFamily:"inherit"};

  return (
    <div style={{minHeight:"100vh",background:"#f0f2f8",fontFamily:"'Inter',sans-serif",padding:"24px 16px"}}>
      <div style={{maxWidth:520,margin:"0 auto"}}>
        <div style={{background:"#1a1a2e",color:"#fff",borderRadius:"12px 12px 0 0",padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:22,fontWeight:700,letterSpacing:3,textTransform:"uppercase"}}>YS Apparels</div>
            <div style={{fontSize:10,letterSpacing:2,color:"#c9a84c",marginTop:2}}>Leather & Leather Garments · Lahore</div>
          </div>
          <div style={{background:"#c9a84c",color:"#1a1a2e",fontSize:9,fontWeight:700,letterSpacing:2,padding:"4px 10px",borderRadius:3}}>SAMPLE CARD</div>
        </div>
        <div style={{background:"#fff",padding:"24px",boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
            <div><label style={L}>Style</label><input name="style" value={form.style} onChange={handleChange} placeholder="e.g. Biker Jacket" style={I}/></div>
            <div><label style={L}>Collection</label><input name="collection" value={form.collection} onChange={handleChange} placeholder="e.g. SS 2026" style={I}/></div>
          </div>
          {fields.map(({label,key})=>(
            <div key={key} style={{marginBottom:12}}>
              <label style={L}>{label}</label>
              {key==="specialNotes"
                ? <textarea name={key} value={form[key]} onChange={handleChange} rows={2} placeholder={`Enter ${label.toLowerCase()}...`} style={{...I,resize:"vertical"}}/>
                : <input name={key} value={form[key]} onChange={handleChange} placeholder={`Enter ${label.toLowerCase()}...`} style={I}/>}
            </div>
          ))}
          <div style={{display:"flex",gap:10,marginTop:20}}>
            <button onClick={()=>setPreview(true)} style={{flex:1,padding:"10px 0",background:"#1a1a2e",color:"#fff",border:"none",borderRadius:7,fontSize:13,fontWeight:600,cursor:"pointer"}}>Preview</button>
            <button onClick={handlePrint} style={{flex:1,padding:"10px 0",background:"#c9a84c",color:"#1a1a2e",border:"none",borderRadius:7,fontSize:13,fontWeight:600,cursor:"pointer"}}>🖨️ Print</button>
            <button onClick={handleReset} style={{padding:"10px 16px",background:"transparent",color:"#888",border:"1.5px solid #ddd",borderRadius:7,fontSize:13,cursor:"pointer"}}>Reset</button>
          </div>
        </div>
        {preview && (
          <div style={{background:"#e8eaf0",padding:"20px",borderRadius:"0 0 12px 12px"}}>
            <div style={{fontSize:11,color:"#666",marginBottom:12,textAlign:"center",letterSpacing:1}}>PRINT PREVIEW</div>
            <div ref={printRef} style={{display:"flex",justifyContent:"center"}}>
              <div style={{width:300,border:"2px solid #1a1a2e",fontFamily:"'Inter',sans-serif",fontSize:11}}>
                <div style={{background:"#1a1a2e",color:"#fff",padding:"10px 12px",textAlign:"center"}}>
                  <div style={{fontSize:16,fontWeight:700,letterSpacing:3,textTransform:"uppercase"}}>YS Apparels</div>
                  <div style={{fontSize:8,letterSpacing:1.5,color:"#c9a84c",marginTop:2}}>LEATHER & LEATHER GARMENTS</div>
                  <div style={{display:"inline-block",background:"#c9a84c",color:"#1a1a2e",fontSize:8,fontWeight:700,letterSpacing:2,padding:"2px 8px",marginTop:5}}>SAMPLE CARD</div>
                </div>
                <div style={{position:"relative"}}>
                  <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%) rotate(-30deg)",fontSize:36,fontWeight:900,color:"rgba(201,168,76,0.07)",letterSpacing:3,whiteSpace:"nowrap",pointerEvents:"none"}}>YS APPARELS</div>
                  <table style={{width:"100%",borderCollapse:"collapse"}}>
                    <tbody>
                      <tr style={{background:"#eef0f7"}}>
                        <td style={{border:"1px solid #ddd",padding:"5px 7px",fontWeight:700,background:"#eef0f7",fontSize:10,width:"22%"}}>Style</td>
                        <td style={{border:"1px solid #ddd",padding:"5px 7px",fontSize:10}}>{form.style||" "}</td>
                        <td style={{border:"1px solid #ddd",padding:"5px 7px",fontWeight:700,background:"#eef0f7",fontSize:10,width:"22%"}}>Collection</td>
                        <td style={{border:"1px solid #ddd",padding:"5px 7px",fontSize:10}}>{form.collection||" "}</td>
                      </tr>
                      {fields.map(({label,key})=>(
                        <tr key={key}>
                          <td style={{border:"1px solid #ddd",padding:"5px 7px",fontWeight:600,background:"#f7f7f9",color:"#1a1a2e",fontSize:10,whiteSpace:"nowrap"}}>{label}</td>
                          <td style={{border:"1px solid #ddd",padding:"5px 7px",color:"#333",fontSize:10}} colSpan={3}>{form[key]||" "}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{background:"#1a1a2e",color:"#999",fontSize:7,textAlign:"center",padding:"5px 8px",lineHeight:1.6}}>
                  Lahore, Pakistan &nbsp;|&nbsp; <span style={{color:"#c9a84c"}}>YS Apparels</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
