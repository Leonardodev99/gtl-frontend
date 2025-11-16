import React, { useState } from "react";
import "../styles/PaymentManagement.css";

function PaymentManagement() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");

  // Exemplos de pagamentos (podes trocar depois pela API)
  const payments = [
    {
      id: 1,
      motorista: "Carlos Mendes",
      nip: "NIP002",
      valor: 15000,
      descricao: "Pagamento de multa",
      status: "Pago",
      data: "2025-10-15",
    },
    {
      id: 2,
      motorista: "Ana Pereira",
      nip: "NIP015",
      valor: 5000,
      descricao: "Regularização de documento",
      status: "Pendente",
      data: "2025-10-10",
    },
    {
      id: 3,
      motorista: "João Silva",
      nip: "NIP009",
      valor: 20000,
      descricao: "Taxa de apreensão",
      status: "Pago",
      data: "2025-09-22",
    },
  ];

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.motorista.toLowerCase().includes(search.toLowerCase()) ||
      p.nip.toLowerCase().includes(search.toLowerCase()) ||
      p.descricao.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "todos" ||
      p.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="payment-management">
      <h2>💳 Pagamentos</h2>

      {/* Filtros */}
      <div className="payment-filters">
        <input
          type="text"
          placeholder="Buscar por motorista, NIP ou descrição..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="Pago">Pagos</option>
          <option value="Pendente">Pendentes</option>
        </select>
      </div>

      {/* Tabela */}
      <table className="payment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Motorista</th>
            <th>NIP</th>
            <th>Valor (KZ)</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.motorista}</td>
                <td>{p.nip}</td>
                <td>{p.valor.toLocaleString("pt-AO")}</td>
                <td>{p.descricao}</td>
                <td>
                  <span
                    className={
                      p.status === "Pago" ? "status-pago" : "status-pendente"
                    }
                  >
                    {p.status}
                  </span>
                </td>
                <td>{p.data}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-results">
                Nenhum pagamento encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentManagement;
