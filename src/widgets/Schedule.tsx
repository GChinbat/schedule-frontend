import React, { useContext, useMemo } from 'react';
import { Tabs, Table, Space, Button, notification } from 'antd';

import { daysOfWeek } from '@/util';
import { ScheduleEntry, REMOVE_SCHEDULE_ITEM } from '@/api/schedule';
import { EditScheduleContext } from '@/hooks/EditScheduleState';

import Group from '@/components/Group';
import Teacher from '@/components/Teacher';
import RemoveButton from '@/components/RemoveButton';
import { useMutation } from '@apollo/react-hooks';

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
  teachers: string[];
  entry: ScheduleEntry & { id: string; day: number };
};
const processScheduleEntry = (day: number) => (
  entry: ScheduleEntry,
): Omit<TableScheduleEntry, 'day'> => ({
  time: formatTime(entry),
  slug: `${entry.lessonGroup.slug}-${formatTime(entry)}`,
  group: entry.lessonGroup,
  lesson: entry.lessonGroup.lesson.name,
  teachers: entry.lessonGroup.lesson.teachers,
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
    render: (teachers) =>
      teachers.map((teacher) => <Teacher key={teacher} name={teacher} />),
  },
  {
    title: 'Yйлдлүүд',
    dataIndex: 'actions',
    render: (
      _,
      {
        actions: { edit, remove, removing },
        entry,
      }: TableScheduleEntry & {
        actions: {
          edit: (entry: ScheduleEntry) => void;
          remove: (entry: ScheduleEntry) => void;
          removing: boolean;
        };
      },
    ) => (
      <Space direction="vertical">
        <Button block type="primary" onClick={() => edit(entry)}>
          Засах
        </Button>
        <RemoveButton loading={removing} onConfirm={() => remove(entry)} />
      </Space>
    ),
  },
];

const { TabPane } = Tabs;

function Schedule({
  schedule,
  loading,
  refetch,
}: {
  schedule?: ScheduleEntry[][];
  loading: boolean;
  refetch: () => void;
}) {
  const [removeScheduleItem, { loading: mutating }] = useMutation(
    REMOVE_SCHEDULE_ITEM,
  );
  const { setScheduleItem } = useContext(EditScheduleContext);
  const tableData = useMemo(() => {
    if (!schedule) return;
    return schedule.map((dayData, i) =>
      dayData.map(processScheduleEntry(i + 1)).map((entry) => ({
        ...entry,
        actions: {
          edit: setScheduleItem,
          remove: (entryToBeRemoved: ScheduleEntry) =>
            removeScheduleItem({ variables: { id: entryToBeRemoved.id } })
              .then(refetch)
              .then(() => notification.success({ message: 'Амжилттай' }))
              .catch((err) =>
                notification.error({
                  message: 'Алдаа гарлаа',
                  description: err.message,
                }),
              ),
          removing: mutating,
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
