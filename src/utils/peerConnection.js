import  { firepadRef,child } from "./FirebaseConfig";
import { store } from "../index";
import { onChildAdded, push,set, update  } from "firebase/database";

const participantRef = child(firepadRef, "participants");
export const updatePreference = (userId, preference) => {
  const currentParticipantRef = child(child(participantRef,userId),"preferences")
  setTimeout(() => {
    update(currentParticipantRef,preference);
  });
};

export const createOffer = async (peerConnection, receiverId, createdID) => {
  const currentParticipantRef = child(participantRef, receiverId);
  peerConnection.onicecandidate = (event) => {
    event.candidate &&
      push(child(currentParticipantRef, "offerCandidates"), {
        ...event.candidate.toJSON(),
        userId: createdID,
      });
  };

  const offerDescription = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
    userId: createdID,
  };

  await set(push(child(currentParticipantRef,"offers")),{ offer });
};

export const initializeListensers = async (userId) => {
  const currentUserRef = child(participantRef, userId);

  onChildAdded(child(currentUserRef, "offers"), async (snapshot) => {
    const data = snapshot.val();
    if (data?.offer) {
      const pc =
        store.getState().participants[data.offer.userId].peerConnection;
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      await createAnswer(data.offer.userId, userId);
    }
  });

  onChildAdded(child(currentUserRef, "offerCandidates"), (snapshot) => {
    const data = snapshot.val();
    if (data.userId) {
      const pc = store.getState().participants[data.userId].peerConnection;
      pc.addIceCandidate(new RTCIceCandidate(data));
    }
  });

  onChildAdded(child(currentUserRef, "answers"), (snapshot) => {
    const data = snapshot.val();
    if (data?.answer) {
      const pc =
        store.getState().participants[data.answer.userId].peerConnection;
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  onChildAdded(child(currentUserRef, "answerCandidates"), (snapshot) => {
    const data = snapshot.val();
    if (data.userId) {
      const pc = store.getState().participants[data.userId].peerConnection;
      pc.addIceCandidate(new RTCIceCandidate(data));
    }
  });
};

const createAnswer = async (otherUserId, userId) => {
  const pc = store.getState().participants[otherUserId].peerConnection;
  const participantRef1 = child(participantRef, otherUserId);
  pc.onicecandidate = (event) => {
    event.candidate &&
      push(child(participantRef1, "answerCandidates"), {
        ...event.candidate.toJSON(),
        userId: userId,
      });
  };

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
    userId: userId,
  };

  await set(push(child(participantRef1,"answers")),{ answer });
};
