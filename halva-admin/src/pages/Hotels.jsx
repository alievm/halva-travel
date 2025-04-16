import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import axios from '../api/axiosConfig';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingHotel, setEditingHotel] = useState(null);

  const fetchHotels = async () => {
    setLoading(true);
    const res = await axios.get('/hotels');
    setHotels(res.data);
    setLoading(false);
  };

  const fetchRegions = async () => {
    const res = await axios.get('/regions');
    setRegions(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    fetchHotels();
    fetchRegions();
  }, []);

  const showModal = (hotel = null) => {
    setEditingHotel(hotel);
    form.setFieldsValue(
      hotel
        ? { ...hotel.name, region: hotel.region?._id }
        : { ru: '', en: '', uz: '', region: '' }
    );
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/hotels/${id}`);
    fetchHotels();
  };

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    const data = {
      name: {
        ru: values.ru,
        en: values.en,
        uz: values.uz,
      },
      region: values.region,
    };

    if (editingHotel) {
      await axios.put(`/hotels/${editingHotel._id}`, data);
    } else {
      await axios.post('/hotels', data);
    }

    setIsModalVisible(false);
    fetchHotels();
  };

  const columns = [
    {
      title: 'Регион',
      dataIndex: ['region', 'name', 'ru'],
      key: 'region'
    },
    {
      title: 'Название отеля (RU)',
      dataIndex: ['name', 'ru'],
      key: 'ru'
    },
    {
      title: 'Название отеля (EN)',
      dataIndex: ['name', 'en'],
      key: 'en'
    },
    {
      title: 'Название отеля (UZ)',
      dataIndex: ['name', 'uz'],
      key: 'uz'
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => showModal(record)}>Редактировать</Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>Удалить</Button>
        </>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Список отелей</h2>
        <Button type="primary" onClick={() => showModal()}>Добавить отель</Button>
      </div>
      <Table rowKey="_id" dataSource={hotels} columns={columns} loading={loading} />

      <Modal
        title={editingHotel ? 'Редактировать отель' : 'Добавить отель'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="ru" label="Название на русском">
            <Input />
          </Form.Item>
          <Form.Item name="en" label="Название на английском">
            <Input />
          </Form.Item>
          <Form.Item name="uz" label="Название на узбекском">
            <Input />
          </Form.Item>
          <Form.Item name="region" label="Регион">
            <Select>
              {regions.map((region) => (
                <Select.Option key={region._id} value={region._id}>
                  {region?.name?.ru}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Hotels;
