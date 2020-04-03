import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { Form, Input, Button } from 'antd';

import { LOGIN } from '@/api/auth';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login() {
  const [login, { data, loading }] = useLazyQuery(LOGIN);

  const onFinish = (formData) => {
    login({ variables: formData });
  };
  const onFinishFailed = console.warn;

  return (
    <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Нэвтрэх нэр"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Нууц үг"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button loading={loading} type="primary" htmlType="submit">
          Нэвтрэх
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
