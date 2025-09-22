'use client';
import LayoutApp from '../components/LayoutAPP';
import { Breadcrumb } from 'antd';
import RegisterForm from '../components/RegisterForm';
export default function RegisterPage() {
  return (
    <LayoutApp>
      <h2>Register New Student</h2>
      <RegisterForm />
    </LayoutApp>
  );
}
