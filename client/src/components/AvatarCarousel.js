import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import Avatars from '../utils/Avatars';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/AvatarCarousel.css';
import { useRoomState } from '../store';
import PlayerCache from '../utils/PlayerCache';
import APIRequestHandler from '../utils/ApiRequestHandler';

const AvatarCarousel = () => {
  const { roomId } = useRoomState();
  const { id, token } = PlayerCache.getPlayerInfo();

  const onClickItem = async (event, props) => {
    const playerInfo = {
      avatar: props.props.children.key,
    };
    await APIRequestHandler.updatePlayerInfo(roomId, id, playerInfo, token);
  };
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
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
      {Avatars.map((avatar) => (
        <div className="slide" key={avatar.id}>
          <img key={avatar.id} src={avatar.image} className="avatarPic" alt="" />
        </div>

      ))}

    </Carousel>
  );
};

export default AvatarCarousel;
