import React from 'react';
import './index.css';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['Dashboard', 'Profile', 'Settings'].map(
  (label, index) => ({
    key: String(index + 1),
    label,
  })
);

const items2: MenuProps['items'] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);
  const sideBar = ['Manage Users', 'Manage Category', 'Manage Products'];

  const subMenuLabels = [
    ['Add User', 'User List'],
    ['Add Category', 'Category List'],
    ['Add Product', 'Product List'],
  ];

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: sideBar[index],

    children: subMenuLabels[index].map((label, j) => {
      return {
        key: `${key}-${j + 1}`,
        label: label,
      };
    }),
  };
});


const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      {/* Header Section - Top Navigation Bar */}
      <Header style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
        <div className="demo-logo">
          <img
            style={{ width: 80, height: 85, marginTop: 5 }}
            src="https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?t=st=1733122898~exp=1733126498~hmac=ea1b005194637a0a512e20107c6f6f4140bf9a9808eb4e00fa206a1b96e5e2d8w=740"
            alt="Logo"
          />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>

      {/* Content Section */}
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Sidebar Section */}
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
            />
          </Sider>

          {/* Main Content */}
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            Content goes here...
          </Content>
        </Layout>
      </Content>

      {/* Footer Section */}
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
