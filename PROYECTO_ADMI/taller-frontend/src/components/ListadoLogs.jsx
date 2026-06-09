import { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';

const ListadoLogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios.get('http://localhost:3000/api/logs')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        message.error('Error al cargar logs');
        setLoading(false);
      });
  };

  useEffect(() => { fetchData(); }, []);

  const columns = [
    { title: 'Usuario ID', dataIndex: 'usuario_id', key: 'usuario_id' },
    { title: 'Evento', dataIndex: 'evento', key: 'evento' },
    { title: 'IP', dataIndex: 'ip', key: 'ip' },
    { 
      title: 'Navegador', 
      dataIndex: 'browser', 
      key: 'browser',
      ellipsis: true, // Acorta el texto largo
      render: (text) => text || 'N/A'
    },
    { title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
  ];

  return (
    <div style={{ padding: '20px', background: '#fff' }}>
      <h2>Logs de Acceso</h2>
      <Table 
        dataSource={data} 
        columns={columns} 
        rowKey="id" 
        loading={loading} 
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ListadoLogs;