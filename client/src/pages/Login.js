import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const res = await axios.post("/api/users/login", values);
      dispatch({ type: "HIDE_LOADING" });
      message.success('Login Berhasil');
      localStorage.setItem('auth', JSON.stringify(res.data));
      navigate('/');
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error('Login Gagal!!!');
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
        <h3>Login Page</h3>
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item label="User ID" name="userId">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type='password' />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>
              Belum Punya Akun?
              <Link to="/register"> Register Here!</Link>
            </p>
            <Button className="add-item-btn" htmlType='submit'>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
export default Login