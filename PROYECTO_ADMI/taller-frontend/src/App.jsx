import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { 
  ToolOutlined, 
  UserOutlined, 
  FileTextOutlined, 
  BarChartOutlined 
} from '@ant-design/icons';

import ListadoTaller from './components/ListadoTaller';
import ListadoUsuarios from './components/ListadoUsuarios';
import ListadoLogs from './components/ListadoLogs';
import ReporteGrafico from './components/ReporteGrafico'; // Asegúrate de crear este archivo

const { Sider, Content } = Layout;

const AppContent = () => {
  const navigate = useNavigate();

  const menuItems = [
    { key: '/', label: 'Talleres', icon: <ToolOutlined /> },
    { key: '/usuarios', label: 'Usuarios', icon: <UserOutlined /> },
    { key: '/logs', label: 'Logs', icon: <FileTextOutlined /> },
    { key: '/graficos', label: 'Gráficos', icon: <BarChartOutlined /> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ color: 'white', padding: '16px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
          Mi Taller
        </div>
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['/']} 
          items={menuItems} 
          onClick={({ key }) => navigate(key)} 
        />
      </Sider>
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <Routes>
          <Route path="/" element={<ListadoTaller />} />
          <Route path="/usuarios" element={<ListadoUsuarios />} />
          <Route path="/logs" element={<ListadoLogs />} />
          <Route path="/graficos" element={<ReporteGrafico />} />
        </Routes>
      </Content>
    </Layout>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;