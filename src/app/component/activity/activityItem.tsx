import React from 'react';
import { TicketActivity } from '../../types/ticketActivity';
import { Avatar, Tag } from 'antd';
import { getProfileFirstName } from '../../utils/getProfileFirstName';
interface Props {
  activity: TicketActivity;
  userId: string;
}
export const ActivityItem: React.FC<Props> = ({ activity, userId }) => {
  return (
    <div className="ticket-activity-wrapper">
      <div className="ticket-activity">
        <div className="profile-holder">
          <Avatar
            src={<p>{getProfileFirstName(activity.postedBy.firstName)}</p>}
            style={{ backgroundColor: activity.postedBy.userAvatar }}
            shape="square"
            size={'large'}
          />
        </div>
        <div className="content">
          <p>{activity.post}</p>
        </div>
      </div>
      <div className="footer">
        <p className="timestamp">{activity.createdAt}</p>
        {activity.postedBy._id === userId && <Tag color="gold">Author</Tag>}
      </div>
    </div>
  );
};
