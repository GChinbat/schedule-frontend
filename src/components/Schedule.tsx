import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Tabs, Table } from 'antd';

import { GET_SCHEDULE, ScheduleEntry } from '@/api/schedule';

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
  teachers: entry.lessonGroup.lesson.teachers,
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

const days = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан'];
function Schedule() {
  const { data, loading } = useQuery(GET_SCHEDULE);

  return (
    <Tabs defaultActiveKey={days[0]} tabPosition="top">
      {days.map((day, i) => (
        <TabPane tab={day} key={day}>
          <Table
            loading={loading}
            columns={columns}
            dataSource={data?.schedule[i].map(processScheduleEntry)}
          />
        </TabPane>
      ))}
    </Tabs>
  );
}

export default Schedule;
