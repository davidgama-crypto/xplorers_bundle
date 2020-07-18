
import { Avatars } from '../utils/Avatars'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../css/AvatarCarousel.css'

let React = require('react');
let Carousel = require('react-responsive-carousel').Carousel;


const AvatarCarousel = (props) =>{

        const onClickItem = (event) =>{
            console.log(event);
        }


        return (
            <Carousel clas
                showThumbs={false} showStatus={false}
                      className='carouselDiv'
                      showArrows={true}
                      onClickItem={onClickItem}
                      onClickThumb={onClickItem}
                      onChange={onClickItem}
                >
                {Avatars.map(avatar => (
                    <div className="slide" key={avatar.id}>
                        <img src={avatar.image}   alt=""/>
                    </div>

                ))}

            </Carousel>
        );
    }

export default AvatarCarousel