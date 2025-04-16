import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Modal } from 'antd';
const { confirm } = Modal;
import 'antd/dist/reset.css';
import './index.css';

import Regions from './pages/Regions';
import Hotels from './pages/Hotels';
import Tours from './pages/Tours';
import CreateNews from './pages/CreateNews';
import Login from './pages/Login';
import PrivateRoute from './guard/PrivateRoute';
import axios from './api/axiosConfig';
import BookingPage from './pages/BookingPage';

const { Header, Content, Sider } = Layout;

const AppLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    await axios.post('/auth/logout', {}, { withCredentials: true });
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={280}  breakpoint="lg" collapsedWidth="0">
        <img src='/logo.svg' className='h-[80px] mx-auto mt-4' alt="Logo" />
        <div className="text-white text-center py-4 text-xl font-bold">Halva Travel</div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">Регионы</Link>
          </Menu.Item>
          <Menu.Item key="/hotels">
            <Link to="/hotels">Отели</Link>
          </Menu.Item>
          <Menu.Item key="/tours">
            <Link to="/tours">Туры</Link>
          </Menu.Item>
          <Menu.Item key="/bookings">
            <Link to="/bookings">Бронирования</Link>
          </Menu.Item>
          <Menu.Item key="/news">
            <Link to="/news">Новости</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Button type="primary" onClick={handleLogout} className="text-left w-full p-0 text-white">Выйти</Button>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="text-white shadow-md px-4">
          <h1 className='text-white'>Панель администратора</h1>
        </Header>
        <Content className="m-4 bg-white p-6 rounded shadow">{children}</Content>
      </Layout>
    </Layout>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return isLoginPage ? (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  ) : (
    <AppLayout>
      <Routes>
        <Route path="/" element={<PrivateRoute><Regions /></PrivateRoute>} />
        <Route path="/hotels" element={<PrivateRoute><Hotels /></PrivateRoute>} />
        <Route path="/tours" element={<PrivateRoute><Tours /></PrivateRoute>} />
        <Route path="/news" element={<PrivateRoute><CreateNews /></PrivateRoute>} />
        <Route path="/bookings" element={<PrivateRoute><BookingPage /></PrivateRoute>} />
      </Routes>
    </AppLayout>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
