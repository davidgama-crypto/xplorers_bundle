import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useRoomState, setCurrentPlayerReady } from '../store';
import PlayerCache from '../utils/PlayerCache';
import '../css/WaitingRoom.css';
import GameSelectionPanel from './GameSelectionPanel';
import AvatarSelectionPanel from './AvatarSelectionPanel';
import PlayersPanel from './PlayersPanel';

const WaitingRoom = () => {
  console.debug('In WaitingRoom render()');

  const dispatch = useDispatch();
  const { error, roomState, roomId } = useRoomState();

  if (error) {
    alert('There was an error joining the room. Please create a new room.');
    return (
      <>
        <Redirect push to="/" />
      </>
    );
  }

  // we did all the validation in the GameRoomPage
  const info = PlayerCache.getPlayerInfo();
  const { id } = info;

  const { current, gameData } = roomState;
  const { players, host } = current;
  const { ready } = players[id];
  const playerIds = Object.keys(players);
  const numberOfPlayers = playerIds.length;
  const numberOfGames = gameData.length;

  const togglePlayerReady = () => {
    const newReady = !ready;
    dispatch(setCurrentPlayerReady(roomId, newReady));
  };

  const isHost = () => host === id;

  // TODO: replace selected games and user list with actual components
  const disableReady = () => numberOfPlayers === 1 || numberOfGames === 0;
  return (
    <div className="waitingRoomContainer">
      <div className="gamesPanel">
        <h1>Selected Games</h1>
        <GameSelectionPanel isHost={isHost()} />
      </div>
      <div className="playersPanel">
        <h1>Current Players</h1>
        <div>
          <PlayersPanel />
        </div>
      </div>
      <div className="avatarsPanel">
        <h1>Select Avatar</h1>
        <div className="avatarSelectionComponent">
          <AvatarSelectionPanel />
        </div>

      </div>
      <div className="readyPanel">
        <div className="readyBtn">
          <button type="button" onClick={togglePlayerReady} className="roomCreateBtn" disabled={disableReady()}>{ ready ? 'Not Ready' : 'Ready'}</button>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
