import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { Layout, Skeleton } from 'antd';

import { withApollo } from '@/api/withApollo';
import { GET_LESSONS, Lesson } from '@/api/lessons';

import LessonItem from './LessonItem';

const Content = styled(Layout.Content)`
  padding: 10px 50px 0 50px;
  background-color: white;
`;

function Lessons() {
  const { data, loading } = useQuery(GET_LESSONS);

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
        {data.getLessons.map((lesson: Lesson) => (
          <LessonItem key={lesson.slug} lesson={lesson} />
        ))}
      </Content>
    </>
  );
}

export default withApollo({ ssr: true })(Lessons);
