import React, { useState } from 'react';
import '../css/AvatarSelectionPanel.css';
import AvatarCarousel from './AvatarCarousel';
import APIRequestHandler from '../utils/ApiRequestHandler';
import { useRoomState } from '../store';
import PlayerCache from '../utils/PlayerCache';

const AvatarSelectionPanel = () => {
  const { roomId } = useRoomState();
  const { id, token, displayName } = PlayerCache.getPlayerInfo();
  const [currentName, setName] = useState(displayName);
  const handleChange = async (e) => {
    const newName = e.target.value;
    const playerInfo = {
      displayName: newName,
    };
    setName(newName);
    await APIRequestHandler.updatePlayerInfo(roomId, id, playerInfo, token);
    const cachedInfo = PlayerCache.getPlayerInfo();
    cachedInfo.displayName = newName;
    PlayerCache.cachePlayerInfo(cachedInfo);
  };
  return (
    <div className="avatarSelectionContainer">
      <div>
        <AvatarCarousel />
      </div>
      <div>
        <div className="form-group">
          <input type="text" id="playerNameInput" className="form-control" onChange={handleChange} placeholder="Enter Name" value={currentName} />
        </div>
      </div>

    </div>

  );
};

export default AvatarSelectionPanel;
