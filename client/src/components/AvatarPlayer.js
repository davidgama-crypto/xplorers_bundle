import React from 'react';
import '../css/AvatarPlayer.css';
import Avatars from '../utils/Avatars';

const AvatarPlayer = (props) => {
  const getAvatarImage = () => {
    const filterAvatar = (avatar) => avatar.id === props.playerInfo.avatar;

    let avatarSelected = Avatars.filter(filterAvatar);
    if (avatarSelected === undefined || avatarSelected.length === 0) {
      // eslint-disable-next-line prefer-destructuring
      avatarSelected = Avatars;
    }
    return <img className="avatarImg" src={avatarSelected[0].image} alt="Logo" />;
  };

  return (
    <div className="avatarPlayerDiv">
      <div className="avatarPlayerImgDiv">
        {getAvatarImage()}
      </div>
      <div className="playerNameDiv">
        <h4>
          {props.playerInfo.displayName}
        </h4>
      </div>
    </div>

  );
};

export default AvatarPlayer;
