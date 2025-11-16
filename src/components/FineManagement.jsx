import React, { useState } from "react";
import "../styles/FineManagement.css";

function FineManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("todos");

  // Exemplo de dados de multas
  const fines = [
    { id: 1, motorista: "João Silva", valor: 15000, motivo: "Excesso de velocidade", status: "Paga", data: "2025-10-15" },
    { id: 2, motorista: "Carlos Mendes", valor: 8000, motivo: "Estacionamento proibido", status: "Pendente", data: "2025-10-10" },
    { id: 3, motorista: "Maria Lopes", valor: 12000, motivo: "Uso do telemóvel", status: "Paga", data: "2025-09-30" },
    { id: 4, motorista: "Ana Pereira", valor: 9000, motivo: "Sem cinto de segurança", status: "Pendente", data: "2025-09-25" },
  ];

  const filteredFines = fines.filter((fine) => {
    const matchesSearch =
      fine.motorista.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.motivo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "todos" || fine.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="fine-management">
      <h2>Gestão de Multas</h2>

      {/* Filtros e busca */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por motorista ou motivo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="todos">Todas</option>
          <option value="Paga">Pagas</option>
          <option value="Pendente">Pendentes</option>
        </select>
      </div>

      {/* Tabela de multas */}
      <table className="fine-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Motorista</th>
            <th>Motivo</th>
            <th>Valor (Kz)</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {filteredFines.length > 0 ? (
            filteredFines.map((fine) => (
              <tr key={fine.id}>
                <td>{fine.id}</td>
                <td>{fine.motorista}</td>
                <td>{fine.motivo}</td>
                <td>{fine.valor.toLocaleString()}</td>
                <td>
                  <span
                    className={
                      fine.status === "Paga"
                        ? "status-paid"
                        : "status-pending"
                    }
                  >
                    {fine.status}
                  </span>
                </td>
                <td>{fine.data}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-results">
                Nenhuma multa encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FineManagement;
