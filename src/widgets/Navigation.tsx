import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  return (
    <Header>
      <Logo src="/assets/logo.png" />
      <Menu
        mode="horizontal"
        theme="dark"
        onClick={({ key }) => router.push(key)}
        defaultSelectedKeys={router.pathname ? [router.pathname] : []}
      >
        <Menu.Item key="/">
          <span>Хуваарь</span>
        </Menu.Item>
        <Menu.Item key="/lessons">
          <span>Хичээлүүд</span>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Navigation;
