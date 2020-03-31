import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
  console.log(router.pathname);
  return (
    <Header>
      <Logo src="/assets/logo.png" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[router.pathname]}
      >
        <Menu.Item key="/">
          <Link href="/">
            <a>Хуваарь</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/lessons">
          <Link href="/lessons">
            <a>Хичээлүүд</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Navigation;
