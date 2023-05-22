import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  HomeOutlined,
  SwapOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Table, Modal, message, Form, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import "../styles/DefaultLayout.css";
import Spinner from './Spinner';
const { Header, Sider, Content } = Layout;
const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const { cartItems, loading } = useSelector(state => state.rootReducer);
  const [collapsedLeft, setCollapsedLeft] = useState(false);
  const [collapsedRight, setCollapsedRight] = useState(false);
  const [siderWidthRight, setSiderWidthRight] = useState('1%');
  const toggleCollapsedRight = () => {
    setCollapsedRight(!collapsedRight);
    setSiderWidthRight(siderWidthRight ? '30%' : '1%'); // Lebar akhir
  };
  const [itemsData, setItemsData] = useState([]);
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        console.log(error)
      };
    }
    getAllItems();
  }, [])
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems, dispatch]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleIncreament = (record) => {
    dispatch({
      type: 'UPDATE_CART',
      payload: { ...record, quantity: record.quantity + 1 }
    });
  }
  const handleDecreament = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: 'UPDATE_CART',
        payload: { ...record, quantity: record.quantity - 1 }
      });
    }
  }
  const columns = [
    {
      dataIndex: 'nameAndPrice',
      render: (text, record) => (
        <span style={{ fontSize: 12 }}>
          <b>
            {record.name}
          </b>
          <br />
          {record.price}
        </span>
      ),
    },
    {
      dataIndex: '_id',
      render: (id, record) =>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <PlusCircleOutlined className="mx-3" onClick={() => handleIncreament(record)} />
          <div>
            <b style={{ fontSize: 24 }}>{record.quantity}</b>
          </div>
          <MinusCircleOutlined className="mx-3" onClick={() => handleDecreament(record)} />
        </div>
    },
    {
      key: 'operation',
      fixed: 'right',
      width: 75,
      render: (id, record) => (
        <DeleteOutlined
          onClick={() =>
            dispatch({
              type: "DELETE_FROM_CART",
              payload: record,
            })
          }
        />
      ),
    },
  ];
  useEffect(() => {
    let temp = 0;
    cartItems.forEach(item => temp = temp + (item.price * item.quantity))
    setSubTotal(temp);
  }, [cartItems]);
  const handleSubmit = async (values) => {
    try {
      const newObject = {
        ...values,
        cartItems,
        subTotal,
        totalAmount: Number(subTotal),
        userId: JSON.parse(localStorage.getItem('auth'))._id,
      };
      await axios.post('/api/bills/add-bill', newObject);
      message.success("Bill Generated");
      navigate('/bills');
    } catch (error) {
      message.error('Ada yang salah!!!');
      console.log(error)
    }

  }
  return (
    <Layout>
      {loading && <Spinner />}
      <Sider
        trigger={null} collapsible collapsed={!collapsedLeft}
        theme="dark"
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          className='navbar'
        >
          <Menu.Item key="/" icon={<HomeOutlined />} className="nav-item">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/transaksi" icon={<SwapOutlined />} className="nav-item">
            <Link to="/transaksi">Transaksi</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />} className="nav-item">
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />} className="nav-item">
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined />}
            className="nav-item logout"
            onClick={() => {
              localStorage.removeItem('auth');
              navigate('/login');
            }}>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="header-nav"
        >
          <div className="logo" />
          <div className="nama-toko">
            TOKO MAJU JAYA MAKMUR AGUNG ABADI
          </div>
          <div className="cart-item">
            <p>{cartItems.length}</p>
            <Button
              type="text"
              icon={<ShoppingCartOutlined />}
              onClick={
                toggleCollapsedRight
              }
            />
          </div>
        </Header>
        <Content
          style={{
            margin: '16px 0px 0px 0px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
      <Sider
        trigger={null} collapsible collapsed={!collapsedRight}
        width={siderWidthRight} collapsedWidth={'1%'}
        theme="light"
      >

        <Menu
          theme="light"
          mode="inline"
          className="cart-menu"
          defaultSelectedKeys={window.location.pathname}
          style={{ display: collapsedRight ? 'block' : 'none' }}
        >
          <div className="sl-title">
            <h1>KERANJANG</h1>
          </div>
          <div className="sl-content">
            <Table
              columns={columns}
              dataSource={cartItems}
              scroll={{
                x: 300,
              }}
              pagination={false}
            />
          </div>
          <div
            style={{
              height: '100px',
              padding: '16px 0px',
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'flex-end'
            }}>
            <h3>Sub Total: Rp. <b>{subTotal},00</b>{" "}</h3>
          </div>
          <div className="sl-btn">
            <Button onClick={() => setBillPopup(true)}>Bayar</Button>
          </div>
          <Modal
            title="Tagihan Pembayaran"
            open={billPopup}
            onCancel={() => setBillPopup(false)}
            footer={false}
          >
            <Form layout='vertical' onFinish={handleSubmit}>
              <Form.Item label="Payment Method" name="paymentMethod">
                <Select>
                  <Select.Option value="Card">Card</Select.Option>
                  <Select.Option value="Cash">Cash</Select.Option>
                </Select>
              </Form.Item>
              <div className="bill-detail">
                <h2>
                  Sub Total: Rp. {subTotal}
                </h2>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button className="add-item-btn" htmlType='submit'>
                  <b>Bayar</b>
                </Button>
              </div>
            </Form>
          </Modal>
        </Menu>
      </Sider>
    </Layout >
  );
};
export default DefaultLayout;