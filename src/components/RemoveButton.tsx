import React from 'react';
import { Popconfirm, Button } from 'antd';

export type RemoveButtonProps = {
  loading: boolean;
  onConfirm: () => void;
};
function RemoveButton({ loading, onConfirm }: RemoveButtonProps) {
  return (
    <Popconfirm
      title="Та устгахад итгэлтэй байна уу?"
      okText="Тийм"
      cancelText="Yгүй"
      onConfirm={onConfirm}
    >
      <Button loading={loading} block type="primary" danger>
        Устгах
      </Button>
    </Popconfirm>
  );
}

export default RemoveButton;
