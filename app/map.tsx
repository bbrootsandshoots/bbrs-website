'use client'
import { useState, useCallback} from "react";
import {AdvancedMarker, Pin, APIProvider, Map, MapCameraChangedEvent, useMap, InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';


type Poi ={ key: string, location: google.maps.LatLngLiteral, desc: string, image: string};
const locations: Poi[] = [
  {key: 'Paupaus Tree', location: { lat: 41.032698, lng: -73.674191}, desc: "We have two paupau trees that bear a mango-like fruit!", image: "./../paupaus.JPG"},
  {key: 'Area B', location: { lat: 41.032832, lng: -73.674080}, desc: "This area used to be ridden with tree of heaven, an invasive plant that reproduces quicker than normal, but Roots and Shoots and Environmental Science class has since gotten rid of the tree of heaven and, over the summer, planted and watered new native plants like the winged sumac in the mesh.", image: "./../AreaB.JPG"},
  {key: 'Area C', location: { lat: 41.032994, lng: -73.674079}, desc: "There used to be tons of garlic mustard, an invasive plant that alters the soil chemistry, leading to fewer fungi and more harmful microorganisms. The garlic mustard has been weeded out over the summer and replaced with the numerous native plants growing in the mesh, including the hazelbert tree, serviceberry, ginkgo, bear oak, chokecherry, and sandcherry.", image: "./../AreaC.JPG"},
  {key: 'Sycamore Tree', location: { lat: 41.032564, lng: -73.673937}, desc: "The Sycamore has thin bark that allows it to photosynthesize through its trunk.", image: "./../sycamore.JPG"},
  {key: 'Tulip Tree', location: { lat: 41.032656, lng: -73.674223}, desc: "The Tulip Tree has characteristic four-pronged leaves!", image: "./../tulipTree.JPG"},
  {key: 'Swamp Tupelo Tree', location: { lat: 41.032652, lng: -73.674206}, desc: "The Swamp Tupelo was part of a 2021 Arbors Day installation, and can be recognized for its striking trunk.", image: "./../swampTupelo.JPG"},
  {key: 'Solar Digester', location: { lat: 41.032518, lng: -73.674157}, desc: "The solar digester takes unwanted food and liquifies it, allowing the nutrients to seep into the ground!", image: "./../solarDigester.JPG"},
  {key: 'Swamp White Oak', location: { lat: 41.032644, lng: -73.674163}, desc: "The Swamp White Oak was the second tree planted on 2021 Arbors Day, with distinctively furry leaves!", image: "./../swampWhiteOak.JPG"}

];


export default function MAP({apiKey}: {apiKey: string}) {
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const KEY = apiKey;
  return (
    <div >
      
      <APIProvider apiKey={KEY} onLoad={() => console.log({KEY})} onError={(err) => console.error('oh no')}>
                  <Map
            defaultZoom={18}
            className="front-map"
            mapTypeId={'satellite'}
            mapId="ef4a82fe56ac3f3eda7d4da7"
            defaultCenter={ { lat: 41.032959193406924, lng: -73.67338251434386 } }
            onCameraChanged={ (ev: MapCameraChangedEvent) =>
              console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }>
              <PoiMarkers pois={locations} />
      
            {userLocation && (
              <AdvancedMarker position={userLocation}>
                <Pin background={'#4285F4'} glyphColor={'#fff'} borderColor={'#fff'} />
              </AdvancedMarker>
            )}
      
            {
              <GeolocationButton onLocate={setUserLocation} onError={setLocationError}/>
            }
      
      
            </Map>
               
                
        </APIProvider>

        {locationError && (
          <p style={{ color: 'red', marginTop: '8px' }}>{locationError}</p>
        )}
        
        
        

      
    </div>
  );
}


type GeolocationButtonProps = {
  onLocate: (loc: google.maps.LatLngLiteral) => void;
  onError: (msg: string) => void;
};

const GeolocationButton = ({ onLocate, onError }: GeolocationButtonProps) => {
  const map = useMap();
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(() => {
    if (!navigator.geolocation) {
      onError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        onLocate(pos);
        map?.panTo(pos);          // smoothly pan to user
        map?.setZoom(18);         // zoom in
        setLoading(false);
      },
      (error) => {
        const messages: Record<number, string> = {
          1: "Location access denied. Please allow location in your browser.",
          2: "Location unavailable. Try again.",
          3: "Location request timed out.",
        };
        onError(messages[error.code] ?? "An unknown error occurred.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [map, onLocate, onError]);

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        background: "#fff",
        border: "3px solid #9CB380",
        color: "black",
        width: "300px",
        height: "60px",
        
        borderRadius: "10px",
        cursor: loading ? "wait" : "pointer",
        fontSize: "18px",
      }}
      title="Find my location"
    >
      {"Find My Location"}
    </button>
  );
};

const PoiMarkers = (props: {pois: Poi[]}) => {
  return (
    <>
      {props.pois.map( (poi: Poi) => (
        <MarkerWithInfoWindow position={poi.location} key={poi.key}title = {poi.key} desc = {poi.desc} image = {poi.image}>

        </MarkerWithInfoWindow>
        
        // <AdvancedMarker
        //   key={poi.key}
        //   position={poi.location}>
        // <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'}/>
        // </AdvancedMarker>
      ))}
    </>
  );
};



//hi
type MarkerWithInfoWindowProps = {
  position: google.maps.LatLngLiteral;
  title: String;
  image: String;
  desc: String;
};

const MarkerWithInfoWindow = ({position, title, desc, image}: MarkerWithInfoWindowProps) => {
  // `markerRef` and `marker` are needed to establish the connection between
  // the marker and infowindow (if you're using the Marker component, you
  // can use the `useMarkerRef` hook instead).
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [infoWindowShown, setInfoWindowShown] = useState(false);

  // clicking the marker will toggle the infowindow
  const handleMarkerClick = useCallback(
    () => setInfoWindowShown(isShown => !isShown),
    []
  );

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onClick={handleMarkerClick}
      />

      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <h3 style={{color: "black", fontSize: "18px", fontFamily: "Trocchi"}}>{title}</h3>
          <p style={{color: "black", fontSize: "16px", fontFamily: "Trocchi"}}>{desc}</p>
          <img src={image.toString()} alt="" style={{maxWidth: "300px", height: "auto", borderRadius: "8px"}} />
        </InfoWindow>
      )}
    </>
  );
};