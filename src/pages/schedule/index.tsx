import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import { withApollo } from '@/api/withApollo';

import { Layout } from 'antd';
import Schedule from '@/components/Schedule';

const Content = styled(Layout.Content)`
  padding: 0 50px;
  margin-top: 10px;
`;

function Home() {
  return (
    <>
      <Head>
        <title>Schedule</title>
      </Head>
      <Content>
        <Schedule />
      </Content>
    </>
  );
}

export default withApollo({ ssr: true })(Home);
