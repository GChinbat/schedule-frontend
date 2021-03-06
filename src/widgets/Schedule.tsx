import React, { useMemo } from 'react';
import { Tabs, Table } from 'antd';

import { daysOfWeek } from '@/util';
import { ScheduleEntry } from '@/api/schedule';

import Group from '@/components/Group';
import Teacher from '@/components/Teacher';

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
  group: entry.lessonGroup,
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
    render: (group) => <Group name={group.groupName} slug={group.slug} />,
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
    render: (teachers) =>
      teachers.map((teacher) => <Teacher key={teacher} name={teacher} />),
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
  const tableData = useMemo(() => {
    if (!schedule) return;
    return schedule.map((dayData) => dayData.map(processScheduleEntry));
  }, [schedule]);

  return (
    <Tabs defaultActiveKey={daysOfWeek[0]} tabPosition="top">
      {daysOfWeek.map((day, i) => (
        <TabPane tab={day} key={day}>
          <Table
            scroll={{ x: true }}
            loading={loading}
            columns={columns}
            dataSource={tableData?.[i]}
          />
        </TabPane>
      ))}
    </Tabs>
  );
}

export default Schedule;
