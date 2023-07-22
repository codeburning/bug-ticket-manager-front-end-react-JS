import { Button, Form, Input, Select, message } from 'antd';
import { TicketCreationBody } from '../../types/tickets';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../slice';
import { GetTeamAction } from '../../slice/team';
import { createNewTicketApi } from '../../api/tickets/createTicket';
interface Props {
  onSuccess: () => void;
}
export const NewTicketForm: React.FC<Props> = ({ onSuccess }) => {
  const [loading, setLoading] = React.useState(false);
  const { teams, loader } = useAppSelector((a) => a.teamReducer);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(GetTeamAction());
  }, [dispatch]);
  const body: TicketCreationBody = {
    title: '',
    description: '',
    assignedTeam: [], //We need to add Team selection Dropdown
    media: [],
    clientName: '',
    clientEmail: '',
    userName: '',
    userMobile: '',
  };
  const submitForm = async (a: TicketCreationBody) => {
    // console.log(a);
    try {
      const response = await createNewTicketApi(a);
      console.log({ ...response });
      message.success('Ticket has been added');
      onSuccess();
    } catch (e) {
      message.error('Failed to post new ticket');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div style={{ marginTop: '20px' }}>
        <Form initialValues={body} layout="vertical" onFinish={submitForm}>
          <Form.Item
            name={'title'}
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input placeholder="Enter ticket title" />
          </Form.Item>
          <Form.Item
            name={'description'}
            rules={[{ required: true, message: 'Description is required' }]}
          >
            <Input.TextArea
              placeholder="Description"
              maxLength={1024}
              showCount
            />
          </Form.Item>
          <Form.Item
            name={'clientName'}
            rules={[{ required: true, message: 'Client name is required' }]}
          >
            <Input placeholder="Client name" />
          </Form.Item>
          <Form.Item
            name={'clientEmail'}
            rules={[
              { required: true, message: 'Client email is required' },
              { type: 'email', message: 'Should be a valid email' },
            ]}
          >
            <Input placeholder="Client email" />
          </Form.Item>
          <Form.Item
            name={'userName'}
            rules={[{ required: true, message: 'SPOC name is required' }]}
          >
            <Input placeholder="SPOC name" />
          </Form.Item>
          <Form.Item
            name={'userMobile'}
            rules={[{ required: true, message: 'SPOC mobile is required' }]}
          >
            <Input placeholder="SPOC Mobile" />
          </Form.Item>
          <Form.Item label="Assign team" name={'assignedTeam'}>
            <Select
              loading={loader}
              mode="multiple"
              showSearch
              options={teams.map((a) => {
                return { label: a.name, value: a._id };
              })}
            ></Select>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              size="large"
              type="primary"
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
