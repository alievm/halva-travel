import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Checkbox,Input, Select, InputNumber ,  Upload, message} from 'antd';
import {
    WifiOutlined,
    CarOutlined,
    CoffeeOutlined,
    RestOutlined,
    FireOutlined,
    AppstoreAddOutlined,
    PhoneOutlined,
    SafetyOutlined,
    EnvironmentOutlined,
    SmileOutlined,
    GiftOutlined,
    PlusOutlined 
  } from '@ant-design/icons';
import axios from '../api/axiosConfig';

const amenitiesList = [
    { label: 'Wi-Fi', value: 'wifi', icon: <WifiOutlined /> },
    { label: 'Кондиционер', value: 'ac', icon: <RestOutlined /> },
    { label: 'Завтрак', value: 'breakfast', icon: <CoffeeOutlined /> },
    { label: 'Парковка', value: 'parking', icon: <CarOutlined /> },
    { label: 'Бассейн', value: 'pool', icon: <AppstoreAddOutlined /> },
    { label: 'Отопление', value: 'heating', icon: <FireOutlined /> },
    { label: 'Телефон', value: 'phone', icon: <PhoneOutlined /> },
    { label: 'Сейф', value: 'safe', icon: <SafetyOutlined /> },
    { label: 'Вид на город', value: 'view', icon: <EnvironmentOutlined /> },
    { label: 'Детская зона', value: 'kids', icon: <SmileOutlined /> },
    { label: 'Подарок', value: 'gift', icon: <GiftOutlined /> }
  ];

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [regions, setRegions] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingTour, setEditingTour] = useState(null);
  

  const fetchTours = async () => {
    setLoading(true);
    const res = await axios.get('/tours');
    setTours(res.data);
    setLoading(false);
  };

  const fetchRegions = async () => {
    const res = await axios.get('/regions');
    setRegions(res.data);
  };

  const fetchHotels = async () => {
    const res = await axios.get('/hotels');
    setHotels(res.data);
  };

  useEffect(() => {
    fetchTours();
    fetchRegions();
    fetchHotels();
  }, []);

  const showModal = (tour = null) => {
    setEditingTour(tour);
    form.setFieldsValue(
      tour
        ? {
            ...tour.title,
            route_ru: tour.route?.ru,
            route_en: tour.route?.en,
            route_uz: tour.route?.uz,
            short_ru: tour.shortDescription?.ru,
            short_en: tour.shortDescription?.en,
            short_uz: tour.shortDescription?.uz,
            ext_ru: tour.extras?.ru,
            ext_en: tour.extras?.en,
            ext_uz: tour.extras?.uz,
            includes: tour.includes || [], // вот это 👈
            price: tour.price,
            days: tour.days,
            nights: tour.nights,
            region: tour.region?._id,
            hotel: tour.hotel?._id,
            isActive: tour.isActive
          }
        : {}
    );
  
    const baseURL = import.meta.env.VITE_DIRECTORY_URL || 'http://localhost:5000';

    const fileListFromServer = tour?.images?.map((img, index) => {
      const normalizedPath = img.replace(/^\/?uploads\//, '').replace(/^\/+/, '');
    
      return {
        uid: String(index),
        name: normalizedPath.split('/').pop(),
        url: `${baseURL}/uploads/${normalizedPath.replace(/^\/?uploads\//, '')}`
      };
    }) || [];
    
  
    setFileList(fileListFromServer);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/tours/${id}`);
    fetchTours();
  };

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
  
    const formData = new FormData();
  
    formData.append('title', JSON.stringify({
      ru: values.ru,
      en: values.en,
      uz: values.uz,
    }));
    formData.append('isActive', values.isActive || false);
    formData.append('region', values.region);
    formData.append('hotel', values.hotel);
    formData.append('price', values.price);
    formData.append('days', values.days);
    formData.append('nights', values.nights);
    formData.append('route', JSON.stringify({
      ru: values.route_ru,
      en: values.route_en,
      uz: values.route_uz,
    }));
    formData.append('shortDescription', JSON.stringify({
      ru: values.short_ru,
      en: values.short_en,
      uz: values.short_uz,
    }));
    formData.append('extras', JSON.stringify({
      ru: values.ext_ru,
      en: values.ext_en,
      uz: values.ext_uz,
    }));
  
    // ✅ includes (чекбоксы)
    formData.append('includes', JSON.stringify(values.includes || []));
  
    // ✅ Старые картинки (оставшиеся в списке)
    const existingImages = fileList
    .filter(file => !file.originFileObj && file.url)
    .map(file => {
      const parts = file.url.split('/uploads/');
      return parts.length > 1 ? `tours/${parts[1].split('/').pop()}` : '';
    });
  
    formData.append('existingImages', JSON.stringify(existingImages));
  
    // ✅ Новые картинки (добавленные пользователем)
    fileList.forEach(file => {
      if (file.originFileObj) {
        formData.append('images', file.originFileObj);
      }
    });
  
    // ✅ Обновление или создание
    if (editingTour) {
      await axios.put(`/tours/${editingTour._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      await axios.post('/tours', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
  
    // ✅ Завершение
    setIsModalVisible(false);
    fetchTours();
    setFileList([]);
  };

  const handleCancel = () => {
    form.resetFields();        // сброс всех значений формы
    setFileList([]);           // очистка загруженных изображений
    setEditingTour(null);      // сброс редактируемого тура
    setIsModalVisible(false);  // закрыть модал
  };
  

  const columns = [
    {
      title: 'Название тура (RU)',
      dataIndex: ['title', 'ru'],
      key: 'ru',
    },
    {
      title: 'Регион',
      dataIndex: ['region', 'name', 'ru'],
      key: 'region'
    },
    {
      title: 'Отель',
      dataIndex: ['hotel', 'name', 'ru'],
      key: 'hotel'
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Дней',
      dataIndex: 'days',
      key: 'days'
    },
    {
      title: 'Ночей',
      dataIndex: 'nights',
      key: 'nights'
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
        <h2 className="text-lg font-semibold">Туры</h2>
        <Button type="primary" onClick={() => showModal()}>Добавить Тур</Button>
      </div>
      <Table rowKey="_id" dataSource={tours} columns={columns} loading={loading} />

      <Modal title={editingTour ? 'Редактировать тур' : 'Добавить тур'} open={isModalVisible} onCancel={handleCancel} onOk={handleSubmit} width={1050}>
  <Form layout="vertical" form={form} className="space-y-6">

    {/* TITLE GROUP */}
    <div className="bg-gray-100 rounded-lg p-4">
      <label className="block font-semibold mb-2">Название</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.Item name="ru" label={<span className="flex items-center gap-2"><img src="/russia.png" alt="RU" className="w-5 h-5" /> RU</span>}><Input size="large" /></Form.Item>
        <Form.Item name="en" label={<span className="flex items-center gap-2"><img src="/united-states.png" alt="EN" className="w-5 h-5" /> EN</span>}><Input size="large" /></Form.Item>
        <Form.Item name="uz" label={<span className="flex items-center gap-2"><img src="/uzbekistan.png" alt="UZ" className="w-5 h-5" /> UZ</span>}><Input size="large" /></Form.Item>
      </div>
    </div>

    {/* ROUTE GROUP */}
    <div className="bg-gray-100 rounded-lg p-4">
      <label className="block font-semibold mb-2">Маршрут</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.Item name="route_ru" label={<span className="flex items-center gap-2"><img src="/russia.png" alt="RU" className="w-5 h-5" /> RU</span>}><Input.TextArea rows={2} size="large" /></Form.Item>
        <Form.Item name="route_en" label={<span className="flex items-center gap-2"><img src="/united-states.png" alt="EN" className="w-5 h-5" /> EN</span>}><Input.TextArea rows={2} size="large" /></Form.Item>
        <Form.Item name="route_uz" label={<span className="flex items-center gap-2"><img src="/uzbekistan.png" alt="UZ" className="w-5 h-5" /> UZ</span>}><Input.TextArea rows={2} size="large" /></Form.Item>
      </div>
    </div>

    {/* SHORT DESCRIPTION GROUP */}
    <div className="bg-gray-100 rounded-lg p-4">
      <label className="block font-semibold mb-2">Краткое описание</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.Item name="short_ru" label={<span className="flex items-center gap-2"><img src="/russia.png" alt="RU" className="w-5 h-5" /> RU</span>}><Input.TextArea rows={5} size="large" /></Form.Item>
        <Form.Item name="short_en" label={<span className="flex items-center gap-2"><img src="/united-states.png" alt="EN" className="w-5 h-5" /> EN</span>}><Input.TextArea rows={5} size="large" /></Form.Item>
        <Form.Item name="short_uz" label={<span className="flex items-center gap-2"><img src="/uzbekistan.png" alt="UZ" className="w-5 h-5" /> UZ</span>}><Input.TextArea rows={5} size="large" /></Form.Item>
      </div>
    </div>

    {/* EXTRAS GROUP */}
    <div className="bg-gray-100 rounded-lg p-4">
      <label className="block font-semibold mb-2">Дополнительно</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.Item name="ext_ru" label={<span className="flex items-center gap-2"><img src="/russia.png" alt="RU" className="w-5 h-5" /> RU</span>}><Input.TextArea rows={2} size="large" /></Form.Item>
        <Form.Item name="ext_en" label={<span className="flex items-center gap-2"><img src="/united-states.png" alt="EN" className="w-5 h-5" /> EN</span>}><Input.TextArea rows={2} size="large" /></Form.Item>
        <Form.Item name="ext_uz" label={<span className="flex items-center gap-2"><img src="/uzbekistan.png" alt="UZ" className="w-5 h-5" /> UZ</span>}><Input.TextArea rows={2} size="large" /></Form.Item>
      </div>
    </div>

    {/* Upload Images */}
    <Form.Item label="Загрузить изображения">
      <Upload
        listType="picture-card"
        fileList={fileList}
        beforeUpload={() => false}
        onChange={({ fileList }) => setFileList(fileList)}
        multiple
      >
        {fileList.length >= 10 ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Загрузить</div>
          </div>
        )}
      </Upload>
    </Form.Item>

    {/* Amenities */}
    <Form.Item name="includes" label="Удобства">
      <Checkbox.Group>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {amenitiesList.map(item => (
            <label key={item.value} className="flex items-center gap-2">
              <Checkbox value={item.value} /> {item.icon} {item.label}
            </label>
          ))}
        </div>
      </Checkbox.Group>
    </Form.Item>

    {/* Other Fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Form.Item name="region" label="Регион">
        <Select size="large">{regions.map((r) => <Select.Option key={r._id} value={r._id}>{r.name.ru}</Select.Option>)}</Select>
      </Form.Item>
      <Form.Item name="hotel" label="Отель">
        <Select allowClear size="large">{hotels.map((h) => <Select.Option key={h._id} value={h._id}>{h.name.ru}</Select.Option>)}</Select>
      </Form.Item>
     <div className='flex w-full'>
     <Form.Item className='w-full'  name="price" label="Цена"><InputNumber className="w-full" size="large" /></Form.Item>
      <Form.Item className='w-full' name="days" label="Дни"><InputNumber className="w-full" size="large" /></Form.Item>
      <Form.Item className='w-full' name="nights" label="Ночи"><InputNumber className="w-full" size="large" /></Form.Item>
      <Form.Item name="isActive" label="Активен" valuePropName="checked">
        <Checkbox>Включить тур</Checkbox>
      </Form.Item>
     </div>
    </div>
  </Form>
</Modal>


    </div>
  );
};

export default Tours;
