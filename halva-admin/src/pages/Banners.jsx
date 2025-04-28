import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Upload, Switch, message } from 'antd';
import { UploadOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import axios from '../api/axiosConfig';

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingBanner, setEditingBanner] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const fetchBanners = async () => {
    const res = await axios.get('/banners');
    setBanners(res.data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleEdit = (record) => {
    setEditingBanner(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editingBanner) {
        await axios.put(`/banners/${editingBanner._id}`, formData);
        message.success('Баннер обновлён!');
      } else {
        await axios.post('/banners', formData);
        message.success('Баннер добавлен!');
      }
      setIsModalOpen(false);
      setEditingBanner(null);
      form.resetFields();
      fetchBanners();
    } catch (err) {
      message.error('Ошибка при сохранении баннера');
    }
  };

  const columns = [
    {
      title: 'Заголовок (RU)',
      dataIndex: ['title', 'ru']
    },
    {
      title: 'CTA (EN)',
      dataIndex: ['cta', 'en']
    },
    {
      title: 'Активен',
      dataIndex: 'isActive',
      render: (val) => (val ? 'Да' : 'Нет')
    },
    {
      title: 'Действия',
      render: (_, record) => (
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
          Редактировать
        </Button>
      )
    }
  ];

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
        Добавить баннер
      </Button>

      <Table className="mt-4" dataSource={banners} rowKey="_id" columns={columns} />

      <Modal
        title={editingBanner ? 'Редактировать баннер' : 'Добавить баннер'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingBanner(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Заголовок (RU)" name={['title', 'ru']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Заголовок (UZ)" name={['title', 'uz']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Заголовок (EN)" name={['title', 'en']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Подзаголовок (RU)" name={['subtitle', 'ru']}>
            <Input />
          </Form.Item>
          <Form.Item label="Подзаголовок (UZ)" name={['subtitle', 'uz']}>
            <Input />
          </Form.Item>
          <Form.Item label="Подзаголовок (EN)" name={['subtitle', 'en']}>
            <Input />
          </Form.Item>

          <Form.Item label="Текст кнопки (RU)" name={['cta', 'ru']}>
            <Input />
          </Form.Item>
          <Form.Item label="Текст кнопки (UZ)" name={['cta', 'uz']}>
            <Input />
          </Form.Item>
          <Form.Item label="Текст кнопки (EN)" name={['cta', 'en']}>
            <Input />
          </Form.Item>

          <Form.Item label="Изображение">
            <Upload
              beforeUpload={(file) => {
                setImageFile(file);
                return false;
              }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Активен" name="isActive" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Banners;
