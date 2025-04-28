import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from '../api/axiosConfig';

const Regions = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRegion, setEditingRegion] = useState(null);
  const [fileList, setFileList] = useState([]);

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
    form.resetFields();
  
    if (region) {
      // Загрузим текстовые значения
      form.setFieldsValue({
        ...region.name,
        desc_ru: region.description?.ru,
        desc_en: region.description?.en,
        desc_uz: region.description?.uz
      });
  
      // Преобразуем изображения из строки в нужный формат для Upload
      const formattedImages = (region.images || []).map((imgUrl, index) => ({
        uid: `existing-${index}`,
        name: `image-${index}.jpg`,
        status: 'done',
        url: imgUrl,
      }));
  
      setFileList(formattedImages);
    } else {
      setFileList([]);
    }
  
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/regions/${id}`);
    fetchRegions();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append(
        'name',
        JSON.stringify({ ru: values.ru, en: values.en, uz: values.uz })
      );
      formData.append(
        'description',
        JSON.stringify({
          ru: values.desc_ru,
          en: values.desc_en,
          uz: values.desc_uz,
        })
      );
      fileList.forEach((file) => formData.append('images', file.originFileObj));

      if (editingRegion) {
        await axios.put(`/regions/${editingRegion._id}`, formData);
      } else {
        await axios.post('/regions', formData);
      }

      setIsModalVisible(false);
      fetchRegions();
    } catch (error) {
      message.error('Ошибка при отправке формы');
    }
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
        okText={editingRegion ? 'Обновить' : 'Создать'}
      >
        <Form layout="vertical" form={form}>
          <div className="bg-gray-100 rounded-md p-3">
            <p className="font-semibold">Название региона</p>
            <Form.Item name="ru" label="На русском" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="en" label="На английском" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="uz" label="На узбекском" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </div>

          <div className="bg-gray-100 rounded-md p-3 mt-4">
            <p className="font-semibold">Описание региона</p>
            <Form.Item name="desc_ru" label="Описание на русском">
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item name="desc_en" label="Описание на английском">
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item name="desc_uz" label="Описание на узбекском">
              <Input.TextArea rows={2} />
            </Form.Item>
          </div>

          <div className="bg-gray-100 rounded-md p-3 mt-4">
            <p className="font-semibold">Изображения</p>
            <Upload
  listType="picture"
  beforeUpload={() => false} // отключаем автоаплоад
  multiple
  fileList={fileList}
  onPreview={(file) => window.open(file.url || URL.createObjectURL(file.originFileObj))}
  onChange={({ fileList: newList }) => setFileList(newList)}
>
  <Button icon={<UploadOutlined />}>Загрузить изображения</Button>
</Upload>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Regions;
