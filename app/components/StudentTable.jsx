'use client';
import { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, message, Modal, Form, Input, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

const classOptions = ['10-RPL','10-DKV','10-Akuntansi','11-RPL','11-DKV','11-Akuntansi','12-RPL','12-DKV','12-Akuntansi']; 
const extracurricularOptions = ['Basketball', 'Music', 'Dance', 'Photography', 'Futsal']; 

const StudentTable = () => {
  const [data, setData] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const stored = localStorage.getItem('students');
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (id) => {
    const updatedData = data.filter((student) => student.id !== id);
    localStorage.setItem('students', JSON.stringify(updatedData));
    setData(updatedData);
    message.success('Student deleted successfully');
  };

  const handleEdit = (record) => {
    setEditingStudent(record);
    form.setFieldsValue({
      fullName: record.fullName,
      class: record.class,
      extracurricular: record.extracurricular || '',
      birthDate: record.birthDate ? dayjs(record.birthDate) : null,
    });
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields()
      .then(values => {
        const updatedStudent = {
          ...editingStudent,
          fullName: values.fullName,
          class: values.class,
          extracurricular: values.extracurricular,
          birthDate: values.birthDate.format('YYYY-MM-DD'),
        };

        const updatedData = data.map(student =>
          student.id === updatedStudent.id ? updatedStudent : student
        );

        setData(updatedData);
        localStorage.setItem('students', JSON.stringify(updatedData));
        setIsModalVisible(false);
        setEditingStudent(null);
        message.success('Student updated successfully');
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingStudent(null);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },  
    { title: 'Name', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Class', dataIndex: 'class', key: 'class' },
    {
      title: 'Extracurricular',
      dataIndex: 'extracurricular',
      key: 'extracurricular',
      render: (activity) => activity || '-',
    },
    { title: 'Birth Date', dataIndex: 'birthDate', key: 'birthDate' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this student?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
      />

      <Modal
        title="Edit Student"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            fullName: '',
            class: '',
            extracurricular: '',
            birthDate: null,
          }}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please input the full name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Class"
            name="class"
            rules={[{ required: true, message: 'Please select a class!' }]}
          >
            <Select placeholder="Select class">
              {classOptions.map(cls => (
                <Option key={cls} value={cls}>{cls}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Extracurricular"
            name="extracurricular"
            rules={[{ required: true, message: 'Please select extracurricular!' }]}
          >
            <Select placeholder="Select extracurricular activity" allowClear>
              {extracurricularOptions.map(activity => (
                <Option key={activity} value={activity}>{activity}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Birth Date"
            name="birthDate"
            rules={[{ required: true, message: 'Please select birth date!' }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentTable;
