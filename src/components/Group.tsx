import Link from 'next/link';
import React from 'react';
import { Tag } from 'antd';

function Group({ name, slug }: { name: string; slug: string }) {
  return (
    <Tag style={{ cursor: 'pointer' }}>
      <Link href={`/group/${slug}`}>{name}</Link>
    </Tag>
  );
}

export default Group;
