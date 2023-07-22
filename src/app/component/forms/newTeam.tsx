import { Button, Form, Input, Select, message } from 'antd';
import { NewTeamBody } from '../../types/teams';
import { useAppDispatch, useAppSelector } from '../../slice';
import React from 'react';
import { GetUsersAction } from '../../slice/user';
import { createNewTeamApi } from '../../api/teams';
interface Props {
  onSuccess: () => void;
}
export const NewTeamForm = (p: Props) => {
  const { loader, users } = useAppSelector((s) => s.userReducer);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);

  const [form] = Form.useForm();
  const body: NewTeamBody = {
    name: '',
    manager: '',
    members: [],
  };
  React.useEffect(() => {
    dispatch(GetUsersAction());
  }, [dispatch]);

  /**
   * We need to load users
   */
  const submit = async (a: NewTeamBody) => {
    try {
      // console.log('a', a);
      setLoading(true);
      const response = await createNewTeamApi(a);
      p.onSuccess();
      form.resetFields();
      console.log({ response });
      message.success('New team created');
    } catch (e) {
      //Here Error from Server occurred
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Form
        layout="vertical"
        initialValues={body}
        onFinish={submit}
        form={form}
      >
        <Form.Item
          label="Team name"
          name={'name'}
          rules={[{ required: true, message: 'Team name is required' }]}
        >
          <Input placeholder="Enter team name" title="Team name" />
        </Form.Item>
        <Form.Item
          label="Team Manager"
          name={'manager'}
          rules={[{ required: true, message: 'Team manager is required' }]}
        >
          {/* Here will add dropdown to select team manager */}
          <Select
            loading={loader}
            options={users.map((a) => {
              return {
                value: a._id,
                label: `Name - ${a.firstName}  , email -${a.email}`,
              };
            })}
          />
        </Form.Item>
        <Form.Item label="Members" name={'members'}>
          {/* Here will add dropdown to select members ["multiple select item"] */}
          <Select
            showSearch={false}
            mode="multiple"
            loading={loader}
            options={users.map((a) => {
              return {
                value: a._id,
                label: `Name - ${a.firstName}  , email -${a.email}`,
              };
            })}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
