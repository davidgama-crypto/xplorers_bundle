import React from 'react';
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

const GameRoomPage = () => {
  console.debug('In GameRoomPage render()');

  const dispatch = useDispatch()
  const history = useHistory()
  const { error, loading, roomState, roomId } = useRoomState()
  const urlParams = useParams()


  if (error) {
    alert(error)
    history.push('/')
  }

  if (loading) {
      console.log('room is loading')
      return (
        <>
          <Spinner animation="border" />
        </>
      )
  }

  if (roomId === null) {

      console.debug('Setting roomId to URL params')

      dispatch(roomCreated(urlParams.roomId))
      return (
        <>
          <Spinner animation="border" />
        </>
      )
  }

  

  if (roomState === null || !roomState.current) {

      console.debug('No room data loaded, loading room')

      console.debug('playerInfo does not exist, adding a new player to the room')
      dispatch(addPlayerToRoom(roomId))

      // // if there are cached credentials, reconnect to room
      // // if there are no cached credentials, add new player
      // if (PlayerCache.playerTokenExists()) {
      //     console.debug('playerInfo already exists, attempting to reconnect')
      //     dispatch(reconnectPlayerToRoom(roomId))
      // } else {
      //     console.debug('playerInfo does not exist, adding a new player to the room')
      //     dispatch(addPlayerToRoom(roomId))
      // }

      return <Spinner animation="border" />
  }


  return (
    <div>done</div>
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
