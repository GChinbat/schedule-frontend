import to from 'await-to-js';
import React, { useContext, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Modal, Input, Form, notification } from 'antd';

import { ADD_GROUP } from '@/api/lessons';
import { AddGroupContext } from '@/hooks/AddGroupState';

function AddGroupModal({ refetch }: { refetch: () => void }) {
  const [form] = Form.useForm();

  const { lessonSlug, setLessonSlug } = useContext(AddGroupContext);
  const [addGroup, { loading }] = useMutation(ADD_GROUP);

  const submit = useCallback(async () => {
    const [err, formValues] = await to(form.validateFields());
    if (err) return;

    const { name } = formValues;
    const [addGroupErr] = await to(
      addGroup({
        variables: {
          group: {
            lessonSlug,
            groupName: name,
          },
        },
      }),
    );
    if (addGroupErr) {
      notification.error({
        message: 'Алдаа гарлаа',
        description: addGroupErr.message,
      });
      return;
    }

    form.resetFields();
    refetch();
    setLessonSlug(null);
    notification.success({ message: 'Амжилттай' });
  }, [addGroup, refetch, setLessonSlug, lessonSlug]);

  return (
    <Modal
      title="Бүлэг нэмэх"
      onOk={submit}
      visible={!!lessonSlug}
      confirmLoading={loading}
      onCancel={() => setLessonSlug(null)}
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
