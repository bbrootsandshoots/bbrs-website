'use client'
import { useState, useCallback} from "react";
import Image from "next/image";


export default function Home() {

  return (
    <div className = "navbar-container">
            <ul className = "navbar">
                <li><a href="/">Home</a></li>
                <li><a href="/about-us">About Us</a></li>
                <li><a href="/projects">Projects</a></li>
                <li><a href="/interactive-map">Map</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/contact-us">Contact Us</a></li>
            </ul>
    </div>
  );
}
