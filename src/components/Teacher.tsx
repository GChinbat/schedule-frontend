import Link from 'next/link';
import React from 'react';
import { Tag } from 'antd';

function Teacher({ name }: { name: string }) {
  return (
    <Tag style={{ cursor: 'pointer' }}>
      <Link href={`/teacher/${name}`}>
        <a>{name}</a>
      </Link>
    </Tag>
  );
}

export default Teacher;
