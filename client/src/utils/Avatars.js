import bunnyAvatar from '../resources/bunny.png';
import duckAvatar from '../resources/duck.png';
import frogAvatar from '../resources/frog.png';
import manAvatar from '../resources/man.png';
import pigAvatar from '../resources/pig.png';
import womanAvatar from '../resources/woman.png';

const Avatars = [
  {
    id: 'BUNNY_AVATAR',
    image: bunnyAvatar,
  },
  {
    id: 'DUCK_AVATAR',
    image: duckAvatar,
  },
  {
    id: 'FROG_AVATAR',
    image: frogAvatar,
  },
  {
    id: 'MAN_AVATAR',
    image: manAvatar,
  },
  {
    id: 'PIG_AVATAR',
    image: pigAvatar,
  },
  {
    id: 'WOMAN_AVATAR',
    image: womanAvatar,
  },
];

export function getImageForAvatarId(avatarId) {
  const result = Avatars.find((e) => e.id === avatarId);
  if (result) return result.image;
  return undefined;
}

export default Avatars;
