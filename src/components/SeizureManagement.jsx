import React, { useState } from "react";
import "../styles/SeizureManagement.css";

function SeizureManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("todos");

  // Exemplo de dados de apreensões
  const seizures = [
    {
      id: 1,
      item: "Motocicleta",
      motorista: "João Silva",
      motivo: "Documentação irregular",
      status: "Liberado",
      data: "2025-10-15",
    },
    {
      id: 2,
      item: "Automóvel",
      motorista: "Carlos Mendes",
      motivo: "Multas acumuladas",
      status: "Retido",
      data: "2025-10-10",
    },
    {
      id: 3,
      item: "Mercadorias",
      motorista: "Maria Lopes",
      motivo: "Transporte ilegal",
      status: "Retido",
      data: "2025-09-25",
    },
    {
      id: 4,
      item: "Motocicleta",
      motorista: "Ana Pereira",
      motivo: "Condução perigosa",
      status: "Liberado",
      data: "2025-09-20",
    },
  ];

  const filteredSeizures = seizures.filter((s) => {
    const matchesSearch =
      s.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.motorista.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.motivo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "todos" || s.status.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="seizure-management">
      <h2>📦 Apreensões</h2>

      {/* Filtros */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por item, motorista ou motivo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="todos">Todas</option>
          <option value="Retido">Retidos</option>
          <option value="Liberado">Liberados</option>
        </select>
      </div>

      {/* Tabela */}
      <table className="seizure-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Apreendido</th>
            <th>Motorista</th>
            <th>Motivo</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {filteredSeizures.length > 0 ? (
            filteredSeizures.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.item}</td>
                <td>{s.motorista}</td>
                <td>{s.motivo}</td>
                <td>
                  <span
                    className={
                      s.status === "Retido"
                        ? "status-retido"
                        : "status-liberado"
                    }
                  >
                    {s.status}
                  </span>
                </td>
                <td>{s.data}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-results">
                Nenhuma apreensão encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SeizureManagement;
