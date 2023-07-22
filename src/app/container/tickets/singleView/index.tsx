import { Button, Card, Col, Row, Spin, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { goBack } from '../../../utils/window';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../slice';
import { GetTicketActivityAction } from '../../../slice/ticketActivity';
import { ActivityPostForm } from '../../../component/activity/activityPostForm';
import { GetUsersAction } from '../../../slice/user';
import { ActivityItem } from '../../../component/activity/activityItem';
import { GetTicketDetailsAction } from '../../../slice/tickets';
import { TicketDetails } from '../../../component/ticket/details';

export const TicketSingleViewContainer = () => {
  const { ticketId } = useParams();
  const { records, loading } = useAppSelector((a) => a.ticketActivityReducer);
  const details = useAppSelector((a) => a.ticketReducer);

  const userId = useAppSelector((a) => a.authReducer.user?._id);

  /**
   * Lets design activity post
   */
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (ticketId) getTicketDetails(ticketId);
    reload();
  }, [dispatch, ticketId]);
  const reload = () => {
    if (ticketId && typeof ticketId === 'string') {
      dispatch(GetTicketActivityAction(ticketId));
      dispatch(GetUsersAction());
    }
  };
  const getTicketDetails = (id: string) => {
    dispatch(GetTicketDetailsAction(id));
  };
  return (
    <>
      <div>
        <div className="body-container">
          <div className="header">
            <Button type="text" onClick={() => goBack()}>
              Back
            </Button>
          </div>
          <div
            className="body"
            style={{ padding: '0.5rem', overflow: 'hidden' }}
          >
            <>
              <Row gutter={24}>
                <Col span={12}>
                  <Card
                    loading={details.loading}
                    title={
                      <>
                        <Typography.Title style={{ fontSize: '20px' }}>
                          Details
                        </Typography.Title>
                      </>
                    }
                  >
                    <>
                      {details.details && (
                        <TicketDetails ticket={details.details} />
                      )}
                      {ticketId && (
                        <ActivityPostForm
                          onSuccess={reload}
                          ticketId={ticketId}
                        />
                      )}
                    </>
                  </Card>
                </Col>

                <Col span={12}>
                  <Card
                    loading={loading}
                    title={
                      <Typography.Title style={{ fontSize: '20px' }}>
                        Activity
                      </Typography.Title>
                    }
                  >
                    <div className="activity-holder">
                      {records.map((a) => (
                        <ActivityItem activity={a} userId={userId || ''} />
                      ))}
                    </div>
                  </Card>
                </Col>
              </Row>
            </>
          </div>
        </div>
      </div>
    </>
  );
};
