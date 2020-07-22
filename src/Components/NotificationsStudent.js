import React from "react";
import AnnouncementSharpIcon from '@material-ui/icons/AnnouncementSharp';

function NotificationsStudent() {

  return (
      <>
      <div style={{ display: 'flex'}}>
      <h2>Recent Notifications</h2>
      <AnnouncementSharpIcon />
      </div>
      <div>
          <h3> - Class for CS204 @ 5:00 pm</h3>
          <h3> - Class for CS204 @ 5:00 pm</h3>
          <h3> - Class for CS204 @ 5:00 pm</h3>
      </div>
      </> 
  );
}

export default NotificationsStudent;
