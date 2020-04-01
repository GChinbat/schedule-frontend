import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { Layout, Descriptions, Skeleton } from 'antd';

import { withApollo } from '@/api/withApollo';
import { GET_LESSONS, Lesson } from '@/api/lessons';

const Content = styled(Layout.Content)`
  padding: 10px 50px 0 50px;
  background-color: white;
`;

const LessonItem = styled(Descriptions)`
  margin: 10px 0;
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
    <Content>
      {data.getLessons.map((lesson: Lesson) => (
        <LessonItem
          key={lesson.slug}
          title={lesson.name}
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          {lesson.teachers.length > 0 && (
            <Descriptions.Item
              label={lesson.teachers.length === 1 ? 'Багш' : 'Багш нар'}
            >
              {lesson.teachers.join(', ')}
            </Descriptions.Item>
          )}
          {lesson.groups.length > 0 && (
            <Descriptions.Item label="Бүлгүүд">
              {lesson.groups.map((group) => (
                <Fragment key={group.slug}>
                  <span>{group.groupName}</span>
                  <br />
                </Fragment>
              ))}
            </Descriptions.Item>
          )}
        </LessonItem>
      ))}
    </Content>
  );
}

export default withApollo({ ssr: true })(Lessons);
