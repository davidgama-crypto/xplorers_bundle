import React from 'react';
import '../css/AvatarPlayer.css';
import Avatars from '../utils/Avatars';
import PlayerCache from '../utils/PlayerCache';

const AvatarPlayer = (props) => {
  const { isHost, isReady, playerInfo } = props;
  const getAvatarImage = () => {
    const filterAvatar = (avatar) => avatar.id === playerInfo.avatar;

    let avatarSelected = Avatars.filter(filterAvatar);
    if (avatarSelected === undefined || avatarSelected.length === 0) {
      // eslint-disable-next-line prefer-destructuring
      avatarSelected = Avatars;
    }
    return <img className="avatarImg" src={avatarSelected[0].image} alt="Logo" />;
  };

  let playerTextCss = 'playerNameDiv';

  if (isReady) {
    playerTextCss += ' isReady';
  }

  const currentPlayerInfo = PlayerCache.getPlayerInfo();
  const isSelf = playerInfo.id === currentPlayerInfo.id;

  if (isSelf) {
    playerTextCss += ' isSelf';
  }

  let playerText = '';
  if (isHost) playerText = '(host)';
  if (isSelf) playerText = '(you)';
  if (isHost && isSelf) playerText = '(you are host)';

  return (
    <div className="avatarPlayerDiv">
      <div className="avatarPlayerImgDiv">
        {getAvatarImage()}
      </div>
      <div className={playerTextCss}>
        <h4>
          {playerInfo.displayName}
        </h4>
        <h4>{playerText}</h4>
      </div>
    </div>

  );
};

export default AvatarPlayer;
