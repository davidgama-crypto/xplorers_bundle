import React from 'react';
import '../css/GameSelectionPanel.css';
import AvatarPlayer from './AvatarPlayer';
import { useRoomState } from '../store';

const PlayersPanel = () => {

  const { roomState } = useRoomState();
  const { current } = roomState;
  const { players } = current;
  const playerIds = Object.keys(players);
  return (
    <div className="gameSelectionGrid">
      <h1>
        Waiting Room
      </h1>
      <div className="gameSelectionDiv">
        {playerIds.map((e) => {
          const playerInfo = players[e];
          return (
            <AvatarPlayer key={playerInfo.id} playerInfo={playerInfo} />
          );
        })}
      </div>
    </div>
  );
};

export default PlayersPanel;
