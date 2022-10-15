import React, { useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Loader from "../../Components/Loader/Loader";
import { useParams } from "react-router-dom";

const key = process.env.REACT_APP_MAPS_API;

const Map = () => {
  const params = useParams();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
  });

  const center = useMemo(() => ({ lat: +params.lat, lng: +params.lng }), []);

  return isLoaded ? (
    <GoogleMap mapContainerClassName="map" center={center} zoom={10}>
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <Loader />
  );
};

export default Map;
