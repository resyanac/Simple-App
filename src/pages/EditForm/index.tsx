import React from 'react';
import { Button, Form, Input, Select, Card, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'

const { Option } = Select;

interface EditPage {
  id: string,
  name: string,
  is_active: boolean
}

const EditForm: React.FC = () => {

const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const validate = localStorage.getItem('token');

  const onFinish = (values: EditPage) => {
    console.log(values);

    axios.put(`https://mock-api.arikmpt.com/api/category/update`, {
      id: id,
          name: values?.name,
          is_active: values?.is_active,

        }, { headers: { Authorization: `Bearer ${validate}` } })
      .then((response) => {
        console.log('Update successful', response.data);
        navigate('/table');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Data successfully submited!'
        }).then((result) => {
          if (result.isConfirmed) {
    }
});
      }).catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'An error occurred during update. Please try again.',
        });
      });
  };

  return (
    <Card title="Edit Category" style={{
      maxWidth: "400px",
      width: "100%",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"}}>
      <Form
        name="edit-item-form"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
      <Form.Item name="name" rules={[{ required: true }]}>
          <Input
            placeholder='Name'
            allowClear />
        </Form.Item>
        
        <Form.Item name="status" rules={[{ required: true }]}>
          <Select
            placeholder="Select a status option"
            allowClear
          >
            <Option value="true">Active</Option>
            <Option value="false">Deactive</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">Submit</Button>
            <Button htmlType="button" onClick={() => { navigate('/table') }}>Back</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};


export default EditForm;