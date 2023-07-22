import { Input, Select, Table, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from '../../slice';
import React from 'react';
import { GetTicketsAction } from '../../slice/tickets';
import {
  Ticket,
  TicketAssignedTeam,
  TicketCreatedBy,
} from '../../types/tickets';
import { NavLink } from 'react-router-dom';

export const TicketsContainer = () => {
  const { loading, records } = useAppSelector((a) => a.ticketReducer);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(GetTicketsAction());
  }, [dispatch]);
  /**
   * Now will add option to post comment/ activity on a ticket
   * !! Lets create single view for a ticket
   */
  return (
    <>
      <div>
        <div className="body-container">
          <div className="header">
            <h1>Tickets</h1>
            <div className="row-flex">
              <Input placeholder="Type to search"></Input>
              <Select
                showSearch
                placeholder="Select status"
                style={{ width: '290px' }}
                options={[{ label: 'Open', value: 'OPEN' }]}
              ></Select>
            </div>
          </div>
          <div className="body">
            <Table
              rowKey={'_id'}
              columns={[
                {
                  key: 'ticketId',
                  title: 'Ticket Id',
                  dataIndex: 'ticketId',
                  render: (a: string, data: Ticket) => (
                    <NavLink to={`${data._id}`}>{a}</NavLink>
                  ),
                },
                { key: 'title', title: 'Title', dataIndex: 'title' },
                { key: 'status', title: 'status', dataIndex: 'status' },
                {
                  key: 'assignedTeam',
                  title: 'Assigned team',
                  dataIndex: 'assignedTeam',
                  render: (value: TicketAssignedTeam[]) => {
                    return (
                      <>
                        {value.map((a) => (
                          <Tag key={a._id}>{a.name}</Tag>
                        ))}
                      </>
                    );
                  },
                },
                {
                  key: 'createdBy',
                  title: 'Posted by',
                  dataIndex: 'createdBy',
                  render: (value: TicketCreatedBy) => {
                    return <>{value.firstName}</>;
                  },
                },
              ]}
              loading={loading}
              dataSource={records || []}
              pagination={false}
            ></Table>
          </div>
        </div>
      </div>
    </>
  );
};
