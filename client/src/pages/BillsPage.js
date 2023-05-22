import React, { useState, useEffect, useRef  } from 'react';
import DefaultLayout from "./../components/DefaultLayout";
import "../styles/InvoiceStyle.css";
import { Table, Modal, Button } from 'antd';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import {
  EyeOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const BillsPage = () => {
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const dispatch = useDispatch();
  const componentRef = useRef();
  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get('/api/bills/get-bill');
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const columns = [
    { title: 'ID', dataIndex: '_id' },
    { title: 'Metode Pembayaran', dataIndex: 'paymentMethod' },
    { title: 'Total Pembelian', dataIndex: 'totalAmount', },
    { title: 'Tanggal Pembelian', dataIndex: 'date', render: (date) => date.toString().substring(0, 10) },
    {
      title: 'Preview',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <EyeOutlined style={{ cursor: 'pointer' }} onClick={() => {
            setSelectedBill(record);
            setPopupModal(true);
          }} />
        </div>
      )
    },
  ];

  return (
    <DefaultLayout>
      <div style={{ margin: '16px 0px', display: 'flex', justifyContent: 'space-between' }}>
        <h1>RIWAYAT TRANSAKSI</h1>
      </div>
      <Table columns={columns} dataSource={billsData} bordered pagination={false}/>
      {
        popupModal && (
          <Modal
            title="Invoice Detail"
            open={popupModal}
            onCancel={() => {
              setPopupModal(false)
            }}
            footer={null}
          >
            <hr className="hr"/>
            <div id="invoice-POS" ref={componentRef}>
              <center id="top">
                <div className="logo" />
                <div className="info">
                  <h1>TOKO MAJU JAYA MAKMUR AGUNG ABADI</h1>
                  <p className="itemtext"> Contact: 1234567890 | Lamongan</p>
                </div>
              </center>
              <div id="mid">
                <div style={{ marginTop: "5px", fontSize: '1.2em' }}>
                  <p>
                    Date: <b>{selectedBill.date.toString().substring(0, 10)}</b>
                    <br />
                  </p>
                  <hr style={{ margin: "5px" }} />
                </div>
              </div>
              <div id="bot">
                <div id="table">
                  <table>
                    <tbody>
                      <tr className="tabletitle">
                        <td className="item">
                          <h2>Item</h2>
                        </td>
                        <td className="Hours">
                          <h2>Qty</h2>
                        </td>
                        <td className="Rate">
                          <h2>Price</h2>
                        </td>
                        <td className="Rate">
                          <h2>Total</h2>
                        </td>
                      </tr>
                      {selectedBill.cartItems.map((item) => (
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      ))}
                      <tr className="tabletitle">
                        <td />
                        <td />
                      </tr>
                      <tr className="tabletitle">
                        <td />
                        <td />
                        <td className="Rate">
                          <h2>Total Belanja</h2>
                        </td>
                        <td className="payment">
                          <h2>
                            <b>Rp. {selectedBill.totalAmount}</b>
                          </h2>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="legalcopy">
                  <p className="legal">
                    <strong>Terimakasih telah order!!!</strong> Jika ada kesalahan saat pembayaran silahkan telepon atau email kami di
                    <b> tokomjmaa@gmail.com</b>
                  </p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button onClick={handlePrint} type='primary'>Print</Button>
            </div>
          </Modal>
        )
      }
    </DefaultLayout>
  )
}

export default BillsPage