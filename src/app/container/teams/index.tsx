import { Button, Drawer, Table, Typography } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../slice';
import { GetTeamAction } from '../../slice/team';
import { Manager } from '../../types/teams';
import { NewTeamForm } from '../../component/forms/newTeam';

export const TeamContainer = () => {
  const [open, setOpen] = React.useState(false);
  //Adding list of teams using team tables
  //Step 1 - Load data from API
  const dispatch = useAppDispatch();
  const { teams, loader } = useAppSelector((t) => t.teamReducer);
  React.useEffect(() => {
    reloadTable();
  }, [dispatch]);
  const editTeam = (id: string) => {
    console.log(id);
  };
  const reloadTable = () => {
    dispatch(GetTeamAction());
  };

  return (
    <>
      <div className="body-container">
        <div className="header">
          <h1>Teams</h1>
          <Button size="large" type="text" onClick={() => setOpen(true)}>
            Create new team
          </Button>
        </div>
        <div className="body">
          <Table
            columns={[
              { title: 'Team name', dataIndex: 'name', key: 'name' },
              {
                title: 'Manager',
                dataIndex: 'manager',
                key: 'manager',
                render: (m: Manager) => {
                  return <Typography.Text>{m.firstName}</Typography.Text>;
                },
              },
              {
                title: 'Action',
                key: '_id',
                dataIndex: '_id',
                render: (i: string) => {
                  return <Button onClick={() => editTeam(i)}>Edit</Button>;
                },
              },
            ]}
            rowKey={'_id'}
            pagination={false}
            dataSource={teams}
            loading={loader}
          />
        </div>
      </div>

      <Drawer
        children={
          <NewTeamForm
            onSuccess={() => {
              setOpen(false);
              reloadTable();
            }}
          />
        }
        width={'45vw'}
        open={open}
        onClose={() => setOpen(false)}
        destroyOnClose
        title="Create new team"
      />
    </>
  );
};
