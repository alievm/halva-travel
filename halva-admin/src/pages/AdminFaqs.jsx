import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Switch, message } from 'antd';
import axios from '../api/axiosConfig';

const AdminFaqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingFaq, setEditingFaq] = useState(null);

  const fetchFaqs = async () => {
    setLoading(true);
    const res = await axios.get('/faqs');
    setFaqs(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const showModal = (faq = null) => {
    setEditingFaq(faq);
    form.setFieldsValue(faq || {
      question: { ru: '', en: '', uz: '' },
      answer: { ru: '', en: '', uz: '' },
      isActive: true
    });
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    try {
      if (editingFaq) {
        await axios.put(`/faqs/${editingFaq._id}`, values);
        message.success('FAQ обновлен');
      } else {
        await axios.post('/faqs', values);
        message.success('FAQ создан');
      }
      setIsModalVisible(false);
      fetchFaqs();
      form.resetFields();
      setEditingFaq(null);
    } catch (error) {
      message.error('Ошибка при сохранении');
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/faqs/${id}`);
    fetchFaqs();
  };

  const columns = [
    {
      title: 'Вопрос (RU)',
      dataIndex: ['question', 'ru'],
      key: 'question_ru',
    },
    {
      title: 'Активен',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (active) => (active ? 'Да' : 'Нет')
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
        <h2 className="text-lg font-semibold">FAQ</h2>
        <Button type="primary" onClick={() => showModal()}>Добавить</Button>
      </div>
      <Table rowKey="_id" dataSource={faqs} columns={columns} loading={loading} />

      <Modal
        title={editingFaq ? 'Редактировать FAQ' : 'Добавить FAQ'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        width={800}
      >
        <Form layout="vertical" form={form}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item name={['question', 'ru']} label="Вопрос (RU)">
              <Input />
            </Form.Item>
            <Form.Item name={['question', 'en']} label="Вопрос (EN)">
              <Input />
            </Form.Item>
            <Form.Item name={['question', 'uz']} label="Вопрос (UZ)">
              <Input />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item name={['answer', 'ru']} label="Ответ (RU)">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item name={['answer', 'en']} label="Ответ (EN)">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item name={['answer', 'uz']} label="Ответ (UZ)">
              <Input.TextArea rows={3} />
            </Form.Item>
          </div>

          <Form.Item name="isActive" label="Активен" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminFaqs;
