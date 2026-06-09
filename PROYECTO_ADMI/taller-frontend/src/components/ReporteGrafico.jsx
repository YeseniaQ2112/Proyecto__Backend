import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReporteGrafico = () => {
  // Datos de ejemplo (luego los traeremos del backend)
  const data = [
    { name: 'Balatas', cantidad: 4 },
    { name: 'Alineado', cantidad: 2 },
    { name: 'Revision', cantidad: 3 },
  ];

  return (
    <div style={{ width: '100%', height: 400, background: '#fff', padding: '20px' }}>
      <h2>Trabajos por Tipo</h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// ¡ESTA ES LA LÍNEA QUE TE FALTA!
export default ReporteGrafico;