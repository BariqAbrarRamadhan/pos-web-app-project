import React, { useState, useEffect } from 'react';
import DefaultLayout from "./../components/DefaultLayout"
import ItemList from "./../components/ItemList"
import axios from 'axios';
import { Row, Col } from 'antd';

const TransaksiPage = () => {
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const { data } = await axios.get('/api/items/get-item');
        setItemsData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllItems();
  }, []);
  return (
    <DefaultLayout>
      <Row>
        {
          itemsData.map(item => (
            <Col xs={30} sm={24} md={12} lg={8}>
              <ItemList item={item} />
            </Col>
          ))
        }
      </Row>
    </DefaultLayout>
  )
}

export default TransaksiPage