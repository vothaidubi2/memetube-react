import React, { useEffect, useState } from "react";
import "./MeetingFooter.css";
import { userRole } from "../../utils/FirebaseConfig";
import { IconButton } from "@mui/material";
import MicOffIcon from '@mui/icons-material/MicOff'
import CastIcon from '@mui/icons-material/Cast';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
const MeetingFooter = (props) => {
  const [streamState, setStreamState] = useState({
    mic: true,
    video: false,
    screen: false,
  });
  const micClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,
      };
    });
  };

  const onVideoClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !currentState.video,
      };
    });
  };

  const onScreenClick = () => {
    props.onScreenClick(setScreenState);
  };

  const setScreenState = (isEnabled) => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        screen: isEnabled,
      };
    });
  };
  useEffect(() => {
    props.onMicClick(streamState.mic);
  }, [streamState.mic]);
  useEffect(() => {
    props.onVideoClick(streamState.video);
  }, [streamState.video]);
  return (
    <div className="meeting-footer">


{userRole ?       <div
        className={"meeting-icons " + (!streamState.mic ? "active" : "")}
        data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
        onClick={micClick}
      >
     <IconButton aria-label="settings" >
     {streamState.mic ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
      </div>:<></>}
{userRole ?      <div
        className={"meeting-icons " + (!streamState.video ? "active" : "")}
        data-tip={streamState.video ? "Hide Video" : "Show Video"}
        onClick={onVideoClick}
      >
 
  
     {streamState.video ? <VideocamIcon /> : <VideocamOffIcon />}
      </div>:<></>}
{userRole ?      <div
        className="meeting-icons"
        data-tip="Share Screen"
        onClick={onScreenClick}
        disabled={streamState.screen}
      >
     <IconButton aria-label="settings">
  <CastIcon /> 
            </IconButton>
      </div>:<></>}
    </div>
  );
};

export default MeetingFooter;