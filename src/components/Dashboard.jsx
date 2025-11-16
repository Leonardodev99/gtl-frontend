import React, { useState } from "react";
import "../styles/Dashboard.css";
import logo from "../assets/logo.png";
import Map from "./Map";
import AgentManagement from "./AgentManagement";
import DriverManagement from "./DriverManagement";
import VehicleManagement from "./VehicleManagement";
import IncidentManagement from "./IncidentManagement";
import FineManagement from "./FineManagement";
import SeizureManagement from "./SeizureManagement";
import PaymentManagement from "./PaymentManagement";
import Relatorios from "./Relatorios";

function Dashboard() {
  const [activePage, setActivePage] = useState("home");

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
            <li onClick={() => setActivePage("agentes")}>👮 Gestão de Agentes</li>
            <li onClick={() => setActivePage("condutores")}>🚗 Gestão de Condutores</li>
            <li onClick={() => setActivePage("veiculos")}>🚘 Gestão de Veículos</li>
            <li onClick={() => setActivePage("ocorrencias")}>🚨 Ocorrências</li>
            <li onClick={() => setActivePage("multas")}>💸 Multas</li>
            <li onClick={() => setActivePage("apreensoes")}>📦 Apreensões</li>
            <li onClick={() => setActivePage("pagamentos")}>💳 Pagamentos</li>
            <li onClick={() => setActivePage("relatorios")}>📊 Relatórios</li>
          </ul>
        </nav>
      </aside>

       {/* Conteúdo principal */}
      <main className="main-content">
        {/* Página de gestão de agentes */}
        {activePage === "agentes" && <AgentManagement />}

        {/* Página de gestão de condutores */}
        {activePage === "condutores" && <DriverManagement />}

        {/* Página de gestão de veíulos */}
        {activePage === "veiculos" && <VehicleManagement />}

        {/* Página de visualização de ocorrências */}
        {activePage === "ocorrencias" && <IncidentManagement />}

        {/* Página de visualização de multas */}
        {activePage === "multas" && <FineManagement />}

        {/* Página de visualização de apreensões */}
        {activePage === "apreensoes" && <SeizureManagement />}

        {/* Página de visualização dos pagamentos*/}
        {activePage === "pagamentos" && <PaymentManagement />}

        {/* Página de visualização dos relatórios*/}
        {activePage === "relatorios" && <Relatorios />}


        {/* Página inicial (dashboard padrão) */}
        {activePage === "home" && (
          <>
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
              <Map />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
