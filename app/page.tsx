'use client'
import { useState, useCallback} from "react";
import Image from "next/image";
import Navbar from "./navbar";
import {AdvancedMarker, Pin, APIProvider, Map, MapCameraChangedEvent, useMap, InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';



export default function Home() {

  return (
    <div className="page">
      <Navbar/>
      <main className="main">
        <div style={{paddingBottom: "40px"}}>
            <h1>BBHS Roots and Shoots</h1>
          </div>
        <div className = "brief-about">
          
          
          <p>Roots and Shoots is a Blind Brook High School club inspired by Jane Goodall's organization of the same name. We support the environment by carrying out various conservation and awareness projects in Harkness Park and throughout Rye Brook! </p>
          <div className = "learn-more-button">
            <button>
            <a href="/about-us">Learn more about us!</a>
          </button>
          </div>
          
        </div>
        
        
        

      </main>
    </div>
  );
}
