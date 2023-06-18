// File: /src/components/GMap.js
import React, { useMemo } from 'react';
import { gcp_api_key } from '../api_keys';
import './GMap.css'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

export default function GMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: gcp_api_key,
  });

  if(!isLoaded) return <div>Loading...</div>;
  return <Map />
} // <--- GMap() function ends here

function Map() {
  const center = useMemo(() => ({ lat: 14.5994, lng: 28.6731 }), []);

  return (
    <GoogleMap zoom={5} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  )
} // <--- Map() function ends here