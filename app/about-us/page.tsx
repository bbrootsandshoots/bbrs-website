'use client'
import { useState, useCallback} from "react";
import Image from "next/image";
import Navbar from "./../navbar";
import {AdvancedMarker, Pin, APIProvider, Map, MapCameraChangedEvent, useMap, InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';



export default function Home() {

  return (
    <div className="page">
      <Navbar/>
      <main className="main">
        <div style={{paddingBottom: "40px"}}>
            <h1>About Us</h1>
            <img src="https://placecats.com/600/400" alt="" />
        </div>
        
        <div className = "brief-about">
          
          
          <p>BBHS Roots and Shoots is a Blind Brook High School club inspired by Jane Goodall's organization of the same name. We support the environment by carrying out various conservation and awareness projects in Harkness Park and throughout Rye Brook! This website and the garden sign in Harkness were created by BBHS R&S.</p>
          
        </div>
        <div className = "members">
          <h1>Members</h1>
          <div className = "member-list">
            <div className = "member-row">
              <div>
                <img src="https://placecats.com/200/200" alt="" />
                <p>Ana Mattinson</p>
                <p>Co-President</p>
              </div>
              <div>
                <img src="https://placecats.com/200/200" alt="" />
                <p>Michelle Tian</p>
                <p>Co-President</p>
              </div>
              
              </div>
            <div className = "member-row">
              <div>
                <img src="https://placecats.com/200/200" alt="" />
                <p>Emma Ashley</p>
                <p>Secretary</p>
              </div>
              <div>
                <img src="https://placecats.com/200/200" alt="" />
                <p>Ava Benoit</p>
                <p>Treasurer</p>
              </div>
            </div>
            
            
          </div>
        </div>
        
        
        

      </main>
    </div>
  );
}
