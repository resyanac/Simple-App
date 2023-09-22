
import { Button, Card, Form, Input, Select, Space} from 'antd';
import {  useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';

const { Option } = Select;

interface FormProps {
  name?: string;
  is_active?: boolean;
}

const initialValues = {
  name: '',
  status:'',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  is_active: yup.boolean().required('Status is required'),
});

const AddForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleSubmit = async (values: FormProps) => {
    try {
      await axios.post(
        'https://mock-api.arikmpt.com/api/category/create',
        {
          name: values.name,
          is_active: values.is_active,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); 
      navigate('/table')
    } catch (error) {
      const err = error as AxiosError as any;
      const errors = err.response?.data?.errors;
      if (Array.isArray(errors)) {
        return;
      }
    }
  };

    const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });


  return (
      <Card title="Add New Category">
      <Form name="control-ref" onFinish={handleSubmit} style={{ width: 200 }}>
        <Form.Item 
        name="name"
        validateStatus={
        formik.touched.name && formik.errors.name ? "error" : ""}
        help={formik.touched.name && formik.errors.name} >
          <Input name="name"
            placeholder="Name"
            value={formik.values.name}
            />
        </Form.Item>
        <Form.Item name="status">
          <Select
            placeholder="Select Option"
            allowClear
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
            <Button href="/table" htmlType="button">BACK</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddForm;
