import { Form, Input, Button } from 'antd';
import { AuthLogin } from '../../types/auth';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../slice';
import { loginAction } from '../../slice/auth';

export const LoginContainer = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((s) => s.authReducer);
  const body: AuthLogin = { email: '', password: '' };
  const submit = (x: AuthLogin) => {
    // console.log(x);
    dispatch(loginAction(x));
  };
  return (
    <div className="auth-container">
      <div className="auth-form">
        <Form
          layout="vertical"
          requiredMark={false}
          initialValues={body}
          onFinish={submit}
        >
          <Form.Item>
            <p>Login to your account</p>
          </Form.Item>
          <Form.Item
            name={'email'}
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Invalid email' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name={'password'}
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <NavLink to={'/register'}>Register account</NavLink>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
