

import Image from "next/image";
import Navbar from "./../navbar";
import Project from "./../project";
import {AdvancedMarker, Pin, APIProvider, Map, MapCameraChangedEvent, useMap, InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';



export default function Home() {

  return (
    <div className="page">
      <Navbar/>
      <main className="main">
        <div style={{paddingBottom: "40px"}}>
            <h1>Contact Us</h1>
            <p>Any inquiries can be directed to ____@gmail.com! Thank you!</p>
        </div>
        
       


        

      </main>
    </div>
  );
}
