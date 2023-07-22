import { Descriptions, Divider, Typography } from 'antd';
import { Ticket } from '../../types/tickets';
interface Props {
  ticket: Ticket;
}
export const TicketDetails: React.FC<Props> = ({ ticket }) => {
  return (
    <>
      <Typography.Text>Title - {ticket.title}</Typography.Text>
      <p style={{ marginBottom: '2px' }}>
        <h5 style={{ marginBottom: '2px' }}>Description</h5>
        <Typography.Text> {ticket.description}</Typography.Text>
      </p>
      <p style={{ marginBottom: '2px' }}>
        <h5 style={{ marginBottom: '2px' }}>Notes</h5>
        <Typography.Text> {ticket.notes || 'Not found'}</Typography.Text>
      </p>
      <Divider />
      <Descriptions>
        <Descriptions.Item
          label="Ticket Id"
          children={<Typography.Text>{ticket.ticketId}</Typography.Text>}
        ></Descriptions.Item>
        <Descriptions.Item
          label="Client name"
          children={<Typography.Text>{ticket.clientName}</Typography.Text>}
        ></Descriptions.Item>
        <Descriptions.Item
          label="Client email"
          children={<Typography.Text>{ticket.clientEmail}</Typography.Text>}
        ></Descriptions.Item>
        <Descriptions.Item
          label="SPOC name"
          children={<Typography.Text>{ticket.userName}</Typography.Text>}
        ></Descriptions.Item>
        <Descriptions.Item
          label="SPOC Mobile"
          children={<Typography.Text>{ticket.userMobile}</Typography.Text>}
        ></Descriptions.Item>
      </Descriptions>
    </>
  );
};

// return
