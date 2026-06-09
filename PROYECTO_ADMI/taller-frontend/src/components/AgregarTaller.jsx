import { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AgregarTaller = ({ isVisible, onClose, onRefresh, tallerAEditar }) => {
  const [form] = Form.useForm();

  const horas = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // 1. Limpiar campos al abrir/cerrar
  useEffect(() => {
    if (isVisible) {
      if (tallerAEditar) {
        form.setFieldsValue(tallerAEditar);
      } else {
        form.resetFields();
      }
    }
  }, [isVisible, tallerAEditar, form]);

  const handleOk = async (values) => {
    try {
      if (tallerAEditar) {
        await axios.put(`http://localhost:3000/api/taller/${tallerAEditar.id}`, values);
        message.success('Taller actualizado correctamente');
      } else {
        await axios.post('http://localhost:3000/api/taller', values);
        message.success('Taller agregado correctamente');
      }
      onRefresh(); // Actualiza la lista antes de cerrar
      onClose();
    } catch (error) {
      console.error(error);
      message.error('Error al guardar los datos');
    }
  };

  return (
    <Modal
  title={tallerAEditar ? "Editar Taller" : "Agregar Taller"}
  open={isVisible}
  onCancel={onClose}
  footer={null}
  destroyOnHidden={true}
>
      <Form 
        form={form} // 3. Vinculación explícita
        layout="vertical" 
        onFinish={handleOk}
      >
        <Form.Item name="nombre_prop" label="Nombre del Propietario" rules={[{ required: true, message: 'Campo obligatorio' }]}>
          <Input />
        </Form.Item>
        {/* ... resto de tus campos */}
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>Cancelar</Button>
          <Button type="primary" htmlType="submit">Confirmar</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AgregarTaller;