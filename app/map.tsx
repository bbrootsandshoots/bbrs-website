'use client'
import { useState, useCallback} from "react";
import {AdvancedMarker, Pin, APIProvider, Map, MapCameraChangedEvent, useMap, InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';


type Poi ={ key: string, location: google.maps.LatLngLiteral, desc: string, image: string};
const locations: Poi[] = [
  {key: 'Hensley Hollow', location: { lat: 41.03302868983575, lng: -73.6744705289138}, desc: "hi", image: "https://placecats.com/200/200"},
  {key: 'Treelandia', location: { lat: 41.0326962506437, lng: -73.67330108832924}, desc: "hello", image: "https://placecats.com/200/200"},
];


export default function MAP({apiKey}: {apiKey: string}) {
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const KEY = apiKey;
  return (
    <div >
      
      <APIProvider apiKey={KEY} onLoad={() => console.log('yes')} onError={(err) => console.error('oh no')}>
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
          <img src={image.toString()} alt="" style={{width: "100%", height: "auto", borderRadius: "8px"}} />
        </InfoWindow>
      )}
    </>
  );
};