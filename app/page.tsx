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
            <h1>Harkness Park</h1>
          </div>
        <div className = "brief-about">
          
          <p>Harkness Park, located next to Blind Brook High School, is a 4-acre stretch of wildlife owned by the Village of Rye Brook which the BBHS Roots and Shoots Club aims to conserve.</p>

          <div className = "learn-more-button">
          <button>
            <a href="/projects">Learn more about what's happening in Harkness!</a>
          </button>
          </div>
          
        </div>

        
        

      </main>
    </div>
  );
}
