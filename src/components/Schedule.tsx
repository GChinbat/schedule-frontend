import React from 'react';
import { Tabs, Table } from 'antd';

import { daysOfWeek } from '@/util';
import { ScheduleEntry } from '@/api/schedule';

function formatTime({ startTime, endTime }: ScheduleEntry) {
  return `${startTime.hours}:${startTime.minutes
    .toString()
    .padStart(2, '0')} - ${endTime.hours}:${endTime.minutes
    .toString()
    .padStart(2, '0')}`;
}
const processScheduleEntry = (entry: ScheduleEntry) => ({
  time: formatTime(entry),
  slug: `${entry.lessonGroup.slug}-${formatTime(entry)}`,
  group: entry.lessonGroup.groupName,
  lesson: entry.lessonGroup.lesson.name,
  teachers: entry.lessonGroup.lesson.teachers.join(', '),
});

const columns = [
  {
    title: 'Хичээл',
    dataIndex: 'lesson',
    key: 'lesson',
  },
  {
    title: 'Бүлэг',
    dataIndex: 'group',
    key: 'group',
  },
  {
    title: 'Орох цаг',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Багш',
    dataIndex: 'teachers',
    key: 'teachers',
  },
];

const { TabPane } = Tabs;

function Schedule({
  schedule,
  loading,
}: {
  schedule?: ScheduleEntry[][];
  loading: boolean;
}) {
  return (
    <Tabs defaultActiveKey={daysOfWeek[0]} tabPosition="top">
      {daysOfWeek.map((day, i) => (
        <TabPane tab={day} key={day}>
          <Table
            scroll={{ x: true }}
            loading={loading}
            columns={columns}
            dataSource={schedule?.[i].map(processScheduleEntry)}
          />
        </TabPane>
      ))}
    </Tabs>
  );
}

export default Schedule;
