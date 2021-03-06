import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import WaitingRoom from '../components/WaitingRoom';
import PlayerCache from '../utils/PlayerCache';
import {
  useRoomState, roomCreated, playerJoiningRoom,
} from '../store';
import ActiveGameRenderer from '../components/ActiveGameRenderer';
import LeaderBoard from '../components/LeaderBoard';

const GameRoomPage = () => {
  console.debug('In GameRoomPage render()');

  const dispatch = useDispatch();
  const {
    error, loading, roomState, roomId,
  } = useRoomState();
  const urlParams = useParams();

  // If we're missing state needed for this room
  // dispatch actions conditionally to trigger loading of that state
  // at the end of render
  useEffect(() => {
    if (roomId === null && !loading) {
      dispatch(roomCreated(urlParams.roomId));
    } else if (roomState === null && !loading) {
      dispatch(playerJoiningRoom(roomId));
    }
  });

  if (error) {
    alert(error.message);
    return (
      <>
        <Redirect push to="/" />
      </>
    );
  }

  // Determines if a room is ready to be rendered
  const roomIsReady = () => roomId !== null
    && roomState !== null
    && !error
    && PlayerCache.cachedInfoExists()
    && PlayerCache.playerTokenExists()
    && roomState.current !== undefined
    && roomState.current.players !== undefined
    && roomState.current.players[PlayerCache.getPlayerInfo().id] !== undefined;

  if (!roomIsReady()) {
    console.debug('room is not ready');
    return (
      <>
        <Spinner animation="border" />
      </>
    );
  }

  const { status } = roomState.current;

  if (status === 'waiting') {
    console.debug('Room is in waiting status');
    return <WaitingRoom />;
  }

  if (status === 'playing') {
    console.debug('Room is in playing status');
    return (
      <ActiveGameRenderer />
    );
  }

  console.debug('Room is in finished status');
  return <LeaderBoard totalScores={roomState.totalScores} />;
};

export default GameRoomPage;
