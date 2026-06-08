'use client'
import Image from "next/image";
import { useState, useCallback} from "react";
import { getProjectAll } from "./utils";







export default function Project({name}: {name: string}) {


    let description = getProjectAll(name)[2];
    let projectName = getProjectAll(name)[0];
    let time = getProjectAll(name)[1];
    let url = getProjectAll(name)[3];
    let starterImage = getProjectAll(name)[7];
    let images = getProjectAll(name)[4];
    let imageDescriptions = getProjectAll(name)[5];
    const [index, setIndex] = useState(1);

    function handleForwardClick() {
        if (index < images.length) {
            setIndex(index + 1);
        } else {
            setIndex(1);
        }
    }
    function handleBackwardClick() {
        if (index > 1) {
            setIndex(index - 1);
        } else {
            setIndex(images.length);
        }
    }

    return (
      <div style={{justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px"}}>
        <div style={{paddingBottom: "40px", maxWidth: "550px"}}>
            <h1>{projectName}</h1>
            <h3><i>{time}</i></h3>
            <img src={starterImage} style={{maxWidth: "90%"}}alt="" />
            <p>{description}</p>
        </div>
        <div className = "image-carousel">
            <button onClick={handleBackwardClick}>&lt;</button>
            <div>
                <img src={images[index - 1]} alt="" style={{maxWidth: "60%"}}/>
                <p>{imageDescriptions[index - 1]}</p>
            </div>
            
            <button onClick={handleForwardClick}>&gt;</button>
        </div>

        
        
      </div>
    
    
  );
}
