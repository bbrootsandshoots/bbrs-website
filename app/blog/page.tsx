import Image from "next/image";
import Navbar from "./../navbar";
import Project from "./../project";

export default function Home() {

  return (
    <div className="page">
      <Navbar/>
      <main className="main">
        <div style={{paddingBottom: "40px"}}>
            <h1>Blog</h1>
            
        </div>
    
      </main>
    </div>
  );
}
