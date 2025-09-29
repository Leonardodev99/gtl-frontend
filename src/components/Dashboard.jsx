import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import logo from "../assets/logo.png";
import "../styles/Dashboard.css";
import Map from "./Map";

function Dashboard() {
  
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo GTL" className="sidebar-logo" />
          <h2>Central GTL</h2>
        </div>
        <nav>
          <ul>
            <li>👮 Gestão de Agentes</li>
            <li>🚗 Gestão de Condutores</li>
            <li>🚘 Gestão de Veículos</li>
            <li>🚨 Ocorrências</li>
            <li>💸 Multas</li>
            <li>📦 Apreensões</li>
            <li>💳 Pagamentos</li>
            <li>📊 Relatórios</li>
          </ul>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="main-content">
        {/* Cards resumo */}
        <div className="cards">
          <div className="card">
            <h3>Agentes</h3>
            <p>35 ativos</p>
          </div>
          <div className="card">
            <h3>Condutores</h3>
            <p>210 registrados</p>
          </div>
          <div className="card">
            <h3>Veículos</h3>
            <p>120 cadastrados</p>
          </div>
        </div>

       <div className="map-section">
           <h2>Mapa de Agentes em Serviço</h2>
        </div>
         <Map />
      </main>
    </div>
  );
}

export default Dashboard;
