import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useRoomState, setCurrentPlayerReady, setGames } from '../store';
import PlayerCache from '../utils/PlayerCache';

const WaitingRoom = () => {
  console.debug('In WaitingRoom render()');

  const dispatch = useDispatch();
  const { error, roomState, roomId } = useRoomState();

  if (error) {
    alert('There was an error joining the room. Please create a new room.');
    return (
      <>
        <Redirect to="/" />
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

  const addGames = () => {
    // TODO CHANGE FOR ACTUAL GAME SELECTION ALL THIS SECTION
    dispatch(setGames(roomId, {
      games: [
        {
          type: 'test',
          rounds: 1,
        },
      ],
    }));
  };

  // TODO: replace selected games and user list with actual components
  const disableReady = () => numberOfPlayers === 1 || numberOfGames === 0;
  return (
    <div>

      {isHost() ? <button type="button" onClick={addGames} className="roomCreateBtn">Add Games</button> : null}

      <button type="button" onClick={togglePlayerReady} className="roomCreateBtn" disabled={disableReady()}>{ ready ? 'Not Ready' : 'Ready'}</button>
      <h1>
        {`Player ready=${ready}`}
      </h1>
      <h1>
        Users:
        {numberOfPlayers}
      </h1>
      <ul>
        {playerIds.map((e) => {
          const playerInfo = players[e];
          const { displayName, avatar } = playerInfo;
          return (
            <li key={playerInfo.id}>{`${e}:${displayName}:${avatar}:ready=${playerInfo.ready}`}</li>
          );
        })}
      </ul>
      <h1>
        Selected Games:
        {gameData.length}
      </h1>
      <ul>
        {gameData.map((e) => <li key={e.type}>{e.type}</li>)}
      </ul>
    </div>
  );
};

export default WaitingRoom;
