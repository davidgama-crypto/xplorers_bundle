import { Avatars } from '../utils/Avatars';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/AvatarCarousel.css';
import { useRoomState } from '../store';
import PlayerCache from '../utils/PlayerCache';
import APIRequestHandler from '../utils/ApiRequestHandler';

const React = require('react');
const { Carousel } = require('react-responsive-carousel');

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
      className="carouselDiv"
      showArrows
      onClickItem={onClickItem}
      onClickThumb={onClickItem}
      onChange={onClickItem}
    >
      {Avatars.map((avatar) => (
        <div className="slide" key={avatar.id}>
          <img key={avatar.id} src={avatar.image} alt="" />
        </div>

      ))}

    </Carousel>
  );
};

export default AvatarCarousel;
