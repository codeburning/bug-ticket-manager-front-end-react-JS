import { Button, Drawer, Table } from 'antd';
import React from 'react';
import { UserCreateForm } from '../../component/forms/userCreate';
import { useAppDispatch, useAppSelector } from '../../slice';
import { GetUsersAction } from '../../slice/user';

export const UserContainer = () => {
  const [open, setOpen] = React.useState(false);
  const { users, loader } = useAppSelector((a) => a.userReducer);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(GetUsersAction());
  }, [dispatch]);
  return (
    <>
      <div className="body-container">
        <div className="header">
          <h1>Users</h1>
          <Button size="large" type="text" onClick={() => setOpen(true)}>
            Add new user
          </Button>
        </div>
        <div className="body">
          <Table
            pagination={false}
            columns={[
              {
                key: 'firstName',
                dataIndex: 'firstName',
                title: 'First name',
              },
              {
                key: 'lastName',
                dataIndex: 'lastName',
                title: 'Last name',
              },
              {
                key: 'email',
                dataIndex: 'email',
                title: 'Email',
              },
            ]}
            dataSource={users}
            loading={loader}
            rowKey={'_id'}
          ></Table>
        </div>
      </div>

      {/* user creation form modal */}
      <Drawer
        width={'40%'}
        children={
          <UserCreateForm
            onSuccess={() => {
              setOpen(false);
              dispatch(GetUsersAction());
            }}
          />
        }
        open={open}
        title="Create new user"
        destroyOnClose
        onClose={() => setOpen(false)}
      />
    </>
  );
};
