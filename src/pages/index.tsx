import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '@/api/withApollo';
import { GET_SCHEDULE } from '@/api/schedule';

import Schedule from '@/widgets/Schedule';

const Content = styled(Layout.Content)`
  padding: 0 50px;
  margin-top: 10px;
`;

function Home() {
  const { data, loading } = useQuery(GET_SCHEDULE);
  return (
    <>
      <Head>
        <title>Schedule</title>
      </Head>
      <Content>
        <Schedule loading={loading} schedule={data?.schedule} />
      </Content>
    </>
  );
}

export default withApollo({ ssr: true })(Home);
