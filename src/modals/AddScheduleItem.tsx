import React, { useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import {
  Form,
  Modal,
  Select,
  Skeleton,
  TreeSelect,
  TimePicker,
  notification,
} from 'antd';

import { daysOfWeek } from '@/util';

import { Lesson } from '@/api/lessons';
import {
  ADD_SCHEDULE_ITEM,
  GET_LESSONS_AND_GROUPS,
  Time,
} from '@/api/schedule';

const { Option } = Select;

function parseTreeData(data) {
  if (!data) return null;
  return data.getLessons.map((lesson: Lesson) => ({
    title: lesson.name,
    value: lesson.slug,
    selectable: false,
    children: lesson.groups.map((group) => ({
      title: `${lesson.name} - ${group.groupName}`,
      value: group.slug,
    })),
  }));
}

function parseTime(time): Time {
  return {
    hours: time.hours(),
    minutes: time.minutes(),
  };
}

function AddScheduleItemModal({
  show,
  refetch,
  setModalState,
}: {
  show: boolean;
  refetch: () => void;
  setModalState: (stateValue: boolean) => void;
}) {
  const [form] = Form.useForm();
  const { loading, data } = useQuery(GET_LESSONS_AND_GROUPS);
  const [addScheduleItem, { loading: mutating }] = useMutation(
    ADD_SCHEDULE_ITEM,
  );

  const treeData = useMemo(() => parseTreeData(data), [data]);

  if (loading) {
    return (
      <Modal
        title="Хуваарийн хичээл нэмэх"
        visible={show}
        onCancel={() => setModalState(false)}
      >
        <Form labelCol={{ span: 7 }} form={form} name="add-schedule-item">
          <Skeleton active />
        </Form>
      </Modal>
    );
  }

  return (
    <Modal
      title="Хуваарийн хичээл нэмэх"
      onOk={() => {
        form
          .validateFields()
          .then((obj) => {
            console.log(obj);
            return obj;
          })
          .then(({ day, endTime, startTime, groupSlug }) =>
            addScheduleItem({
              variables: {
                item: {
                  day,
                  endTime: parseTime(endTime),
                  startTime: parseTime(startTime),
                  groupSlug,
                },
              },
            }),
          )
          .then(() => form.resetFields())
          .then(() => setModalState(false))
          .then(refetch)
          .then(() => notification.success({ message: 'Амжилттай' }))
          .catch((err: Error) =>
            notification.error({
              message: 'Алдаа гарлаа',
              description: err.message,
            }),
          );
      }}
      visible={show}
      confirmLoading={mutating}
      onCancel={() => setModalState(false)}
    >
      <Form labelCol={{ span: 7 }} form={form} name="add-schedule-item">
        <Form.Item name="day" label="Өдөр" rules={[{ required: true }]}>
          <Select>
            {daysOfWeek.map((day, i) => (
              <Option key={day} value={i + 1}>
                {day}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="groupSlug"
          label="Хичээлийн бүлэг"
          rules={[{ required: true }]}
        >
          <TreeSelect
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
          />
        </Form.Item>
        <Form.Item
          name="startTime"
          label="Эхлэх цаг"
          rules={[{ required: true }]}
        >
          <TimePicker format="HH:mm" />
        </Form.Item>
        <Form.Item
          name="endTime"
          label="Дуусах цаг"
          rules={[{ required: true }]}
        >
          <TimePicker format="HH:mm" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddScheduleItemModal;
