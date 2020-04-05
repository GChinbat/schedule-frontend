import Head from 'next/head';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { Layout, Skeleton, Button } from 'antd';

import { withApollo } from '@/api/withApollo';
import { GET_LESSONS, Lesson } from '@/api/lessons';

import LessonItem from '@/widgets/LessonItem';
import AddLessonModal from '@/modals/AddLesson';

import { useLoginCheck } from '@/hooks/useLoginCheck';

const Content = styled(Layout.Content)`
  padding: 10px 50px 0 50px;
  background-color: white;
`;

function Lessons() {
  const { data, loading, refetch } = useQuery(GET_LESSONS);
  const [addingLesson, setAddingLesson] = useState(false);
  useLoginCheck();

  if (loading)
    return (
      <Content>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </Content>
    );

  return (
    <>
      <Head>
        <title>Lessons</title>
      </Head>
      <Content>
        <Button type="primary" onClick={() => setAddingLesson(true)}>
          Хичээл нэмэх
        </Button>
        {data.getLessons.map((lesson: Lesson) => (
          <LessonItem key={lesson.slug} lesson={lesson} refetch={refetch} />
        ))}
        <AddLessonModal
          show={addingLesson}
          refetch={refetch}
          setModalState={setAddingLesson}
        />
      </Content>
    </>
  );
}

export default withApollo({ ssr: true })(Lessons);
