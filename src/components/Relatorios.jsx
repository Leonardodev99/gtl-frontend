import React, { useState } from "react";
import "../styles/Relatorios.css";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";


// Gráficos
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

export default function Relatorios() {
  const [agenteFiltro, setAgenteFiltro] = useState("");

  // Dados estáticos
  const resumoMultas = {
    totalMultas: 1240,
    valorArrecadado: 5400000,
    mediaPorDia: 42,
  };

  const infracoesComuns = [
    { tipo: "Excesso de velocidade", quantidade: 310 },
    { tipo: "Estacionamento proibido", quantidade: 204 },
    { tipo: "Documentos atrasados", quantidade: 167 },
    { tipo: "Condução perigosa", quantidade: 122 },
    { tipo: "Uso de telemóvel ao volante", quantidade: 99 },
  ];

  const desempenhoAgentes = [
    { agente: "Agente Manuel", multas: 210, ocorrencias: 52 },
    { agente: "Agente Joana", multas: 185, ocorrencias: 48 },
    { agente: "Agente Carlos", multas: 166, ocorrencias: 39 },
  ];

  const multasPorDia = [
    { dia: "Seg", total: 35 },
    { dia: "Ter", total: 42 },
    { dia: "Qua", total: 51 },
    { dia: "Qui", total: 39 },
    { dia: "Sex", total: 47 },
    { dia: "Sáb", total: 30 },
    { dia: "Dom", total: 18 },
  ];

  const estatisticasLocais = [
    { local: "Benfica", qtd: 120 },
    { local: "Viana", qtd: 112 },
    { local: "Cazenga", qtd: 97 },
    { local: "Maianga", qtd: 91 },
    { local: "Kilamba", qtd: 88 },
    { local: "Ramiros", qtd: 75 },
    { local: "Samba", qtd: 70 },
    { local: "Mutamba", qtd: 66 },
    { local: "Ingombota", qtd: 58 },
    { local: "Talatona", qtd: 55 },
  ];

  const agentes = ["Agente Manuel", "Agente Joana", "Agente Carlos"];

  const COLORS = ["#0088FE", "#FF8042", "#FFBB28", "#00C49F", "#AA336A"];

  // 🔵 EXPORTAÇÃO EXCEL
  const exportExcel = () => {
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(infracoesComuns),
      "Infrações"
    );
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(desempenhoAgentes),
      "Desempenho"
    );
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(estatisticasLocais),
      "Localizações"
    );

    XLSX.writeFile(wb, "Relatorios_GTL.xlsx");
  };

  // 🔴 EXPORTAÇÃO PDF (versão melhorada com tabelas + gráficos)
const exportPDF = async () => {
  try {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // ------------------- HEADER ----------------------
    doc.setFillColor(30, 64, 175);
    doc.rect(0, 0, pageWidth, 20, "F");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("📊 Relatórios GTL", 10, 13);

    doc.setTextColor(0, 0, 0);

    let y = 30;

    // -----------------------------------------------------
    // TÍTULO
    const tituloSecao = (titulo) => {
      doc.setFontSize(14);
      doc.setTextColor(30, 64, 175);
      doc.text(titulo, 10, y);
      y += 6;
      doc.setDrawColor(30, 64, 175);
      doc.line(10, y, pageWidth - 10, y);
      y += 8;
      doc.setTextColor(0, 0, 0);
    };

    // -----------------------------------------------------
    // TABELA AUTO
    const tabela = (headers, rows) => {
      autoTable(doc, {
        startY: y,
        head: [headers],
        body: rows,
        theme: "striped",
        headStyles: { fillColor: [30, 64, 175], textColor: 255 },
        margin: { left: 10, right: 10 },
        styles: { fontSize: 10 },
      });
      y = doc.lastAutoTable.finalY + 10;
    };

    // ------------------- RESUMO -------------------
    tituloSecao("📌 Resumo de Multas");

    tabela(
      ["Descrição", "Valor"],
      [
        ["Total de Multas", resumoMultas.totalMultas],
        ["Valor Arrecadado", resumoMultas.valorArrecadado.toLocaleString() + " kz"],
        ["Média Diária", resumoMultas.mediaPorDia],
      ]
    );

    // ------------------- INFRAÇÕES -------------------
    tituloSecao("Infrações Mais Comuns");

    tabela(
      ["Tipo", "Quantidade"],
      infracoesComuns.map(i => [i.tipo, i.quantidade])
    );

    // ------------------- GRÁFICO PIZZA -------------------
    const pieElement = document.querySelector(".pie-chart-section");

    if (pieElement) {
      const canvas = await html2canvas(pieElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 30, y, 150, 90);
      y += 100;
    }

    // ------------------- DESEMPENHO -------------------
    tituloSecao("Desempenho dos Agentes");

    tabela(
      ["Agente", "Multas", "Ocorrências"],
      desempenhoAgentes.map(a => [a.agente, a.multas, a.ocorrencias])
    );

    // ------------------- GRÁFICO BARRAS -------------------
    const barElement = document.querySelector(".bar-chart-section");

    if (barElement) {
      const canvas = await html2canvas(barElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 20, y, 170, 90);
      y += 100;
    }

    // ------------------- GRÁFICO LINHA -------------------
    tituloSecao("📈 Evolução Diária das Multas");

    const lineElement = document.querySelector(".line-chart-section");

    if (lineElement) {
      const canvas = await html2canvas(lineElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 20, y, 170, 90);
      y += 100;
    }

    // ------------------- LOCALIZAÇÕES -------------------
    tituloSecao("📍 Estatísticas por Localização");

    tabela(
      ["Local", "Quantidade"],
      estatisticasLocais.map(l => [l.local, l.qtd])
    );

    doc.save("Relatorios_GTL.pdf");

  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    alert("Erro ao exportar PDF. Veja o console.");
  }
};



  return (
    <div className="relatorios-container">
      <h2 className="titulo-pagina">📊 Relatórios Gerais</h2>

      {/* Botões de exportação */}
      <div className="export-buttons">
        <button onClick={exportPDF} className="btn-pdf">📄 Exportar PDF</button>
        <button onClick={exportExcel} className="btn-excel">📘 Exportar Excel</button>
      </div>

      {/* RESUMO DE MULTAS */}
      <section className="card-relatorio">
        <h3>📌 Resumo de Multas</h3>
        <div className="resumo-grid">
          <div className="resumo-item">
            <span>Total de Multas</span>
            <strong>{resumoMultas.totalMultas}</strong>
          </div>
          <div className="resumo-item">
            <span>Valor Arrecadado</span>
            <strong>{resumoMultas.valorArrecadado.toLocaleString()} kz</strong>
          </div>
          <div className="resumo-item">
            <span>Média por Dia</span>
            <strong>{resumoMultas.mediaPorDia}</strong>
          </div>
        </div>
      </section>

      {/* INFRAÇÕES */}
      <section className="card-relatorio">
        <h3>⚠️ Infrações Mais Comuns (Top 5)</h3>

        <div className="grafico-centro pie-chart-section">
            <PieChart width={300} height={250}>
                <Pie
                data={infracoesComuns}
                dataKey="quantidade"
                nameKey="tipo"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
                >
                {infracoesComuns.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
                </Pie>
            </PieChart>
        </div>


        <table>
          <thead>
            <tr>
              <th>Tipo de Infração</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {infracoesComuns.map((i, index) => (
              <tr key={index}>
                <td>{i.tipo}</td>
                <td>{i.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* DESEMPENHO AGENTES */}
      <section className="card-relatorio">
        <h3>👮 Desempenho dos Agentes</h3>

        <div className="filtro-container">
          <label>Filtrar por agente:</label>
          <select
            value={agenteFiltro}
            onChange={(e) => setAgenteFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            {agentes.map((a, index) => (
              <option key={index}>{a}</option>
            ))}
          </select>
        </div>

        <div className="grafico-centro bar-chart-section">
            <BarChart width={400} height={250} data={desempenhoAgentes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="agente" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="multas" fill="#0088FE" />
            </BarChart>
        </div>

      </section>

      {/* GRÁFICO DE LINHA */}
      <section className="card-relatorio">
        <h3>📈 Evolução Diária das Multas</h3>

        <div className="grafico-centro line-chart-section">
            <LineChart width={400} height={250} data={multasPorDia}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#FF8042" strokeWidth={3} />
            </LineChart>
        </div>

      </section>

      {/* LOCALIZAÇÕES */}
      <section className="card-relatorio">
        <h3>📍 Estatísticas por Localização (Top 10)</h3>

        <table>
          <thead>
            <tr>
              <th>Local</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {estatisticasLocais.map((l, index) => (
              <tr key={index}>
                <td>{l.local}</td>
                <td>{l.qtd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
