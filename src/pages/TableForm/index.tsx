import React, { useEffect, useState } from "react";
import { Button, Table, Space, Card, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';



interface DataType {
  id: string;
  name: string;
  is_active: boolean;
}

// interface ApiResponse {
//     data: DataType[],
//     current_page: number,
//     total_item: number,
//     total_page: number,
// }





const TableForm: React.FC = () => {

  const navigate = useNavigate();
  const [data, setData] = useState<DataType[]>([])

const fetchData = async () => {
  const validate = localStorage.getItem('token');
  const apiUrl = 'https://mock-api.arikmpt.com/api/category';
  const fetching = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${validate}`
                }
            }); 
if (fetching.ok) {
  const data = await fetching.json()
  setData(data.data)
}
} 

useEffect(() => {
    fetchData();
  }, []);

const columns: ColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: 'Status',
    dataIndex: 'is_active',
    key: 'is_active',

    render: (isActive) => (
      <span>{isActive ? 'Active' : 'Deactive'}</span>
    ),
    filters: [
      { text: 'Active', value: true },
      { text: 'Deactive', value: false },
    ],
    onFilter: (value, record) => record.is_active === value,
  },
  {
    title: "Action",
    key: "action",
    render: (_, dataId ) => (
      <Space>
        <Button onClick={() => navigate(`/edit-item/${dataId.id}`)}>EDIT</Button>
        <Button onClick={() => 
          deleteItem(dataId.id)} type="primary" >DELETE</Button>
      </Space>
    ),
  },
];

  const deleteItem = async (deleted: string) => {
  const validate = localStorage.getItem('token');
  const apiUrl = `https://mock-api.arikmpt.com/api/category/${deleted}`;
  const fetching = await fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${validate}`
                }
            }); 
if (fetching.ok) { 
  Swal.fire({
          icon: 'success',
          title: 'Successfully deleted',
          text: 'Successfully deleted',
        });
        fetchData()
      } 
} 

  return (
    <Card style={{ padding: "20px" }}>
      <Form.Item>
        <Button
          type="primary"
          className="login-link"
          onClick={() => navigate('/add-item')}
          style={{ marginRight: "550px" }}
        >
          Add New Category
        </Button>
        <Button type="primary" className="login-link" onClick={() => navigate('/')}>
          Logout
        </Button>
      </Form.Item>
      
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 5,
            total: data.length,
          }}
          style={{ width: "800px"}}
        />
      
    </Card>
  );
};

export default TableForm;
