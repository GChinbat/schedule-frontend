import React, { useMemo } from 'react';
import { TreeSelect } from 'antd';
import { TreeSelectProps } from 'antd/lib/tree-select';

import { Lesson } from '@/api/lessons';

function parseTreeData(data) {
  if (!data) return null;
  return data.getLessons.map((lesson: Lesson) => ({
    title: lesson.name,
    value: lesson.slug,
    selectable: false,
    children: lesson.groups.map((group) => ({
      title: `${lesson.name} - ${group.groupName}`,
      value: group.slug,
    })),
  }));
}

function GroupSelector({
  data,
  ...props
}: { data: Lesson[] } & TreeSelectProps<any>) {
  const treeData = useMemo(() => parseTreeData(data), [data]);

  return (
    <TreeSelect
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={treeData}
      {...props}
    />
  );
}

export default GroupSelector;
