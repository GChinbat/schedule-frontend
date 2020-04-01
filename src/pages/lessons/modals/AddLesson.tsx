import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Modal, Input, Form, notification } from 'antd';

import { ADD_LESSON } from '@/api/lessons';

function AddLessonModal({
  show,
  refetch,
  setModalState,
}: {
  show: boolean;
  refetch: () => void;
  setModalState: (stateValue: boolean) => void;
}) {
  const [form] = Form.useForm();
  const [addLesson, { loading }] = useMutation(ADD_LESSON);
  return (
    <Modal
      title="Хичээл нэмэх"
      onOk={() => {
        form
          .validateFields()
          .then(({ name, teachers }) =>
            addLesson({
              variables: {
                lesson: {
                  name,
                  teachers: teachers
                    .split(',')
                    .map((teacher) => teacher.trim()),
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
      <Form labelCol={{ span: 7 }} form={form} name="add-lesson">
        <Form.Item
          name="name"
          label="Хичээлийн нэр"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="teachers"
          label="Багш (нар)"
          rules={[{ required: true }]}
        >
          <Input placeholder="Олон байвал таслалаар тусгаарлаж бичнэ үү" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddLessonModal;
