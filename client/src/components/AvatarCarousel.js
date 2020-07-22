import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

import Avatars from '../utils/Avatars';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/AvatarCarousel.css';
import { useRoomState } from '../store';
import PlayerCache from '../utils/PlayerCache';
import APIRequestHandler from '../utils/ApiRequestHandler';

const AvatarCarousel = () => {
  const { roomId } = useRoomState();
  const { avatar } = PlayerCache.getPlayerInfo();

  const findAvatarIdx = (avatarId) => Avatars.findIndex((e) => e.id === avatarId);

  const cachedIdx = findAvatarIdx(avatar);
  let initState = 0;
  if (cachedIdx !== -1) initState = cachedIdx;

  const [selectedIdx, setSelected] = useState(initState);
  const { id, token } = PlayerCache.getPlayerInfo();

  const onClickItem = async (event, props) => {
    const avatarId = props.props.children.key;
    const newIdx = findAvatarIdx(avatarId);
    const playerInfo = {
      avatar: avatarId,
    };
    await APIRequestHandler.updatePlayerInfo(roomId, id, playerInfo, token);
    const savedPlayerInfo = PlayerCache.getPlayerInfo();
    savedPlayerInfo.avatar = props.props.children.key;
    PlayerCache.cachePlayerInfo(savedPlayerInfo);
    setSelected(newIdx);
  };

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      selectedItem={selectedIdx}
      className="carouselDiv"
      showArrows
      renderArrowNext={(onClickHandler, hasNext, label) => {
        if (hasNext) return <button className="arrow nextArrow" onClick={onClickHandler} label={label}>{'>'}</button>;
        return null;
      }}
      renderArrowPrev={(onClickHandler, hasPrev, label) => {
        if (hasPrev) return <button className="arrow prevArrow" onClick={onClickHandler} label={label}>{'<'}</button>;
        return null;
      }}
      onClickItem={onClickItem}
      onClickThumb={onClickItem}
      onChange={onClickItem}
    >
      {Avatars.map((currentAvatar) => (
        <div className="slide" key={currentAvatar.id}>
          <img key={currentAvatar.id} src={currentAvatar.image} className="avatarPic" alt="" />
        </div>

      ))}

    </Carousel>
  );
};

export default AvatarCarousel;
