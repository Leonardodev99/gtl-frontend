import React, { useState } from "react";
import "../styles/DriverManagement.css";

function DriverManagement() {
  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    bi: "",
    numeroCarta: "",
    validadeCarta: "",
    arquivoBi: null,
    arquivoCarta: null,
    foto: null,
  });

  const [editing, setEditing] = useState(null);
  const [filters, setFilters] = useState({ nome: "", bi: "" });
  const [preview, setPreview] = useState(null); // <-- Para visualizar arquivos

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDriver = {
      id: editing || Date.now(),
      ...formData,
      arquivos: {
        bi: formData.arquivoBi
          ? URL.createObjectURL(formData.arquivoBi)
          : null,
        carta: formData.arquivoCarta
          ? URL.createObjectURL(formData.arquivoCarta)
          : null,
        foto: formData.foto ? URL.createObjectURL(formData.foto) : null,
      },
    };

    if (editing) {
      setDrivers(drivers.map((d) => (d.id === editing ? newDriver : d)));
      setEditing(null);
    } else {
      setDrivers([...drivers, newDriver]);
    }

    setFormData({
      nome: "",
      telefone: "",
      email: "",
      bi: "",
      numeroCarta: "",
      validadeCarta: "",
      arquivoBi: null,
      arquivoCarta: null,
      foto: null,
    });
  };

  const handleEdit = (id) => {
    const driver = drivers.find((d) => d.id === id);
    setFormData(driver);
    setEditing(id);
  };

  const handleDelete = (id) => {
    if (confirm("Deseja realmente remover este condutor?")) {
      setDrivers(drivers.filter((d) => d.id !== id));
    }
  };

  const handleView = (fileUrl) => {
    setPreview(fileUrl);
  };

  const filteredDrivers = drivers.filter(
    (d) =>
      d.nome.toLowerCase().includes(filters.nome.toLowerCase()) &&
      d.bi.toLowerCase().includes(filters.bi.toLowerCase())
  );

  return (
    <div className="driver-container">
      <h2>🚘 Gestão de Condutores</h2>

      {/* FILTROS */}
      <div className="driver-filters">
        <input
          type="text"
          name="nome"
          placeholder="Filtrar por nome"
          value={filters.nome}
          onChange={(e) =>
            setFilters({ ...filters, nome: e.target.value })
          }
        />
        <input
          type="text"
          name="bi"
          placeholder="Filtrar por BI"
          value={filters.bi}
          onChange={(e) =>
            setFilters({ ...filters, bi: e.target.value })
          }
        />
      </div>

      {/* FORMULÁRIO */}
      <form className="driver-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
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
        </div>

        <div className="form-row">
          <input
            type="text"
            name="numeroCarta"
            placeholder="Número da carta"
            value={formData.numeroCarta}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="validadeCarta"
            placeholder="Validade da carta"
            value={formData.validadeCarta}
            onChange={handleChange}
            required
          />
        </div>

        <div className="upload-row">
          <label>
            🪪 BI:
            <input
              type="file"
              name="arquivoBi"
              accept=".pdf,.jpg,.png"
              onChange={handleChange}
            />
          </label>
          <label>
            📄 Carta:
            <input
              type="file"
              name="arquivoCarta"
              accept=".pdf,.jpg,.png"
              onChange={handleChange}
            />
          </label>
          <label>
            📷 Foto:
            <input
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit" className="submit-btn">
          {editing ? "Atualizar Condutor" : "Cadastrar Condutor"}
        </button>
      </form>

      {/* LISTA */}
      <table className="driver-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>BI</th>
            <th>Carta</th>
            <th>Validade</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Arquivos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.length ? (
            filteredDrivers.map((d) => (
              <tr key={d.id}>
                <td>{d.nome}</td>
                <td>{d.bi}</td>
                <td>{d.numeroCarta}</td>
                <td>{d.validadeCarta}</td>
                <td>{d.telefone}</td>
                <td>{d.email}</td>
                <td>
                  {d.arquivos?.bi && (
                    <button
                      className="view-btn"
                      onClick={() => handleView(d.arquivos.bi)}
                    >
                      🪪 Ver BI
                    </button>
                  )}
                  {d.arquivos?.carta && (
                    <button
                      className="view-btn"
                      onClick={() => handleView(d.arquivos.carta)}
                    >
                      📄 Ver Carta
                    </button>
                  )}
                  {d.arquivos?.foto && (
                    <button
                      className="view-btn"
                      onClick={() => handleView(d.arquivos.foto)}
                    >
                      📷 Ver Foto
                    </button>
                  )}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(d.id)}>
                    ✏️
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(d.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Nenhum condutor encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* VISUALIZADOR DE DOCUMENTOS */}
      {preview && (
        <div className="preview-modal" onClick={() => setPreview(null)}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            {preview.endsWith(".pdf") ? (
              <iframe src={preview} title="Documento" className="preview-file" />
            ) : (
              <img src={preview} alt="Visualização" className="preview-img" />
            )}
            <button className="close-btn" onClick={() => setPreview(null)}>
              ✖ Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DriverManagement;
