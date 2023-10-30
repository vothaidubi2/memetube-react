import React from "react";
import Card from "../../Card/Card.component";
import "./Participant.css";
import SendIcon from "@mui/icons-material/Send";
import MicOffIcon from '@mui/icons-material/MicOff'
export const Participant = (props) => {
  const {
    curentIndex,
    currentParticipant,
    hideVideo,
    videoRef,
    showAvatar,
    currentUser,
  } = props;
  if (!currentParticipant) return <></>;
  return (
    <div>
<Card sx={{ width: "100%", position: "relative" }}>
  <video
    style={{
      width: "125vh", // Adjusted to match wrapper's width
      height: "70vh",
      objectFit: "cover"
                }}
          ref={videoRef}
          className="video"
          id={`participantVideo${curentIndex}`}
          autoPlay
          playsInline
        ></video>
        {!currentParticipant.audio && (
  <MicOffIcon sx={{position:"absolute" ,top:"10px" ,right:"10px"}}/>
        )}
                <div className="name">
          {currentParticipant.name}
        </div>

        
      </Card>
      
    </div>
  );
};
