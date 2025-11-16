import React, { useState } from "react";
import "../styles/AgentManagement.css";

function AgentManagement() {
  const [agents, setAgents] = useState([
    {
      id: 1,
      nome: "Agente Silva",
      bi: "004587123LA042",
      nip: "NIP001",
      email: "silva@gtl.gov.ao",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Agente Maria",
      bi: "005777981LA045",
      nip: "NIP002",
      email: "maria@gtl.gov.ao",
      status: "De Férias",
    },
  ]);

  const [formData, setFormData] = useState({
    nome: "",
    bi: "",
    nip: "",
    email: "",
    senha: "",
    status: "Ativo",
  });

  const [filters, setFilters] = useState({
    nome: "",
    nip: "",
    status: "Todos",
  });

  const [editing, setEditing] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      setAgents(
        agents.map((agent) =>
          agent.id === editing ? { ...agent, ...formData } : agent
        )
      );
      setEditing(null);
    } else {
      setAgents([...agents, { id: Date.now(), ...formData }]);
    }

    setFormData({
      nome: "",
      bi: "",
      nip: "",
      email: "",
      senha: "",
      status: "Ativo",
    });
  };

  const handleEdit = (id) => {
    const agent = agents.find((a) => a.id === id);
    setFormData({ ...agent, senha: "" });
    setEditing(id);
  };

  const handleDelete = (id) => {
    if (confirm("Deseja realmente remover este agente?")) {
      setAgents(agents.filter((a) => a.id !== id));
    }
  };

  // 🔍 Aplicar filtros
  const filteredAgents = agents.filter((agent) => {
    const matchesNome = agent.nome
      .toLowerCase()
      .includes(filters.nome.toLowerCase());
    const matchesNip = agent.nip
      .toLowerCase()
      .includes(filters.nip.toLowerCase());
    const matchesStatus =
      filters.status === "Todos" || agent.status === filters.status;
    return matchesNome && matchesNip && matchesStatus;
  });

  return (
    <div className="agent-container">
      <h2>👮 Gestão de Agentes</h2>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="agent-form">
        <input
          type="text"
          name="nome"
          placeholder="Nome do agente"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="bi"
          placeholder="Número do BI"
          value={formData.bi}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nip"
          placeholder="NIP do agente"
          value={formData.nip}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email institucional"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha de acesso"
          value={formData.senha}
          onChange={handleChange}
          required={!editing}
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Ativo">Ativo</option>
          <option value="De Férias">De Férias</option>
          <option value="Inativo">Inativo</option>
        </select>

        <button type="submit" className="submit-btn">
          {editing ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      {/* 🔍 Filtros */}
      <div className="filter-section">
        <input
          type="text"
          name="nome"
          placeholder="Filtrar por nome"
          value={filters.nome}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="nip"
          placeholder="Filtrar por NIP"
          value={filters.nip}
          onChange={handleFilterChange}
        />
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="Todos">Todos os status</option>
          <option value="Ativo">Ativo</option>
          <option value="De Férias">De Férias</option>
          <option value="Inativo">Inativo</option>
        </select>
      </div>

      {/* Tabela */}
      <table className="agent-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>BI</th>
            <th>NIP</th>
            <th>Email</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent) => (
              <tr key={agent.id}>
                <td>{agent.nome}</td>
                <td>{agent.bi}</td>
                <td>{agent.nip}</td>
                <td>{agent.email}</td>
                <td>
                  <span
                    className={`status ${
                      agent.status === "Ativo"
                        ? "ativo"
                        : agent.status === "De Férias"
                        ? "ferias"
                        : "inativo"
                    }`}
                  >
                    {agent.status}
                  </span>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(agent.id)}>
                    ✏️ Editar
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(agent.id)}>
                    🗑️ Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhum agente encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AgentManagement;
