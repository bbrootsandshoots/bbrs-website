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
            <h1>Projects</h1>
            <p>Check out what we've been up to!</p>
        </div>
        

        
        <Project name = "twoHundredPlants"/>
        <Project name = "summerWatering"/>
          
      </main>
    </div>
    
    
  );
}
