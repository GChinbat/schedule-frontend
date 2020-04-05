import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';
import { Form, Input, Button, Layout, notification } from 'antd';

import { LOGIN } from '@/api/auth';

import { withApollo } from '@/api/withApollo';

const Content = styled(Layout.Content)`
  padding: 0 50px;
  margin: 30px;
`;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function LoginPage() {
  const router = useRouter();
  const [login, { data, loading, error }] = useLazyQuery(LOGIN);

  const onFinish = (formData) => {
    login({ variables: formData });
  };
  useEffect(() => {
    if (data?.login) {
      localStorage.setItem('token', data.login);
      router.push('/');
    }
  }, [data]);
  useEffect(() => {
    if (!error) return;
    notification.error({
      message: 'Алдаа гарлаа',
      description: error.message,
    });
  }, [error]);

  return (
    <Content>
      <Form {...layout} name="login" onFinish={onFinish}>
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
    </Content>
  );
}

export default withApollo({ ssr: true })(LoginPage);
