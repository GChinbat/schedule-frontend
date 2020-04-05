import React, { useContext, useMemo } from 'react';
import { Tabs, Table, Space, Button } from 'antd';

import { daysOfWeek } from '@/util';
import { ScheduleEntry } from '@/api/schedule';
import { EditScheduleContext } from '@/hooks/EditScheduleState';

import Group from '@/components/Group';
import { LessonGroup } from '@/api/lessons';

function formatTime({ startTime, endTime }: ScheduleEntry) {
  return `${startTime.hours}:${startTime.minutes
    .toString()
    .padStart(2, '0')} - ${endTime.hours}:${endTime.minutes
    .toString()
    .padStart(2, '0')}`;
}

export type TableScheduleEntry = {
  time: string;
  slug: string;
  group: {
    slug: string;
    groupName: string;
    lesson: {
      name: string;
      teachers: string[];
    };
  };
  lesson: string;
  teachers: string;
  entry: ScheduleEntry & { id: string; day: number };
};
const processScheduleEntry = (day: number) => (
  entry: ScheduleEntry,
): Omit<TableScheduleEntry, 'day'> => ({
  time: formatTime(entry),
  slug: `${entry.lessonGroup.slug}-${formatTime(entry)}`,
  group: entry.lessonGroup,
  lesson: entry.lessonGroup.lesson.name,
  teachers: entry.lessonGroup.lesson.teachers.join(', '),
  entry: { ...entry, id: entry.id, day },
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
  },
  {
    title: 'Yйлдлүүд',
    dataIndex: 'actions',
    render: (
      _,
      {
        actions: { edit },
        entry,
      }: TableScheduleEntry & { actions: { edit: Function } },
    ) => (
      <Space direction="vertical">
        <Button block type="primary" onClick={() => edit(entry)}>
          Засах
        </Button>
        <Button block type="primary" danger>
          Устгах
        </Button>
      </Space>
    ),
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
  const { setScheduleItem } = useContext(EditScheduleContext);
  const tableData = useMemo(() => {
    if (!schedule) return;
    return schedule.map((dayData, i) =>
      dayData.map(processScheduleEntry(i + 1)).map((entry) => ({
        ...entry,
        actions: {
          edit: setScheduleItem,
        },
      })),
    );
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
