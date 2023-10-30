import React, { useRef, useEffect, useContext } from "react";
import MeetingFooter from "../MeetingFooter/MeetingFooter.component";
import Participants from "../Participants/Participants.component";
import "./MainScreen.css";
import { connect } from "react-redux";
import { setMainStream, updateUser } from "../../Components/Store/actioncreator";
import { Avatar, Card, CardHeader, CardMedia } from "@mui/material";
import { red } from "@mui/material/colors";
import VisibilityIcon from '@mui/icons-material/Visibility';
import getCookie from "../Cookie/getCookie";
import { UserContext } from "../Cookie/UserContext";

const MainScreen = (props) => {
const timeLiveStreamTemp=getCookie('timeLiveStream')
const masterUser=useContext(UserContext)
console.log('masterAvater',masterUser)
let view=Object.keys(props.participants).length
  const participantRef = useRef(props.participants);

  const onMicClick = (micEnabled) => {
    if (props.stream) {
      props.stream.getAudioTracks()[0].enabled = micEnabled;
      props.updateUser({ audio: micEnabled });
    }
  };
  
  const onVideoClick = (videoEnabled) => {
    if (props.stream) {
      props.stream.getVideoTracks()[0].enabled = videoEnabled;
      props.updateUser({ video: videoEnabled });
    }
  };

  useEffect(() => {
    participantRef.current = props.participants;
    console.log('props pati',props.participants)
  }, [props.participants]);

  const updateStream = (stream) => {
    for (let key in participantRef.current) {
      const sender = participantRef.current[key];
      if (sender.currentUser) continue;
      const peerConnection = sender.peerConnection
        .getSenders()
        .find((s) => (s.track ? s.track.kind === "video" : false));
      peerConnection.replaceTrack(stream.getVideoTracks()[0]);
    }
    props.setMainStream(stream);
  };

  const onScreenShareEnd = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    localStream.getVideoTracks()[0].enabled = Object.values(
      props.currentUser
    )[0].video;

    updateStream(localStream);

    props.updateUser({ screen: false });
  };

  const onScreenClick = async () => {
    let mediaStream;
    if (navigator.getDisplayMedia) {
      mediaStream = await navigator.getDisplayMedia({ video: true });
    } else if (navigator.mediaDevices.getDisplayMedia) {
      mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
    } else {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { mediaSource: "screen" },
      });
    }

    mediaStream.getVideoTracks()[0].onended = onScreenShareEnd;

    updateStream(mediaStream);

    props.updateUser({ screen: true });

  };
  return (
    <div className="wrapper" style={{backgroundColor: "#202124",borderRadius:"5px"}}>
<div style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={masterUser.Avatar}>
          
        </Avatar>
      }
      title={props.userName}
      subheader={timeLiveStreamTemp}
    />
  </div>
  <h3 style={{marginRight:"1%"}}>{view}</h3>
  <VisibilityIcon 
  sx={{marginRight:"5%"}}
  />
</div>
      <div className="main-screen">

        <Participants />
      </div>

      <div className="footer">
        <MeetingFooter
          onScreenClick={onScreenClick}
          onMicClick={onMicClick}
          onVideoClick={onVideoClick}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log('state',state.participants)
  return {
    stream: state.mainStream,
    participants: state.participants,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMainStream: (stream) => dispatch(setMainStream(stream)),
    updateUser: (user) => dispatch(updateUser(user)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
