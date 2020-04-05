import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { Form, Input, Button } from 'antd';

import { LOGIN } from '@/api/auth';
import { useRouter } from 'next/router';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login() {
  const router = useRouter();
  const [login, { data, loading }] = useLazyQuery(LOGIN);

  const onFinish = (formData) => {
    login({ variables: formData });
  };
  useEffect(() => {
    if (data?.login) {
      localStorage.setItem('token', data.login);
      router.push('/');
    }
  }, [data]);

  return (
    <Form {...layout} name="basic" onFinish={onFinish}>
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
