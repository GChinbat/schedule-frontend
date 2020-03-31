import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import List from '@bit/danilowoz.react-content-loader.list';
import { DataTable } from '@bit/grommet.grommet.data-table';

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
    header: 'Хичээл',
    property: 'lesson',
  },
  {
    header: 'Бүлэг',
    property: 'group',
  },
  {
    header: 'Орох цаг',
    property: 'time',
  },
  {
    header: 'Багш',
    property: 'teachers',
  },
];

const LoadingList = styled(List)`
  max-width: 400px;
  max-height: 200px;
`;

function Schedule() {
  const { data, loading } = useQuery(GET_SCHEDULE);
  return loading ? (
    <LoadingList />
  ) : (
    <DataTable
      data={data.schedule[0].map(processScheduleEntry)}
      columns={columns}
      primaryKey="slug"
    />
  );
}

export default Schedule;
