import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Tag, Popconfirm, message } from 'antd';
import axios from '../api/axiosConfig';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/bookings');
      setBookings(res.data);
    } catch (err) {
      message.error('Ошибка при загрузке заявок');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/bookings/${id}`);
      message.success('Заявка удалена');
      fetchBookings();
    } catch (err) {
      message.error('Ошибка при удалении');
    }
  };

  const handleStatusUpdate = async (values) => {
    try {
      await axios.put(`/bookings/${selectedBooking._id}/status`, { status: values.status });
      message.success('Статус обновлен');
      setStatusModalOpen(false);
      fetchBookings();
    } catch (err) {
      message.error('Ошибка при обновлении статуса');
    }
  };

  const openStatusModal = (booking) => {
    setSelectedBooking(booking);
    form.setFieldsValue({ status: booking.status });
    setStatusModalOpen(true);
  };

  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className="p-3">
        <Input
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={confirm}
          className="mb-2 block"
        />
        <div className="flex gap-2">
          <Button type="primary" size="small" onClick={confirm}>
            Найти
          </Button>
          <Button size="small" onClick={clearFilters}>
            Сбросить
          </Button>
        </div>
      </div>
    ),
    filterIcon: (filtered) => (
      <span role="img" aria-label="search" className="text-gray-600">
        <img className='h-5' src="/magnifying-glass-tilted-left_1f50d.png" alt="" />
      </span>
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      ...getColumnSearchProps('name', 'Поиск по имени'),
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone', 'Поиск по телефону'),
    },
    {
      title: 'Тур',
      dataIndex: ['tour', 'title', 'ru'],
      render: (text) => text ? text : <span className="text-gray-400">Не указано</span>,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      filters: [
        { text: 'Ожидает', value: 'pending' },
        { text: 'Связались', value: 'contacted' },
        { text: 'Подтвержден', value: 'confirmed' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        const color = {
          pending: 'orange',
          contacted: 'blue',
          confirmed: 'green',
        }[status] || 'gray';
        const label = {
          pending: 'Ожидает',
          contacted: 'Связались',
          confirmed: 'Подтвержден',
        }[status] || status;
        return <Tag bordered={false} color={color} className="text-[13px] px-2">{label}</Tag>;
      },
    },
    {
      title: 'Действия',
      render: (_, record) => (
        <div className="flex gap-3">
          <Button size="small" type="primary" ghost onClick={() => openStatusModal(record)}>
            Изменить статус
          </Button>
          <Popconfirm
            title="Удалить заявку?"
            onConfirm={() => handleDelete(record._id)}
            okText="Да"
            cancelText="Нет"
          >
            <Button size="small" danger>
              Удалить
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl">
      <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-gray-800">
        <img className='h-8' src="/clipboard_1f4cb.png" alt="" /> Заявки на туры
      </h2>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={bookings}
        loading={loading}
        bordered
        size="middle"
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title="Обновить статус заявки"
        open={statusModalOpen}
        onCancel={() => setStatusModalOpen(false)}
        onOk={() => form.submit()}
        okText="Обновить"
        cancelText="Отмена"
      >
        <Form
          form={form}
          onFinish={handleStatusUpdate}
          layout="vertical"
          initialValues={{ status: 'pending' }}
        >
          <Form.Item
            name="status"
            label="Выберите новый статус"
            rules={[{ required: true, message: 'Пожалуйста, выберите статус' }]}
          >
            <Select placeholder="Статус заявки">
              <Select.Option value="pending">Ожидает</Select.Option>
              <Select.Option value="contacted">Связались</Select.Option>
              <Select.Option value="confirmed">Подтвержден</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BookingPage;
