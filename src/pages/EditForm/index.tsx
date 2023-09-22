import  { useCallback, useEffect, useState } from 'react';
import { Form, Button, Card, Space, Input, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';

const { Option } = Select;

interface Category {
  name: string;
  status: string;
}

interface FormProps {
  name: string;
  status: string;
}

const initialValues: FormProps = {
  name: '',
  status: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  status: yup.string().required('Status is required'),
});

const EditForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);

  const getCategory = useCallback(async () => {
    try {
      const response = await axios.get(`https://mock-api.arikmpt.com/api/category/${id}`);
      setCategory(response.data);
    } catch (error) {
      alert(error);
    }
  }, [id]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const onSubmit = async (values: FormProps) => {
    try {
      await axios.put(`https://mock-api.arikmpt.com/api/category/${id}`, values);
      Swal.fire({
        icon: 'success',
        title: 'Category updated successfully',
        text: 'Category has been updated successfully.',
      });
      navigate('/table');
    } catch (error) {
      alert(error);
    }
  };

  const formik = useFormik({
    initialValues: category || initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <Card title="Edit Category">
      <Form name="control-ref" onFinish={formik.handleSubmit} style={{ width: 200 }}>
        <Form.Item
          name="name"
          validateStatus={formik.touched.name && formik.errors.name ? 'error' : ''}
          help={formik.touched.name && formik.errors.name}
        >
          <Input
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item name="status">
          <Select
            placeholder="Select Option"
            allowClear
            value={formik.values.status}
            onChange={(value) => formik.setFieldValue('status', value)}
            onBlur={formik.handleBlur}
          >
            <Option value="active">Active</Option>
            <Option value="deactive">Deactive</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              SUBMIT
            </Button>
            <Button href="/table" htmlType="button">
              BACK
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditForm;
