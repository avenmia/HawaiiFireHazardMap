import { Ref, useRef } from 'react'
import logo from './logo.svg'
import './App.css'
import { MapContainer, Marker, Popup, TileLayer, useMap,  GeoJSON as GeoJSONComponent } from 'react-leaflet';
import HawaiiFireData from "./data/Fire_Risk_Areas.json";
import type { GeoJsonObject, Feature, Geometry } from "geojson";


function App() {
  const geoJsonRef = useRef();

  const defaultStyle = {
    fillColor: "#CCCCCC",
    color: "#44475a",
    weight: 1,
    opacity: 0.7,
    fillOpacity: 0.2,
  };
  
  const areaStyle = (
    feature: Feature<Geometry, { pop20: number; name20: string; risk_rating: string }> | undefined
  ) => {
    if (!feature) {
      return {};
    }
    const risk_rating = feature.properties.risk_rating;
    switch(risk_rating)
    {
      case "High": return { fillColor: "#ff5555", color: "#ff5555", weight: 1, opacity: 0.7, fillOpacity: 0.2, };
      case "Medium": return { fillColor: "#ffaa00", color: "#ffaa00", weight: 1, opacity: 0.7, fillOpacity: 0.2, };
      case "Low": return { fillColor: "#55ff55", color: "#55ff55", weight: 1, opacity: 0.7, fillOpacity: 0.2, };
      default: return defaultStyle;
    }
  };


  const handleFeature = (feature: any, layer: any) => {
    console.log(feature.properties.risk_rating);
    layer.bindPopup(feature.properties.name20);
  };

  return (
    <div className="App">
      <h1>Hawaii Fire Awareness Map</h1>
      <MapContainer  center={[21.43805, -157.985262]} zoom={11} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSONComponent
              data={HawaiiFireData as GeoJsonObject}
              style={(
                val:
                  | Feature<Geometry, { pop20: number; name20: string, risk_rating: string }>
                  | undefined
              ) => areaStyle(val)}
              onEachFeature={(feature, layer) => handleFeature(feature, layer)}
              ref={geoJsonRef as Ref<any>}
          />
      </MapContainer>
    </div>
  )
}

export default App
