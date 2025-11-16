import React, { useState } from "react";
import "../styles/VehicleManagement.css";

function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    matricula: "",
    num_livrete: "",
    marca: "",
    modelo: "",
    cor: "",
    id_condutor: "",
    livrete: null,
  });

  const [editing, setEditing] = useState(null);
  const [filters, setFilters] = useState({ matricula: "", marca: "" });
  const [previewFile, setPreviewFile] = useState(null);

  // Atualiza formulário
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Cadastra ou atualiza
  const handleSubmit = (e) => {
    e.preventDefault();
    const newVehicle = {
      id: editing || Date.now(),
      ...formData,
    };

    if (editing) {
      setVehicles(vehicles.map((v) => (v.id === editing ? newVehicle : v)));
      setEditing(null);
    } else {
      setVehicles([...vehicles, newVehicle]);
    }

    // Limpa o formulário
    setFormData({
      matricula: "",
      num_livrete: "",
      marca: "",
      modelo: "",
      cor: "",
      id_condutor: "",
      livrete: null,
    });
  };

  const handleEdit = (id) => {
    const vehicle = vehicles.find((v) => v.id === id);
    setFormData(vehicle);
    setEditing(id);
  };

  const handleDelete = (id) => {
    if (confirm("Deseja realmente remover este veículo?")) {
      setVehicles(vehicles.filter((v) => v.id !== id));
    }
  };

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.marca.toLowerCase().includes(filters.marca.toLowerCase()) &&
      v.matricula.toLowerCase().includes(filters.matricula.toLowerCase())
  );

  // Visualiza arquivo do livrete
  const handleViewFile = (file) => {
    if (!file) return;
    const fileURL = URL.createObjectURL(file);
    setPreviewFile({ name: file.name, type: file.type, url: fileURL });
  };

  const closePreview = () => {
    if (previewFile?.url) URL.revokeObjectURL(previewFile.url);
    setPreviewFile(null);
  };

  return (
    <div className="vehicle-container">
      <h2>🚘 Gestão de Veículos</h2>

      {/* FILTROS */}
      <div className="vehicle-filters">
        <input
          type="text"
          name="marca"
          placeholder="Filtrar por marca"
          value={filters.marca}
          onChange={(e) => setFilters({ ...filters, marca: e.target.value })}
        />
        <input
          type="text"
          name="matricula"
          placeholder="Filtrar por matrícula"
          value={filters.matricula}
          onChange={(e) => setFilters({ ...filters, matricula: e.target.value })}
        />
      </div>

      {/* FORMULÁRIO */}
      <form className="vehicle-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={formData.matricula}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="num_livrete"
            placeholder="Número do Livrete"
            value={formData.num_livrete}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={formData.marca}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cor"
            placeholder="Cor"
            value={formData.cor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="number"
            name="id_condutor"
            placeholder="ID do Condutor"
            value={formData.id_condutor}
            onChange={handleChange}
            required
          />
          <label className="upload-label">
            📄 Upload do Livrete:
            <input
              type="file"
              name="livrete"
              accept=".pdf,.jpg,.png"
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit" className="submit-btn">
          {editing ? "Atualizar Veículo" : "Cadastrar Veículo"}
        </button>
      </form>

      {/* LISTA DE VEÍCULOS */}
      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Livrete Nº</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Cor</th>
            <th>ID Condutor</th>
            <th>Documento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.length ? (
            filteredVehicles.map((v) => (
              <tr key={v.id}>
                <td>{v.matricula}</td>
                <td>{v.num_livrete}</td>
                <td>{v.marca}</td>
                <td>{v.modelo}</td>
                <td>{v.cor}</td>
                <td>{v.id_condutor}</td>
                <td>
                  {v.livrete && (
                    <button
                      className="view-btn"
                      onClick={() => handleViewFile(v.livrete)}
                    >
                      📄 Ver Livrete
                    </button>
                  )}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(v.id)}>
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(v.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Nenhum veículo encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL DE VISUALIZAÇÃO */}
      {previewFile && (
        <div className="modal-overlay" onClick={closePreview}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Visualizando: {previewFile.name}</h3>
            {previewFile.type.includes("pdf") ? (
              <iframe
                src={previewFile.url}
                title={previewFile.name}
                width="100%"
                height="500px"
              ></iframe>
            ) : (
              <img
                src={previewFile.url}
                alt={previewFile.name}
                className="preview-image"
              />
            )}
            <button className="close-btn" onClick={closePreview}>
              ❌ Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleManagement;
