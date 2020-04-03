import React from 'react';
import styled from 'styled-components';
import { Tabs, Layout } from 'antd';

import Login from '@/components/Login';
import Register from '@/components/Register';

const { TabPane } = Tabs;

const Content = styled(Layout.Content)`
  padding: 0 50px;
  margin-top: 10px;
`;

function LoginPage() {
  return (
    <Content>
      <Tabs defaultActiveKey="login" tabPosition="top">
        <TabPane key="login" tab="Нэвтрэх">
          <Login />
        </TabPane>
        <TabPane key="register" tab="Бүртгүүлэх">
          <Register />
        </TabPane>
      </Tabs>
    </Content>
  );
}

export default LoginPage;
  