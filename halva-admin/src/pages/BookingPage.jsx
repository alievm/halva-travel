import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Tag } from 'antd';
import axios from '../api/axiosConfig';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchBookings = async () => {
    setLoading(true);
    const res = await axios.get('/bookings');
    setBookings(res.data);
    setLoading(false);
  };

  const fetchTours = async () => {
    const res = await axios.get('/tours');
    setTours(res.data);
  };

  useEffect(() => {
    fetchBookings();
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/bookings/${id}`);
    fetchBookings();
  };

  const handleStatusUpdate = async (values) => {
    await axios.put(`/bookings/${selectedBooking._id}/status`, { status: values.status });
    setStatusModalOpen(false);
    fetchBookings();
  };

  const openStatusModal = (booking) => {
    setSelectedBooking(booking);
    form.setFieldsValue({ status: booking.status });
    setStatusModalOpen(true);
  };

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
    },
    {
      title: 'Тур',
      dataIndex: ['tour', 'title', 'ru'],
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      render: (status) => {
        const color = {
          pending: 'orange',
          contacted: 'blue',
          confirmed: 'green',
        }[status];
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Действия',
      render: (_, record) => (
        <>
          <Button onClick={() => openStatusModal(record)} type="link">Изменить статус</Button>
          <Button onClick={() => handleDelete(record._id)} danger type="link">Удалить</Button>
        </>
      )
    }
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Заявки на туры</h2>
      <Table rowKey="_id" columns={columns} dataSource={bookings} loading={loading} />

      <Modal
        title="Обновить статус"
        open={statusModalOpen}
        onCancel={() => setStatusModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleStatusUpdate} layout="vertical">
          <Form.Item name="status" label="Статус">
            <Select>
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
