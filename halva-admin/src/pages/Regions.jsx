import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import axios from '../api/axiosConfig';

const Regions = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRegion, setEditingRegion] = useState(null);

  const fetchRegions = async () => {
    setLoading(true);
    const res = await axios.get('/regions');
    setRegions(Array.isArray(res.data) ? res.data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const showModal = (region = null) => {
    setEditingRegion(region);
    if (region) {
      form.setFieldsValue({
        ...region.name,
        desc_ru: region.description?.ru,
        desc_en: region.description?.en,
        desc_uz: region.description?.uz
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/regions/${id}`);
    fetchRegions();
  };

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    const payload = {
      name: {
        ru: values.ru,
        en: values.en,
        uz: values.uz,
      },
      description: {
        ru: values.desc_ru,
        en: values.desc_en,
        uz: values.desc_uz,
      }
    };

    if (editingRegion) {
      await axios.put(`/regions/${editingRegion._id}`, payload);
    } else {
      await axios.post('/regions', payload);
    }

    setIsModalVisible(false);
    fetchRegions();
  };

  const columns = [
    {
      title: 'Название (RU)',
      dataIndex: ['name', 'ru'],
      key: 'ru',
    },
    {
      title: 'Название (EN)',
      dataIndex: ['name', 'en'],
      key: 'en',
    },
    {
      title: 'Название (UZ)',
      dataIndex: ['name', 'uz'],
      key: 'uz',
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
        <h2 className="text-lg font-semibold">Список регионов</h2>
        <Button type="primary" onClick={() => showModal()}>Добавить регион</Button>
      </div>

      <Table rowKey="_id" dataSource={regions} columns={columns} loading={loading} />

      <Modal
        title={editingRegion ? 'Редактировать регион' : 'Добавить регион'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form layout="vertical" form={form} className="space-y-4">
          <div className="bg-gray-100 rounded-md p-3">
            <p className="font-semibold">Название региона</p>
            <Form.Item name="ru" label="На русском"><Input /></Form.Item>
            <Form.Item name="en" label="На английском"><Input /></Form.Item>
            <Form.Item name="uz" label="На узбекском"><Input /></Form.Item>
          </div>

          <div className="bg-gray-100 rounded-md p-3 mt-4">
            <p className="font-semibold">Описание региона</p>
            <Form.Item name="desc_ru" label="Описание на русском"><Input.TextArea rows={2} /></Form.Item>
            <Form.Item name="desc_en" label="Описание на английском"><Input.TextArea rows={2} /></Form.Item>
            <Form.Item name="desc_uz" label="Описание на узбекском"><Input.TextArea rows={2} /></Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Regions;
