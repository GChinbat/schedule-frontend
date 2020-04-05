import React from 'react';
import { Moment } from 'moment';
import { Form, Select, TimePicker } from 'antd';

import { FormInstance } from 'antd/lib/form';

import { Lesson } from '@/api/lessons';
import { daysOfWeek } from '@/util';

import GroupSelector from '@/components/GroupSelector';

const { Option } = Select;

function ScheduleItemForm({
  form,
  lessons,
  initialValues,
}: {
  form: FormInstance;
  lessons: Lesson[];
  initialValues?: {
    day: number;
    groupSlug: string;
    startTime: Moment;
    endTime: Moment;
  };
}) {
  return (
    <Form
      name="add-schedule-item"
      form={form}
      labelCol={{ span: 7 }}
      initialValues={initialValues}
    >
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
        <GroupSelector data={lessons} />
      </Form.Item>
      <Form.Item
        name="startTime"
        label="Эхлэх цаг"
        rules={[{ required: true }]}
      >
        <TimePicker format="HH:mm" />
      </Form.Item>
      <Form.Item name="endTime" label="Дуусах цаг" rules={[{ required: true }]}>
        <TimePicker format="HH:mm" />
      </Form.Item>
    </Form>
  );
}

export default ScheduleItemForm;
