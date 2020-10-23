import React, { useState, useEffect, useRef } from "react";
import { useParams, withRouter } from "react-router-dom";
import io from "socket.io-client";
import Peer from "simple-peer";
import Video from "../components/hours/Video";

const JoinHour = () => {
  const { hourId } = useParams();
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const socketRef = useRef();
  const peersRef = useRef([]);
  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join hour", hourId);

        socketRef.current.on("all persons", (persons) => {
          console.log(persons.length + 1);
          const peers = [];
          persons.forEach((personId) => {
            const peer = createPeer(personId, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: personId,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });
        socketRef.current.on("person joined", (data) => {
          const peer = addPeer(data.signal, data.personId, stream);
          peersRef.current.push({
            peerID: data.personId,
            peer,
          });
          console.log(peer);
          setPeers((peers) => [...peers, peer]);
        });
        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(peers);
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }
  return (
    <div>
      <h1>{hourId}</h1>
      <video muted autoPlay ref={userVideo}></video>
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} />;
      })}
    </div>
  );
};

export default withRouter(JoinHour);
