import {
    GoogleMap,
    InfoWindow,
    Marker,
    useLoadScript,
  } from "@react-google-maps/api";
  import { useState } from "react";
  import "./Style.css";
  
  const Map = () => {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();
    const markers = [
        { address: "London", lat: 51.5074, lng: -0.1278 }, // London
        { address: "Manchester", lat: 53.4808, lng: -2.2426 }, // Manchester
        { address: "Birmingham", lat: 52.4862, lng: -1.8904 }, // Birmingham
        // Add more markers for other cities or locations in the UK as needed
      ];
  
    const onMapLoad = (map) => {
      setMapRef(map);
      const bounds = new google.maps.LatLngBounds();
      markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
      map.fitBounds(bounds);
    };
  
    const handleMarkerClick = (id, lat, lng, address) => {
      mapRef?.panTo({ lat, lng });
      setInfoWindowData({ id, address });
      setIsOpen(true);
    };
  
    return (
      <div className="App">
        <h1>Location Services by An Ode</h1>
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            onLoad={onMapLoad}
            onClick={() => setIsOpen(false)}
          >
            {markers.map(({ address, lat, lng }, ind) => (
              <Marker
                key={ind}
                position={{ lat, lng }}
                onClick={() => {
                  handleMarkerClick(ind, lat, lng, address);
                }}
              >
                {isOpen && infoWindowData?.id === ind && (
                  <InfoWindow
                    onCloseClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <h3>{infoWindowData.address}</h3>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
        )}
      </div>
    );
  };
  
export default Map;