import { Button, Form, Mentions } from 'antd';
import { useAppSelector } from '../../slice';
import { ActivityPostBody } from '../../types/ticketActivity';
import { postNewTicketActivity } from '../../api/tickets/activity/postActivity';
import React from 'react';
interface Props {
  onSuccess: () => void;
  ticketId: string;
}
export const ActivityPostForm: React.FC<Props> = ({ onSuccess, ticketId }) => {
  const [loading, setLoading] = React.useState(false);
  const { users } = useAppSelector((a) => a.userReducer);
  const body: ActivityPostBody = { post: '', media: [] };
  const [form] = Form.useForm();
  const submit = async (a: ActivityPostBody) => {
    // console.log(a);
    try {
      const response = await postNewTicketActivity(ticketId, {
        ...a,
        media: [],
      });
      onSuccess();
      console.log({ response });
      form.resetFields();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="activity-form-wrapper">
      <Form onFinish={submit} initialValues={body} form={form}>
        <Form.Item
          name={'post'}
          rules={[{ required: true, message: 'Required' }]}
        >
          <Mentions
            rows={6}
            options={users.map((a) => {
              return {
                label: a.firstName,
                value: a._id,
                children: <p>HEllo</p>,
              };
            })}
          ></Mentions>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
