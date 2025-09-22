'use client';

import {
  Form,
  Input,
  Select,
  Checkbox,
  DatePicker,
  Button,
  Descriptions,
  Tag,
  message,
} from 'antd';
import { useState, useEffect } from 'react';

const { Option } = Select;
const extracurricularOptions = ['Basketball', 'Music', 'Dance', 'Photography', 'Futsal'];

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState(null);
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    if (editId) {
      const students = JSON.parse(localStorage.getItem('students')) || [];
      const studentToEdit = students.find((s) => s.id === Number(editId));
      if (studentToEdit) {
        setEditStudent(studentToEdit);
        form.setFieldsValue({
          fullName: studentToEdit.fullName,
          class: studentToEdit.class,
          extracurricular: studentToEdit.extracurricular,
          birthDate: dayjs(studentToEdit.birthDate),
        });
      }
    }
  }, [form]);

  const onFinish = async (values) => {
    try {
      const existing = JSON.parse(localStorage.getItem('students')) || [];

      if (editStudent) {
        const updatedStudent = {
          ...editStudent,
          ...values,
          birthDate: values.birthDate?.format('YYYY-MM-DD'),
        };

        const updatedList = existing.map((student) =>
          student.id === editStudent.id ? updatedStudent : student
        );

        localStorage.setItem('students', JSON.stringify(updatedList));
        message.success('Student updated successfully');
        setSubmittedData(updatedStudent);
        setEditStudent(null);
      } else {
        const maxId =
          existing.length === 0
            ? 0
            : existing.reduce((max, student) => Math.max(max, student.id || 0), 0);

        const newStudent = {
          ...values,
          birthDate: values.birthDate?.format('YYYY-MM-DD'),
          id: maxId + 1,
        };

        const updatedData = [...existing, newStudent];
        localStorage.setItem('students', JSON.stringify(updatedData));
        setSubmittedData(newStudent);
        message.success('Student added successfully');
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      form.resetFields();
    } catch (error) {
      console.error('Error saving student data:', error);
      message.error('Something went wrong');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1 }}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="class" label="Class" rules={[{ required: true }]}>
            <Select placeholder="Select class">
              <Option value="10-RPL">10-RPL</Option>
              <Option value="10-Akuntansi">10-Akuntansi</Option>
              <Option value="10-DKV">10-DKV</Option>
              <Option value="11-RPL">11-RPL</Option>
              <Option value="11-Akuntansi">11-Akuntansi</Option>
              <Option value="11-DKV">11-DKV</Option>
              <Option value="12-RPL">12-RPL</Option>
              <Option value="12-Akuntansi">12-Akuntansi</Option>
              <Option value="12-DKV">12-DKV</Option>
            </Select>
          </Form.Item>

          <Form.Item name="extracurricular" label="Extracurricular" rules={[{ required: true }]}>
            <Checkbox.Group options={extracurricularOptions} />
          </Form.Item>

          <Form.Item name="birthDate" label="Birth Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editStudent ? 'Update' : 'Register'}
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div style={{ flex: 1 }}>
        <h3>{editStudent ? 'Editing Student:' : 'Submitted Preview:'}</h3>
        {submittedData ? (
          <Descriptions bordered title="Student Information" size="small" column={1}>
            <Descriptions.Item label="Full Name">{submittedData.fullName}</Descriptions.Item>
            <Descriptions.Item label="Class">{submittedData.class}</Descriptions.Item>
            <Descriptions.Item label="Birth Date">{submittedData.birthDate}</Descriptions.Item>
            <Descriptions.Item label="Extracurricular">
              {submittedData.extracurricular?.map((activity) => (
                <Tag key={activity} color="blue" style={{ marginBottom: 4 }}>
                  {activity}
                </Tag>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="ID">{submittedData.id}</Descriptions.Item>
          </Descriptions>
        ) : (
          <p>No data submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
