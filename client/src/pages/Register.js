import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("/api/users/register", values);
      message.success('Register Berhasil');
      dispatch({ type: "HIDE_LOADING" });
      navigate('/login');
    } catch (error) {
      message.error('Register Gagal!!!');
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  }
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      localStorage.getItem('auth');
      navigate('/');
    }
  }, [navigate]);
  return (
    <div className="register">
      <div className='register-form'>
        <h1>POS APP</h1>
        <h3>Regiter Page</h3>
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="User ID" name="userId">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type='password' />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>
              Already Register Please
              <Link to="/login"> Login Here!</Link>
            </p>
            <Button className="add-item-btn" htmlType='submit'>
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register