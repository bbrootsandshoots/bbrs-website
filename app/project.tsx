'use client'
import { useState, useCallback} from "react";
import { getProjectDescription, getProjectAll } from "./utils";


export default function Project({name}: {name: string}) {

    let projectName = getProjectAll(name)[0];
    let time = getProjectAll(name)[1];
    let briefDescription = getProjectAll(name)[6];
    let url = getProjectAll(name)[3];
    let images = getProjectAll(name)[4];
    let starterImage = getProjectAll(name)[7];
    print(starterImage);
    let imageDescriptions = getProjectAll(name)[5];

  return (
    <div className = "project">
        <h2>{time}</h2>
        
        <img src={starterImage} alt={projectName} />
        <h2>{projectName}</h2>
        <p>{briefDescription}</p>
        <button>
          <a href={url}>Learn more about this project!</a>
        </button>
    </div>
  );
}