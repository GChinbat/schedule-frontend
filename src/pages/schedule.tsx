import Head from 'next/head';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '@/api/withApollo';
import { GET_SCHEDULE } from '@/api/schedule';

import { Layout, Button } from 'antd';
import Schedule from '@/widgets/Schedule';
import AddScheduleItemModal from '@/modals/AddScheduleItem';
import EditScheduleItemModal from '@/modals/EditScheduleItem';

import { useLoginCheck } from '@/hooks/useLoginCheck';
import { EditScheduleStateProvider } from '@/hooks/EditScheduleState';

const Content = styled(Layout.Content)`
  padding: 0 50px;
  margin-top: 10px;
`;

function Home() {
  const { data, loading, refetch } = useQuery(GET_SCHEDULE);
  const [addingSchedule, setAddingSchedule] = useState(false);
  useLoginCheck();

  return (
    <EditScheduleStateProvider>
      <Head>
        <title>Schedule</title>
      </Head>
      <Content>
        <Button type="primary" onClick={() => setAddingSchedule(true)}>
          Хуваарийн хичээл нэмэх
        </Button>
        <Schedule
          loading={loading}
          refetch={refetch}
          schedule={data?.schedule}
        />
      </Content>
      <AddScheduleItemModal
        show={addingSchedule}
        refetch={refetch}
        setModalState={setAddingSchedule}
      />
      <EditScheduleItemModal refetch={refetch} />
    </EditScheduleStateProvider>
  );
}

export default withApollo({ ssr: true })(Home);
