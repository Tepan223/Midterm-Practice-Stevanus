'use client';
import { Typography, Button, Divider } from 'antd';
import LayoutApp from './components/LayoutAPP';
export default function Dashboard() {
  return (
    <LayoutApp>
      <Typography.Title level={2} style={{ textAlign: 'center'}}>Welcome to the Dashboard</Typography.Title>
      <Divider />
      <div style={{ textAlign: 'center' }}>
        <Button type="primary" style={{ marginRight: 10 }} href='/register'>Register Student</Button>
        <Button href='/students'>View Students</Button>
      </div>
    </LayoutApp>
  );
}
