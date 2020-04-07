import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '@/api/withApollo';
import { GET_SCHEDULE_FOR_GROUP } from '@/api/schedule';

import { Layout } from 'antd';
import Schedule from '@/widgets/Schedule';

const Content = styled(Layout.Content)`
  padding: 0 30px;
  margin-top: 10px;
`;

function Home() {
  const router = useRouter();
  const { data, loading } = useQuery(GET_SCHEDULE_FOR_GROUP, {
    variables: { groupSlug: router.query.slug },
  });

  return (
    <>
      <Head>
        <title>Schedule</title>
      </Head>
      <Content>
        <Schedule loading={loading} schedule={data?.scheduleForGroup} />
      </Content>
    </>
  );
}

export default withApollo({ ssr: true })(Home);
