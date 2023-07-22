import { Button, Form, Input, message } from 'antd';
import { CreateUserBody } from '../../types/auth';
import React from 'react';
import { createNewUserApi } from '../../api/users';

interface Props {
  onSuccess: () => void;
}
export const UserCreateForm: React.FC<Props> = ({ onSuccess }) => {
  // <></>
  const [loader, setLoader] = React.useState(false);
  const body: CreateUserBody = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const submit = async (a: CreateUserBody) => {
    try {
      setLoader(true);
      const response = await createNewUserApi(a);
      console.log({ response });
      onSuccess();
      message.success('Success User Profile created');
    } catch (e) {
      message.error('Failed to create user');
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      <Form layout="vertical" initialValues={body} onFinish={submit}>
        <Form.Item
          name={'firstName'}
          label="First name"
          rules={[{ required: true, message: 'First name is required' }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          name={'lastName'}
          label="Last name"
          rules={[{ required: true, message: 'Last name is required' }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="Email"
          name={'email'}
          rules={[
            { required: true, message: 'Required' },
            { type: 'email', message: 'Email' },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input type="password"></Input>
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={loader}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
