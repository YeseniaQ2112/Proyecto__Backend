import { useState, useEffect, useRef } from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import AgregarTaller from './AgregarTaller';

const ListadoTaller = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tallerAEditar, setTallerAEditar] = useState(null);
  
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Reporte_Talleres',
  });

  const fetchData = () => {
  axios.get('http://localhost:3000/api/taller')
    .then(res => {
      console.log("DATOS:", res.data);
      console.log("PRIMER REGISTRO:", res.data[0]);
      setData(res.data);
    })
    .catch(err => console.error(err));
};

  useEffect(() => { fetchData(); }, []);

  const openEdit = (taller) => {
    setTallerAEditar(taller);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/taller/${id}`);
      message.success('Eliminado correctamente');
      fetchData();
    } catch (error) {
      message.error('No se pudo eliminar');
    }
  };

  const columns = [
    { title: 'Propietario', dataIndex: 'nombre_prop' },
    { title: 'Celular', dataIndex: 'nro_celular' },
    { title: 'Tipo Auto', dataIndex: 'tipo_auto' },
    { title: 'Tipo Trabajo', dataIndex: 'tipo_trabajo' },
    { title: 'Hora Atención', dataIndex: 'hora_atencion' },
    { title: 'Día', dataIndex: 'dia' },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm title="¿Eliminar?" onConfirm={() => handleDelete(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }} className="no-print">
        <Button 
          type="primary" 
          onClick={() => { setTallerAEditar(null); setIsModalVisible(true); }}
        >
          Crear Taller
        </Button>
        <Button 
          type="default" 
          icon={<FilePdfOutlined />} 
          style={{ marginLeft: 10 }} 
          onClick={handlePrint}
        >
          Descargar Reporte PDF
        </Button>
      </div>
      
      <div ref={componentRef} style={{ padding: 20 }}>
        <h2 style={{ textAlign: 'center' }}>Reporte de Talleres</h2>
        <Table 
          dataSource={data} 
          columns={columns} 
          rowKey="id" 
          pagination={false} 
          bordered
        />
      </div>
      
      <AgregarTaller 
        isVisible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        onRefresh={fetchData} 
        tallerAEditar={tallerAEditar}
      />
    </>
  );
};

export default ListadoTaller;