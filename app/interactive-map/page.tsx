
import "./../globals.css";
import Navbar from "./../navbar";
import MAP from "./../map";


export default function Page() {
  const KEY = process.env.API_KEY || "fs"; 
  return (
    <div className="page">
      <Navbar/>
      <main className="main">
        <div className = "heading">
          <h1>Harkness Map</h1>
          <p>Explore the various points of interest in Harkness Park, a local park in Rye Brook that our club has been working to conserve and protect!</p>
        </div>
        <MAP apiKey={KEY}></MAP>
        
        
      </main>
    </div>
  );
}
