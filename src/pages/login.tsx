import React from 'react';
import { Tabs } from 'antd';

import Login from '@/components/Login';
import Register from '@/components/Register';

const { TabPane } = Tabs;

function LoginPage() {
  return (
    <Tabs defaultActiveKey="login" tabPosition="top">
      <TabPane key="login" tab="Нэвтрэх">
        <Login />
      </TabPane>
      <TabPane key="register" tab="Бүртгүүлэх">
        <Register />
      </TabPane>
    </Tabs>
  );
}

export default LoginPage;
