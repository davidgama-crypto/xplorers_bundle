import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import WaitingRoom from '../components/WaitingRoom';
import TestGame from '../components/TestGame';
import PlayerCache from '../utils/PlayerCache';
import {
  reconnectPlayerToRoom, useRoomState, roomCreated, addPlayerToRoom,
} from '../store/store';
import styles from './GameRoomPage.module.css';
import ActiveGameRender from '../components/ActiveGameRenderer';

const GameRoomPage = () => {
  console.debug('In GameRoomPage render()');

  const dispatch = useDispatch()
  const history = useHistory()
  const { error, loading, roomState, roomId } = useRoomState()
  const urlParams = useParams()

  // If we're missing state needed for this room
  // dispatch actions conditionally to trigger loading of that state
  // at the end of render
  useEffect(() => {
    if (roomId === null) {
      dispatch(roomCreated(urlParams.roomId))
    } else if (roomState === null) {
      dispatch(addPlayerToRoom(roomId))
    }
  })


  if (error) {
    alert(error.message)
    return (
      <>
        <Redirect to="/" />
      </>
    ) 
  }

  const roomIsReady = () => {
    return roomId !== null && roomState !== null && !loading && !error
  }

  if (!roomIsReady()) {
      console.debug('room is not ready')
      return (
        <>
          <Spinner animation="border" />
        </>
      )
  }

  const {status} = roomState.current
  

  if (status === 'waiting') {
    console.debug('Room is in waiting status')
    return <WaitingRoom />
  }

  console.debug('Room is active, rendering ActiveGameRender')

  return (
    <ActiveGameRender />
)

  // if (error) {
  //     alert('There was an error joining the room. Please create a new room.')
  //     history.push('/')
  // }

  // console.debug('Game Room is already loaded and player is connected')
  // console.debug(roomState)

  // const {status, game } = roomState.current

  // if (status === 'waiting') {
  //     return <WaitingRoom />
  // }

  // const {type} = roomState.gameData[game]

  // const gameTypeRenderer = (type) => {
  //     switch(type) {
  //         case "test":
  //             return <TestGame />
  //         default:
  //             alert(`Unsupported game type=${type}`)
  //             history.push('/')
  //     }
  // }

  // return (
  //     <div>{
  //         gameTypeRenderer(type)
  //     }</div>
  // )
};

export default GameRoomPage;
