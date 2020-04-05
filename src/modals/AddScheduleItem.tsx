import to from 'await-to-js';
import React, { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Form, Modal, Skeleton, notification } from 'antd';

import {
  Time,
  ADD_SCHEDULE_ITEM,
  GET_LESSONS_AND_GROUPS,
} from '@/api/schedule';

import ScheduleItemForm from '@/forms/ScheduleItem';

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

  const onSubmit = useCallback(async () => {
    const [err, formData] = await to(form.validateFields());
    if (err) return;

    const { day, endTime, startTime, groupSlug } = formData;
    const [submitError] = await to(
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
    );
    if (submitError) {
      notification.error({
        message: 'Алдаа гарлаа',
        description: submitError.message,
      });
      return;
    }

    refetch();
    form.resetFields();
    setModalState(false);
    notification.success({ message: 'Амжилттай' });
  }, [form, addScheduleItem, refetch]);

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
      onOk={onSubmit}
      visible={show}
      confirmLoading={mutating}
      onCancel={() => setModalState(false)}
    >
      <ScheduleItemForm form={form} lessons={data} />
    </Modal>
  );
}

export default AddScheduleItemModal;
