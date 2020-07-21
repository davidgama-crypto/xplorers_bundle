import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useRoomState, setCurrentPlayerReady, setGames } from '../store';
import PlayerCache from '../utils/PlayerCache';
import '../css/WaitingPage.css';
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
      <div className="gridWaitingContainer">
        <div className="games">
          <GameSelectionPanel isHost={isHost()} />
        </div>
        <div className="players">
          <div>
            <PlayersPanel />
          </div>
          <h1>
            {`Player ready=${ready}`}
          </h1>
          <h1>
            Users:
            {numberOfPlayers}
          </h1>
          <h1>
            Selected Games:
            {gameData.length}
          </h1>
          <ul>
            {gameData.map((e) => <li key={e.type}>{e.type}</li>)}
          </ul>
        </div>
        <div className="avatars createPlayerDiv">
          <div className="gameSelectionGrid">
            <h1>
              Create Player
            </h1>
            <div className="gameSelectionDiv">
              <div>
                <AvatarSelectionPanel />
              </div>
            </div>
          </div>
        </div>
        <div className="ready" id="readyDiv">
          <div className="readyBtn">
            <button type="button" onClick={togglePlayerReady} className="roomCreateBtn" disabled={disableReady()}>{ ready ? 'Not Ready' : 'Ready'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
