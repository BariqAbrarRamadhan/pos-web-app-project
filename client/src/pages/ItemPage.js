import React, { useState, useEffect } from 'react';
import DefaultLayout from "./../components/DefaultLayout";
import { Table, Button, Modal, Input, Form, message } from 'antd';
import axios from 'axios';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const ItemPage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const dispatch = useDispatch();
  const getAllItems = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get('/api/items/get-item');
      dispatch({ type: "HIDE_LOADING" });
      setItemsData(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const handleDelete = async (record) => {
    try {
      await axios.post('/api/items/delete-item', {itemId: record._id});
      // await axios.post('/api/items/delete-item', { data: { itemId: record._id } });
      message.success('Item Berhasil Dihapus');
      getAllItems();
      setPopupModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => (
        <img src={image} alt={record.name} height='100' width='100' />
      )
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <EditOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setEditItem(record);
              setPopupModal(true);
            }}
          />
          <DeleteOutlined
          style={{ cursor: 'pointer' }}
          onClick={() => {
            handleDelete(record);
          }}
          />
        </div>
      )
    },
  ];

  const handleSubmit = async (values) => {
    if (editItem === null) {
      try {
        await axios.post("/api/items/add-item", values);
        message.success('Item Berhasil Ditambahkan');
        getAllItems();
        setPopupModal(false);
      } catch (error) {
        message.error('Ada Yang Salah!!!');
        console.log(error);
      }
    } else {
      try {
        await axios.put("/api/items/edit-item", {...values, itemId:editItem._id,});
        message.success('Item Berhasil Diupdate');
        getAllItems();
        setPopupModal(false);
      } catch (error) {
        message.error('Ada Yang Salah!!!');
        console.log(error);
      }
    }
  };

  return (
    <DefaultLayout>
      <div style={{ margin: '16px 0px', display: 'flex', justifyContent: 'space-between' }}>
        <h1>ITEM LIST</h1>
        <Button className="add-item-btn" onClick={() => setPopupModal(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered pagination={false}/>
      {
        popupModal && (
          <Modal
            title={`${editItem !== null ? 'Edit Item' : 'Add New Item'}`}
            open={popupModal}
            onCancel={() => {
              setEditItem(null);
              setPopupModal(false)
            }}
            footer={null}
          >
            <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit}>
            {/* <Form layout='vertical' initialValues={editItem || {}} onFinish={handleSubmit}> */}
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Price" name="price">
                <Input />
              </Form.Item>
              <Form.Item label="Image URL" name="image">
                <Input />
              </Form.Item>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button className="add-item-btn" htmlType='submit'>
                  Simpan
                </Button>
              </div>
            </Form>
          </Modal>
        )
      }
    </DefaultLayout>
  );
};

export default ItemPage;
