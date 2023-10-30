  import React, { useEffect, useRef } from "react";
  import "./Participants.css";
  import { connect } from "react-redux";
  import { Participant } from "./Participant/Participant.component";
  import { userRole } from "../../utils/FirebaseConfig";
  const Participants = (props) => {

    const videoRef = useRef(null);
    let participantKey = Object.keys(props.participants);
      console.log('role',props.participants)

    useEffect(() => {
      
      if (videoRef.current) {
        videoRef.current.srcObject = props.stream;
        videoRef.current.muted = true;
      }
    }, [props.currentUser, props.stream]);

    const currentUser = props.currentUser
      ? Object.values(props.currentUser)[0]
      : null;


    const screenPresenter = participantKey.find((element) => {
      const currentParticipant = props.participants[element];
      return currentParticipant.screen;
    });

    const participants = participantKey.map((element, index) => {
      const currentParticipant = props.participants[element];
      const isCurrentUser = currentParticipant.currentUser;
      if (isCurrentUser) {
        return null;
      }
      console.log('master',currentParticipant)
      console.log('allrole',currentUser.master)
      const pc = currentParticipant.peerConnection;
      const remoteStream = new MediaStream();
      let curentIndex = index;
      if (pc) {
        pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
          });
          const videElement = document.getElementById(
            `participantVideo${curentIndex}`
          );
          if (videElement) videElement.srcObject = remoteStream;
        };
      }



      return (
  <>
      {currentParticipant.master  ? (
  <div
  >
  
  <Participant

          key={curentIndex}
          currentParticipant={currentParticipant.master}
          curentIndex={curentIndex}
          hideVideo={screenPresenter && screenPresenter !== element}
          showAvatar={
            !currentParticipant.video &&
            !currentParticipant.screen &&
            currentParticipant.name
          }
        />
  </div>
        
      ) : (
        <>

        </>
      )}
    </>
      );
    });
    return (
      <div
      >
        {participants}
        {userRole  ?       <Participant
          currentParticipant={currentUser}
          curentIndex={participantKey.length}
          hideVideo={screenPresenter && !currentUser.screen}
          videoRef={videoRef}
          showAvatar={currentUser && !currentUser.video && !currentUser.screen}
          currentUser={true}
        />:<></>}

      </div>
    );
  };

  const mapStateToProps = (state) => {
    return {
      participants: state.participants,
      currentUser: state.currentUser,
      stream: state.mainStream,
    };
  };

  export default connect(mapStateToProps)(Participants);