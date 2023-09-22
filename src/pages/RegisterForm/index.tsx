import React from 'react';
import { Button, Form, Input, Card } from 'antd';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface RegisterPage {
  name: string;
  email: string;
  password: string;
}

const initialValues = {
  name: '',
  email: '',
  password: '',
  remember: false,
};

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: RegisterPage) => {
    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    fetch('https://mock-api.arikmpt.com/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error while register');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success register:', data);
        Swal.fire({
          icon: 'success',
          title: 'Registration Success',
          text: 'Registration Success',
        });
        navigate('/'); 
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'An error occurred during registration. Please try again.',
        });
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  const handleRegister = () => {
    formik.validateForm().then(() => {
      if (Object.keys(formik.errors).length === 0) {
        formik.handleSubmit();
      }
    });
  };

  const handleLogin = () => {
    navigate('/'); 
  };

  return (
    <Card title="Register" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Form
        {...layout}
        onFinish={formik.handleSubmit}
        style={{ padding: '1rem' }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Name is required' }]}
          hasFeedback
          validateStatus={formik.touched.name && formik.errors.name ? 'error' : ''}
          help={formik.touched.name && formik.errors.name}
        >
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.errors.name ? 'error' : undefined}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Invalid email' },
          ]}
          hasFeedback
          validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}
          help={formik.touched.email && formik.errors.email}
        >
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.errors.email ? 'error' : undefined}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Password is required' },
          ]}
          hasFeedback
          validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''}
          help={formik.touched.password && formik.errors.password}
        >
          <Input.Password
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.errors.password ? 'error' : undefined}
          />
        </Form.Item>

        <Form.Item wrapperCol={{}}>
          <Button type="primary" htmlType="button" onClick={handleRegister} style={{ margin: '12px' }}>
            Register
          </Button>
          <Button type="default" className="login-form-button" htmlType="button" onClick={handleLogin} style={{ margin: '12px' }}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegisterForm;
