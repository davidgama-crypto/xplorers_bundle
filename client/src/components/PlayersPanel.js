import React from 'react';
import '../css/GameSelectionPanel.css';
import AvatarPlayer from './AvatarPlayer';
import { useRoomState } from '../store';

const PlayersPanel = () => {
  const { roomState } = useRoomState();
  const { current } = roomState;
  const { players, host } = current;
  const playerIds = Object.keys(players);

  const isHost = (id) => id === host;

  return (
    <div className="gameSelectionGrid">
      <div className="gameSelectionDiv">
        {playerIds.map((e) => {
          const playerInfo = players[e];
          return (
            <AvatarPlayer isHost={isHost(e)} isReady={playerInfo.ready} key={playerInfo.id} playerInfo={playerInfo} />
          );
        })}
      </div>
    </div>
  );
};

export default PlayersPanel;
