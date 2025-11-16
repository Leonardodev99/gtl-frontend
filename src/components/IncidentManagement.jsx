import React, { useState } from "react";
import "../styles/IncidentManagement.css";

function IncidentManagement() {
  const [filters, setFilters] = useState({
    tipo: "",
    agente: "",
    data: "",
  });

  const [incidents] = useState([
    {
      id: 1,
      tipo: "Acidente de Trânsito",
      local: "Avenida Hoji Ya Henda",
      data: "2025-11-10",
      agente: "Agente João",
      descricao: "Colisão entre dois veículos particulares, sem vítimas.",
    },
    {
      id: 2,
      tipo: "Condução Sem Documentos",
      local: "Rua Comandante Gika",
      data: "2025-11-09",
      agente: "Agente Maria",
      descricao: "Condutor sem livrete e carta de condução.",
    },
    {
      id: 3,
      tipo: "Veículo Abandonado",
      local: "Zango 3",
      data: "2025-11-08",
      agente: "Agente Pedro",
      descricao: "Veículo abandonado próximo ao mercado local.",
    },
  ]);

  const filteredIncidents = incidents.filter(
    (i) =>
      i.tipo.toLowerCase().includes(filters.tipo.toLowerCase()) &&
      i.agente.toLowerCase().includes(filters.agente.toLowerCase()) &&
      i.data.includes(filters.data)
  );

  return (
    <div className="incident-container">
      <h2>🚨 Ocorrências</h2>

      {/* FILTROS */}
      <div className="incident-filters">
        <input
          type="text"
          placeholder="Filtrar por tipo"
          value={filters.tipo}
          onChange={(e) => setFilters({ ...filters, tipo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filtrar por agente"
          value={filters.agente}
          onChange={(e) => setFilters({ ...filters, agente: e.target.value })}
        />
        <input
          type="date"
          value={filters.data}
          onChange={(e) => setFilters({ ...filters, data: e.target.value })}
        />
      </div>

      {/* TABELA */}
      <table className="incident-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Local</th>
            <th>Data</th>
            <th>Agente</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {filteredIncidents.length > 0 ? (
            filteredIncidents.map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.tipo}</td>
                <td>{i.local}</td>
                <td>{i.data}</td>
                <td>{i.agente}</td>
                <td>{i.descricao}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>
                Nenhuma ocorrência encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default IncidentManagement;
