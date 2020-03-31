import App from 'next/app';
import React from 'react';
import styled from 'styled-components';

import Navigation from '@/components/Navigation';
import { Layout } from 'antd';

const Container = styled(Layout)`
  min-height: 100vh;
  flex-direction: column;
`;
const Content = styled(Layout.Content)`
  padding: 0 50px;
  margin-top: 10px;
`;

export default class ReactApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Navigation />
        <Content>
          <Component {...pageProps} />
        </Content>
      </Container>
    );
  }
}
