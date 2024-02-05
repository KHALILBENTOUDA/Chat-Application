import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UserNotifications = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [chaexk, setchaexk] = useState(true);
  const notifications = useSelector(
    (state) => state.NotificationReducer.notificaions
  );

  if (notifications.length > 0) {
    setShowNotification(true);
    const timeoutId = setTimeout(() => {
      setShowNotification(false);
    }, 4000);
    return () => clearTimeout(timeoutId);
  }

  return (
    <div className={`notification ${showNotification ? "show" : "hidden"}`}>
      notifications.content
    </div>
  );
};

export default UserNotifications;
