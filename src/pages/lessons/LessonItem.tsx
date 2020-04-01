import React, { Fragment } from 'react';

import styled from 'styled-components';
import { Descriptions, Popconfirm, Button, Space, notification } from 'antd';

import { Lesson, REMOVE_LESSON } from '@/api/lessons';
import { useMutation } from '@apollo/react-hooks';

const Item = styled(Descriptions)`
  margin: 10px 0;
`;

function LessonItem({
  lesson,
  refetch,
}: {
  lesson: Lesson;
  refetch: () => void;
}) {
  const [removeLesson, { loading: removingLesson }] = useMutation(
    REMOVE_LESSON,
    {
      variables: { slug: lesson.slug },
    },
  );
  return (
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
            <Fragment key={group.slug}>
              <span>{group.groupName}</span>
              <br />
            </Fragment>
          ))}
        </Descriptions.Item>
      )}
      <Descriptions.Item label="Yйлдлүүд">
        <Space direction="vertical">
          <Popconfirm
            key="remove"
            title="Та устгаад итгэлтэй байна уу?"
            okText="Тийм"
            cancelText="Yгүй"
            onConfirm={() =>
              removeLesson()
                .catch((err: Error) =>
                  notification.error({
                    message: 'Алдаа гарлаа',
                    description: err.message,
                  }),
                )
                .then(refetch)
            }
          >
            <Button loading={removingLesson} type="primary" danger>
              Устгах
            </Button>
          </Popconfirm>
          <Button key="addTeacher" type="primary">
            Багш нэмэх
          </Button>
          <Button key="addGroup" type="primary">
            Хичээлийн бүлэг нэмэх
          </Button>
        </Space>
      </Descriptions.Item>
    </Item>
  );
}

export default LessonItem;
