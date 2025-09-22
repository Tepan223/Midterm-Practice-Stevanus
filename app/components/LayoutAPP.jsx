'use client';
import { Layout, Menu, Breadcrumb } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const { Header, Content, Footer, Sider } = Layout;

const LayoutApp = ({ children }) => {
  const router = useRouter();
  const path = usePathname();

  const segments = path.split('/').filter(Boolean);

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link href="/">Dashboard</Link>
    </Breadcrumb.Item>,
    ...segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      return (
        <Breadcrumb.Item key={href}>
          <Link href={href}>{label}</Link>
        </Breadcrumb.Item>
      );
    }),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="80"
        style={{
          background: '#001529',
        }}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 6,
            textAlign: 'center',
            lineHeight: '64px',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          Student
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[path]}
          onClick={({ key }) => router.push(key)}
          items={[
            { key: '/', label: 'Dashboard' },
            { key: '/students', label: 'Student List' },
            { key: '/register', label: 'Register' },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <h1 style={{ margin: 0, fontSize: 20 }}>Student Management</h1>
        </Header>

        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Breadcrumb style={{ marginBottom: 16 }}>
            {breadcrumbItems}
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {children}
          </div>
        </Content>

        <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
          Student Dashboard ©2025 Created with Ant Design
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
