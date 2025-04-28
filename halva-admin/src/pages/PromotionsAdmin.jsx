import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Switch } from 'antd';
import axios from '../api/axiosConfig';

const PromotionsAdmin = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingPromo, setEditingPromo] = useState(null);

  const fetchPromotions = async () => {
    setLoading(true);
    const res = await axios.get('/promotions');
    setPromotions(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const showModal = (promo = null) => {
    setEditingPromo(promo);
    form.setFieldsValue(
      promo || {
        title_ru: '',
        title_en: '',
        title_uz: '',
        description_ru: '',
        description_en: '',
        description_uz: '',
        isActive: true,
      }
    );
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      const payload = {
        title: {
          ru: values.title_ru,
          en: values.title_en,
          uz: values.title_uz,
        },
        description: {
          ru: values.description_ru,
          en: values.description_en,
          uz: values.description_uz,
        },
        isActive: values.isActive,
      };

      if (editingPromo) {
        await axios.put(`/promotions/${editingPromo._id}`, payload);
        message.success('Акция обновлена');
      } else {
        await axios.post('/promotions', payload);
        message.success('Акция создана');
      }

      setIsModalVisible(false);
      fetchPromotions();
      form.resetFields();
      setEditingPromo(null);
    } catch (error) {
      message.error('Ошибка при сохранении');
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/promotions/${id}`);
    fetchPromotions();
  };

  const columns = [
    {
      title: 'Название (RU)',
      dataIndex: ['title', 'ru'],
      key: 'title_ru',
    },
    {
      title: 'Активна',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (value) => (value ? 'Да' : 'Нет')
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)}>Редактировать</Button>
          <Button danger type="link" onClick={() => handleDelete(record._id)}>Удалить</Button>
        </>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Управление акциями</h2>
        <Button type="primary" onClick={() => showModal()}>Добавить акцию</Button>
      </div>

      <Table rowKey="_id" dataSource={promotions} columns={columns} loading={loading} />

      <Modal
        title={editingPromo ? 'Редактировать акцию' : 'Создать акцию'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        width={800}
      >
        <Form layout="vertical" form={form}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item name="title_ru" label="Заголовок (RU)"><Input /></Form.Item>
            <Form.Item name="title_en" label="Заголовок (EN)"><Input /></Form.Item>
            <Form.Item name="title_uz" label="Заголовок (UZ)"><Input /></Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item name="description_ru" label="Описание (RU)"><Input.TextArea rows={3} /></Form.Item>
            <Form.Item name="description_en" label="Описание (EN)"><Input.TextArea rows={3} /></Form.Item>
            <Form.Item name="description_uz" label="Описание (UZ)"><Input.TextArea rows={3} /></Form.Item>
          </div>
          <Form.Item name="isActive" label="Активна" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PromotionsAdmin;
