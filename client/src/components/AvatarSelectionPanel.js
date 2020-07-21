import React from 'react';
import '../css/GameSelectionPanel.css';
import AvatarCarousel from './AvatarCarousel';
import APIRequestHandler from '../utils/ApiRequestHandler';
import { useRoomState } from '../store';
import PlayerCache from '../utils/PlayerCache';

const AvatarSelectionPanel = () => {
  const { roomId } = useRoomState();
  const { id, token } = PlayerCache.getPlayerInfo();
  const handleChange = async (e) => {
    const playerInfo = {
      displayName: e.target.value,
    };
    await APIRequestHandler.updatePlayerInfo(roomId, id, playerInfo, token);
  };
  return (
    <div className="avatarSelectionContainer">
      <div>
        <AvatarCarousel />
      </div>
      <div>
        <div className="form-group">
          <input type="text" id="playerNameInput" className="form-control" onChange={handleChange} placeholder="Enter Name" />
        </div>
      </div>

    </div>

  );
};

export default AvatarSelectionPanel;
