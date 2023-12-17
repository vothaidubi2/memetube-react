import React, { useState, useEffect, useContext } from "react";
import MainScreen from "../MainScreen/MainScreen.component";
import Chat from "../ChatVideo/Chat";
import { UserContext } from "../Cookie/UserContext";
import NotificationAPI from "../../utils/NotificationAPI";
import { userRole } from "../../utils/FirebaseConfig";

export default function Stream() {
  const user = useContext(UserContext);
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    const currentURL = new URL(window.location.href);

    const dataNotification = {
      Idnotification: "",
      Iduser: "",
      title: `The streamer you are following ${user.Email} is streaming`,
      contents: `See more`,
      datecreate: "",
      checked: false,
      redirecturl: currentURL.href,
      status: true,
    };

    const addNotification = async () => {
      const jsonData = JSON.stringify(dataNotification);
      try {
        const data = await NotificationAPI.addnotificationOnetoMany(
          `/addNotificationOnetoMany?Idsend=${user.Iduser}`,
          jsonData
        );
        setNotificationSent(true);
      } catch (error) {
      }
    };

    if (userRole) {
      if (!notificationSent) {
        addNotification();
      }
    }
  }, [notificationSent, userRole, user.Email, user.Iduser]);

  if (user == null) {
    return <></>;
  }

  return (
    <>
      <div style={{ margin: "10px 5% 0 5%", display: "flex" }}>
        <MainScreen userName={user.Email} />
        <div className="App" style={{ marginLeft: "3%" }}>
          <Chat name={user.Email} />
        </div>
      </div>
    </>
  );
}
