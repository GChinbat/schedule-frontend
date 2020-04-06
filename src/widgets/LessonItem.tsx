import React, { useState } from 'react';

import styled from 'styled-components';
import { Descriptions, Button, Space, notification } from 'antd';

import { useMutation } from '@apollo/react-hooks';
import { Lesson, REMOVE_LESSON } from '@/api/lessons';

import AddGroupModal from '@/modals/AddGroup';

import Group from '@/components/Group';
import Teacher from '@/components/Teacher';
import RemoveButton from '@/components/RemoveButton';

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
            {lesson.teachers.map((teacher) => (
              <Teacher name={teacher} />
            ))}
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
            <RemoveButton
              loading={removingLesson}
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
            />
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
