// import { useNavigate } from "react-router";
import {useEffect, useState} from "react";
import { QrCode, Copy, SquareChevronRight } from 'lucide-react';
import "./Head.css"
// import { ipcRenderer } from 'electron';

export function Head() {

    // const navigate = useNavigate();
    // const navToMain = () => navigate('/');
    // const navToQuery = () => navigate('/query');
    // const navToInspect = () => navigate('/inspect');
    // const navToPairs = () => navigate('/pairs');

    // const usesDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // const favicon = document.getElementById('favicon');


    const [favicon, setFavicon] = useState('');


  useEffect(() => {
    
    const faviconMode = window.matchMedia('(prefers-color-scheme: light)').matches ? "/colloidal.svg" : "/cyclops.svg";
    setFavicon(faviconMode);
},[]);

  return (
<>
      <div style={{height: 22}}/>

      <link id="favicon" rel="shortcut icon" type="image/svg+xml" href={favicon} />
			<nav className="row-container">
      <div style={{display: "flex", marginLeft: "22px"}}>
        <div >
          <button className="command_button" id="backBtn">
            <Copy size={18}/>
         </button>
        </div>
        <div >
          <button className="command_button" id="backBtn">
            <QrCode size={18}/>
         </button>
        </div>    
        <div >
          <button className="command_button" id="backBtn">
            <SquareChevronRight size={18}/>
         </button>
        </div>                
      </div>

{/*      <button className="command_button" id="viewToQueryBtn"> QUERY </button>
      <button className="command_button" id="viewToInspectBtn"> INSPECT </button>
      <button className="command_button" id="viewToPairsBtn"> PAIRS </button>*/}
	    </nav>
      <div style={{height: 22}}/>
</>
  )
}







 
