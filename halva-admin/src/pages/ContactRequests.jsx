import React, { useEffect, useState } from 'react';
import { Table, message, Tag } from 'antd';
import axios from '../api/axiosConfig'; // ✅ Путь к твоему axios экземпляру

const ContactRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/contact');
      setRequests(res.data);
    } catch (error) {
      message.error('Ошибка при получении заявок');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Сообщение',
      dataIndex: 'message',
      key: 'message',
      render: (text) => text ? text : <Tag color="gray">Без сообщения</Tag>,
    },
    {
      title: 'Дата отправки',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleString('ru-RU'),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📩 Заявки с формы обратной связи</h2>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={requests}
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
        size="middle"
      />
    </div>
  );
};

export default ContactRequests;
