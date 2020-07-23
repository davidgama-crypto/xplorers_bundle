import React from 'react';
import TruthsLieSelection from './TruthsLieSelection';
import '../css/TruthLieResult.css';
import { getImageForAvatarId } from '../utils/Avatars';

const TruthLieResult = ({
  questions, playerName, playerId, playerChoices, players,
}) => {
  let otherPlayerIds = Object.keys(players);
  otherPlayerIds = otherPlayerIds.filter((id) => id !== playerId);
  const avatarRows = [[], [], []];

  otherPlayerIds.forEach((id) => {
    const choiceNumber = playerChoices[id];
    const avatars = avatarRows[choiceNumber];
    const theirAvatar = players[id].avatar;
    avatars.push(theirAvatar);
  });

  const renderAvatarRow = (index, avatarRowsArray) => {
    const imagesForRow = avatarRowsArray[index].map((id) => {
      const image = getImageForAvatarId(id);

      return <img src={image} alt="avatar" className="avatarRowImage" />;
    });

    return imagesForRow;
  };

  return (
    <div className="answerWrapper">
      <div className="playerChoicesSection">
        <div className="avatarChoiceRow">Choices</div>
        <div className="avatarChoiceRow">{renderAvatarRow(0, avatarRows)}</div>
        <div className="avatarChoiceRow">{renderAvatarRow(1, avatarRows)}</div>
        <div className="avatarChoiceRow">{renderAvatarRow(2, avatarRows)}</div>
      </div>
      <div className="questionsSelectionSection">
        <TruthsLieSelection
          questions={questions}
          playerName={playerName}
          playerId={playerId}
          readOnly
        />
      </div>

    </div>
  );
};

export default TruthLieResult;
