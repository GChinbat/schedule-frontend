import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Form, Modal, Select, Skeleton, TimePicker, notification } from 'antd';

import { daysOfWeek } from '@/util';
import {
  Time,
  ADD_SCHEDULE_ITEM,
  GET_LESSONS_AND_GROUPS,
} from '@/api/schedule';

import GroupSelector from '@/components/GroupSelector';

const { Option } = Select;

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
          <GroupSelector data={data} />
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
