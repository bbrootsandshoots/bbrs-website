'use client'
import Image from "next/image";
import Navbar from "../../navbar";
import { useState, useCallback} from "react";
import ProjectTemplate from "../../projTemplate";
import { getProjectDescription, getProjectAll } from "../../utils";




export default function Project1() {

    return (
      <div className="page">
      <Navbar/>
      <main className="main">
        <ProjectTemplate name="summerWatering" />

        
        
      </main>
    </div>
    
    
  );
}
