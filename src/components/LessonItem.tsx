import React, { Fragment, useState } from 'react';

import styled from 'styled-components';
import { Descriptions, Popconfirm, Button, Space, notification } from 'antd';

import { useMutation } from '@apollo/react-hooks';
import { Lesson, REMOVE_LESSON } from '@/api/lessons';

import AddGroupModal from '@/modals/AddGroup';

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
  const [addingGroup, setAddingGroup] = useState(false);

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
              <Fragment key={group.slug}>
                <span>{group.groupName}</span>
                <br />
              </Fragment>
            ))}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Yйлдлүүд">
          <Space direction="vertical">
            <Button key="addTeacher" type="primary" block>
              Багш нэмэх
            </Button>
            <Button
              key="addGroup"
              type="primary"
              block
              onClick={() => setAddingGroup(true)}
            >
              Бүлэг нэмэх
            </Button>
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
              <Button loading={removingLesson} block type="primary" danger>
                Устгах
              </Button>
            </Popconfirm>
          </Space>
        </Descriptions.Item>
      </Item>
      <AddGroupModal
        show={addingGroup}
        refetch={refetch}
        lessonSlug={lesson.slug}
        setModalState={setAddingGroup}
      />
    </>
  );
}

export default LessonItem;
