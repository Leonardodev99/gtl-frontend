import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";

// Corrige ícones do Leaflet (senão não aparecem os marcadores)
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function Map() {
  return (
    <div className="map-container">
      <MapContainer
        center={[-8.8383, 13.2344]} // centro inicial (Luanda por exemplo)
        zoom={13}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Exemplo de marcadores para Agentes */}
        <Marker position={[-8.8383, 13.2344]}>
          <Popup>Agente 1 - Em patrulha</Popup>
        </Marker>
        <Marker position={[-8.84, 13.25]}>
          <Popup>Agente 2 - Em serviço</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
