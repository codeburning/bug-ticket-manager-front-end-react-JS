import { Button, Modal } from 'antd';
import { useAppDispatch } from '../../slice';
import { logoutAction } from '../../slice/auth';
import React from 'react';
import { NewTicketForm } from '../forms/newTicket';
import { GetTicketsAction } from '../../slice/tickets';
export const AppNavbar = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(logoutAction());
  };
  /**
   * Will add form to create  a new ticket
   */
  const openNewTicket = () => setOpen(true);
  return (
    <>
      <header>
        <div className="logo-wrapper">Logo</div>
        <div className="row-flex ">
          <Button type="primary" onClick={openNewTicket}>
            New Ticket
          </Button>
          <Button type="text" danger onClick={logout}>
            Logout
          </Button>
        </div>
      </header>
      <Modal
        width={'45vw'}
        title="New ticket"
        destroyOnClose
        onCancel={() => setOpen(false)}
        open={open}
        footer={null}
        children={
          <NewTicketForm
            onSuccess={() => {
              setOpen(false);
              dispatch(GetTicketsAction());
            }}
          />
        }
      />
    </>
  );
};
