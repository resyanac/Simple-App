import React from 'react';
import { Button, Form, Input } from 'antd';
import * as yup from 'yup';
import { useFormik } from 'formik';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const initialValues = {
  streetAddress: '',
  city: '',
  state: '',
  zipcode: '',
};

const validationSchema = yup.object({
  streetAddress: yup.string().required('Street Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipcode: yup
    .string()
    .required('Zip Code is required')
    .matches(/^\d{5}$/, 'Zip Code must be a 5-digit number'),
});

const AddressForm: React.FC = () => {
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
      style={{ maxWidth: 600, padding: '3rem', borderRadius: '9999px' }}
    >
      <Form.Item
        name="streetAddress"
        label="Street Address"
        rules={[{ required: true, message: 'Street Address is required' }]}
      >
        <Input
          name="streetAddress"
          value={formik.values.streetAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.errors.streetAddress && 'error'}
        />
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
        rules={[{ required: true, message: 'City is required' }]}
      >
        <Input
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.errors.city && 'error'}
        />
      </Form.Item>

      <Form.Item
        name="state"
        label="State"
        rules={[{ required: true, message: 'State is required' }]}
      >
        <Input
          name="state"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.errors.state && 'error'}
        />
      </Form.Item>

      <Form.Item
        name="zipcode"
        label="Zip Code"
        rules={[
          { required: true, message: 'Zip Code is required' },
          { len: 5, message: 'Zip Code must be a 5-digit number' },
        ]}
      >
        <Input
          name="zipcode"
          value={formik.values.zipcode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.errors.zipcode && 'error'}
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

export default AddressForm;
