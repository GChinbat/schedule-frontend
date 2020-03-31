import React from 'react';
import styled from 'styled-components';

import { Layout, Menu } from 'antd';

const Header = styled(Layout.Header)`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 20px;
`;

function Navigation() {
  return (
    <Header>
      <Logo src="/assets/logo.png" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Хуваарь</Menu.Item>
        <Menu.Item key="2">Хичээлүүд</Menu.Item>
      </Menu>
    </Header>
  );
}

export default Navigation;
