import React from 'react';
import { Form, Select, TimePicker } from 'antd';

import { FormInstance } from 'antd/lib/form';

import { Lesson } from '@/api/lessons';
import { daysOfWeek } from '@/util';

import GroupSelector from '@/components/GroupSelector';

const { Option } = Select;

function ScheduleItemForm({
  form,
  lessons,
}: {
  form: FormInstance;
  lessons: Lesson[];
}) {
  return (
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
