import React from 'react';
import { Button, Form, Input, DatePicker } from 'antd';
import * as yup from 'yup';
import { useFormik } from 'formik';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const initialValues = {
  fullname: '',
  email: '',
  birthday: null, 
};

const validationSchema = yup.object({
  fullname: yup.string().required('Fullname is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  birthday: yup.date().required('Date of birth is required'),
});

const PersonalForm: React.FC = () => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Form
      {...layout}
      onFinish={formik.handleSubmit}
      style={{ maxWidth: 600, padding: '3rem', borderRadius: '9999px'}}
    >
      <Form.Item
        name="fullname"
        label="Fullname"
        rules={[{ required: true, message: 'Fullname is required' }]}
      >
        <Input
          name="fullname"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.errors.fullname && 'error'}
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Invalid email format' },
        ]}
      >
        <Input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.errors.email && 'error'}
        />
      </Form.Item>

      <Form.Item
        name="birthday"
        label="Date of Birth"
        rules={[{ required: true, message: 'Date of birth is required' }]}
      >
        <DatePicker
          name="birthday"
          value={formik.values.birthday}
          onChange={(date) => formik.setFieldValue('birthday', date)}
          onBlur={formik.handleBlur}
          status={formik.errors.birthday && 'error'}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonalForm;
