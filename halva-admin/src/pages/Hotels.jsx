import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from '../api/axiosConfig';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingHotel, setEditingHotel] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [initialImages, setInitialImages] = useState([]); // добавил для отслеживания

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
    form.resetFields();
    form.setFieldsValue(
      hotel
        ? { ...hotel.name, region: hotel.region?._id }
        : { ru: '', en: '', uz: '', region: '' }
    );

    if (hotel?.images?.length) {
      const formattedImages = hotel.images.map((img) => ({
        uid: img,
        name: img,
        status: 'done',
        url: `${baseURL}/uploads/hotels/${img}`,
      }));
      setFileList(formattedImages);
      setInitialImages(hotel.images); // сохраним оригинальные имена файлов
    } else {
      setFileList([]);
      setInitialImages([]);
    }

    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/hotels/${id}`);
    fetchHotels();
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const formData = new FormData();

    const currentImages = fileList
      .filter(file => !file.originFileObj) // только существующие файлы
      .map(file => file.name);

    formData.append('name', JSON.stringify({
      ru: values.ru,
      en: values.en,
      uz: values.uz,
    }));

    formData.append('region', values.region);

    formData.append('existingImages', JSON.stringify(currentImages)); // отправляем оставшиеся старые фотки

    fileList.forEach(file => {
      if (file.originFileObj) {
        formData.append('images', file.originFileObj);
      }
    });

    if (editingHotel) {
      await axios.put(`/hotels/${editingHotel._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      await axios.post('/hotels', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }

    setIsModalVisible(false);
    fetchHotels();
    setFileList([]);
    setInitialImages([]);
    message.success('Отель успешно сохранен!');
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
          <Button type="primary" onClick={() => showModal(record)} style={{ marginRight: 8 }}>
            Редактировать
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Удалить
          </Button>
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
        width={600}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="ru" label="Название на русском" rules={[{ required: true, message: 'Введите название' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="en" label="Название на английском" rules={[{ required: true, message: 'Введите название' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="uz" label="Название на узбекском" rules={[{ required: true, message: 'Введите название' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="region" label="Регион" rules={[{ required: true, message: 'Выберите регион' }]}>
            <Select>
              {regions.map((region) => (
                <Select.Option key={region._id} value={region._id}>
                  {region?.name?.ru}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Фотографии">
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              multiple
              maxCount={5}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Добавить</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Hotels;
