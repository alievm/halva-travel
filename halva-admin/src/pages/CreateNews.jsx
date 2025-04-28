import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from '../api/axiosConfig';

const CreateNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingNews, setEditingNews] = useState(null);
  const [fileList, setFileList] = useState([]);

  const fetchNews = async () => {
    const res = await axios.get('/news');
    setNewsList(res.data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const showModal = (news = null) => {
    setEditingNews(news);
    if (news) {
      form.setFieldsValue({
        ...news.title,
        content_ru: news.content.ru,
        content_en: news.content.en,
        content_uz: news.content.uz,
      });
      setFileList(news.image ? [{ url: `${import.meta.env.VITE_API_BASE_URL}/uploads/${news.image}`, name: news.image, uid: '-1' }] : []);
    } else {
      form.resetFields();
      setFileList([]);
    }
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/news/${id}`);
    fetchNews();
  };

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    const formData = new FormData();

    formData.append('title', JSON.stringify({ ru: values.ru, en: values.en, uz: values.uz }));
    formData.append('content', JSON.stringify({ ru: values.content_ru, en: values.content_en, uz: values.content_uz }));
    if (fileList[0]?.originFileObj) {
      formData.append('image', fileList[0].originFileObj);
    }

    if (editingNews) {
      await axios.put(`/news/${editingNews._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      await axios.post('/news', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    setIsModalVisible(false);
    fetchNews();
  };

  const columns = [
    {
      title: 'Заголовок (RU)',
      dataIndex: ['title', 'ru'],
    },
    {
      title: 'Дата',
      dataIndex: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Действия',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>Редактировать</Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>Удалить</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Новости</h2>
        <Button type="primary" onClick={() => showModal()}>Добавить</Button>
      </div>
      <Table rowKey="_id" dataSource={newsList} columns={columns} />

      <Modal
        title={editingNews ? 'Редактировать новость' : 'Добавить новость'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="ru" label="Заголовок (RU)"><Input /></Form.Item>
          <Form.Item name="en" label="Заголовок (EN)"><Input /></Form.Item>
          <Form.Item name="uz" label="Заголовок (UZ)"><Input /></Form.Item>

          <Form.Item name="content_ru" label="Контент (RU)"><Input.TextArea rows={4} /></Form.Item>
          <Form.Item name="content_en" label="Контент (EN)"><Input.TextArea rows={4} /></Form.Item>
          <Form.Item name="content_uz" label="Контент (UZ)"><Input.TextArea rows={4} /></Form.Item>

          <Form.Item label="Изображение">
            <Upload
              listType="picture"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList }) => setFileList(fileList)}
              maxCount={1}
            >
              <Button icon={<PlusOutlined />}>Загрузить</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateNews;
