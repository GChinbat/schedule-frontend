import to from 'await-to-js';
import React, { useCallback, useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Form, Modal, Skeleton, notification } from 'antd';

import {
  Time,
  EDIT_SCHEDULE_ITEM,
  GET_LESSONS_AND_GROUPS,
} from '@/api/schedule';
import { EditScheduleContext } from '@/hooks/EditScheduleState';

import ScheduleItemForm from '@/forms/ScheduleItem';
import moment from 'moment';

function parseTime(time): Time {
  return {
    hours: time.hours(),
    minutes: time.minutes(),
  };
}

function EditScheduleItemModal({ refetch }: { refetch: () => void }) {
  const [form] = Form.useForm();
  const { loading, data } = useQuery(GET_LESSONS_AND_GROUPS);
  const [editScheduleItem, { loading: mutating }] = useMutation(
    EDIT_SCHEDULE_ITEM,
  );
  const { scheduleItem, setScheduleItem } = useContext(EditScheduleContext);

  const onSubmit = useCallback(async () => {
    const [err, formData] = await to(form.validateFields());
    if (err) return;

    const { day, endTime, startTime } = formData;
    const [submitError] = await to(
      editScheduleItem({
        variables: {
          id: scheduleItem.id,
          item: {
            day,
            endTime: parseTime(endTime),
            startTime: parseTime(startTime),
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
    setScheduleItem(null);
    notification.success({ message: 'Амжилттай' });
  }, [form, editScheduleItem, refetch, scheduleItem]);

  useEffect(() => {
    if (!scheduleItem) return;
    form.setFieldsValue({
      day: scheduleItem.day,
      groupSlug: scheduleItem.lessonGroup.slug,
      startTime: moment(scheduleItem.startTime),
      endTime: moment(scheduleItem.endTime),
    });
  }, [scheduleItem]);

  if (loading) {
    return (
      <Modal
        title="Хуваарь засах"
        visible={!!scheduleItem}
        onCancel={() => setScheduleItem(null)}
      >
        <Form labelCol={{ span: 7 }} form={form} name="edit-schedule-item">
          <Skeleton active />
        </Form>
      </Modal>
    );
  }

  return (
    <Modal
      title="Хуваарь засах"
      onOk={onSubmit}
      visible={!!scheduleItem}
      onCancel={() => setScheduleItem(null)}
      confirmLoading={mutating}
    >
      {scheduleItem && <ScheduleItemForm form={form} lessons={data} />}
    </Modal>
  );
}

export default EditScheduleItemModal;
