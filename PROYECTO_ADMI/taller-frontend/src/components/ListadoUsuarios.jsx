import { useState, useEffect } from 'react';
import { Table, message, Button, Popconfirm } from 'antd';
import axios from 'axios';

const ListadoUsuarios = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios.get('http://localhost:3000/api/usuarios')
      .then(res => setData(res.data))
      .catch(() => message.error('Error al cargar usuarios'));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/usuarios/${id}`);
      message.success('Usuario eliminado');
      fetchData();
    } catch (error) {
      message.error('Error al eliminar');
    }
  };

  const columns = [
    { title: 'Nombre', dataIndex: 'nombre' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Rol', dataIndex: 'rol' },
    {
      title: 'Acciones',
      render: (_, record) => (
        <Popconfirm title="¿Eliminar usuario?" onConfirm={() => handleDelete(record.id)}>
          <Button danger>Eliminar</Button>
        </Popconfirm>
      ),
    },
  ];
console.log("Datos recibidos en el componente:", data); // Mira esto en F12 -> Console
  return <Table dataSource={data} columns={columns} rowKey="id" />;
};

export default ListadoUsuarios;