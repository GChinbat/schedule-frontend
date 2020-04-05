import React from 'react';

import styled from 'styled-components';
import { Descriptions } from 'antd';

import { Lesson } from '@/api/lessons';

import Group from '@/components/Group';

const Item = styled(Descriptions)`
  margin: 10px 0;
`;

function LessonItem({ lesson }: { lesson: Lesson }) {
  return (
    <>
      <Item
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
              <Group
                key={group.slug}
                name={group.groupName}
                slug={group.slug}
              />
            ))}
          </Descriptions.Item>
        )}
      </Item>
    </>
  );
}

export default LessonItem;
