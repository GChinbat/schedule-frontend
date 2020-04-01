import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Modal, Input, Form, notification } from 'antd';

import { ADD_GROUP } from '@/api/lessons';

function AddGroupModal({
  show,
  refetch,
  lessonSlug,
  setModalState,
}: {
  show: boolean;
  refetch: () => void;
  lessonSlug: string;
  setModalState: (stateValue: boolean) => void;
}) {
  const [form] = Form.useForm();
  const [addGroup, { loading }] = useMutation(ADD_GROUP);
  return (
    <Modal
      title="Бүлэг нэмэх"
      onOk={() => {
        form
          .validateFields()
          .then(({ name }) =>
            addGroup({
              variables: {
                group: {
                  lessonSlug,
                  groupName: name,
                },
              },
            }),
          )
          .then(() => form.resetFields())
          .then(() => setModalState(false))
          .then(refetch)
          .then(() => notification.success({ message: 'Амжилттай' }))
          .catch((err: Error) =>
            notification.error({
              message: 'Алдаа гарлаа',
              description: err.message,
            }),
          );
      }}
      visible={show}
      confirmLoading={loading}
      onCancel={() => setModalState(false)}
    >
      <Form labelCol={{ span: 7 }} form={form} name="add-group">
        <Form.Item name="name" label="Бүлгийн нэр" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddGroupModal;
