import {useEffect, useState} from "react";
import {Lightning, QrCode, Horse, Heart, Cube, House, Copy, TerminalWindow } from "@phosphor-icons/react";
import "./Sidebar.css"

import QRCode from "react-qr-code";


export function Sidebar() {
    const [favicon, setFavicon] = useState('');

  useEffect(() => {    
    const faviconMode = window.matchMedia('(prefers-color-scheme: light)').matches ? "/colloidal.svg" : "/cyclops.svg";
    setFavicon(faviconMode);
},[]);



  return (
    <>

      <div className="sidebar">
        <div style={{ marginLeft: "22px"}}>
          <div className="sidecar">
            <button className="command_button" id="backBtn">
              <Lightning size={24}/>
              <label> Reset </label>
           </button>
          </div>  
          <div className="sidecar">
            <button className="command_button" id="backBtn">
              <TerminalWindow size={24}/>
              <label> Console </label>
           </button>
          </div>   

          <div className="sidecar">
            <button className="command_button" id="backBtn">
              <QrCode size={24}/>
              <label> Scan QR </label>
           </button>
          </div>  

          <div className="sidecar">
            <button className="command_button" id="backBtn">
              <Horse size={24}/>
              <label> Horse </label>
           </button>
          </div>  
        </div>

          <div style={{ height: "auto", margin: "10px auto", width: "80%" }}>
            <div style={{ background: 'white', padding: '2px' }}>
            <QRCode
              size={1024}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"https://github.com/seanpatrickmoran/lariat-web-prototype"}
              viewBox={`0 0 1024 1024`}
            />
          </div>
        </div>
      </div>
    </>
  )
}







 
