import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useRoomState } from '../store';
import TestGame from './TestGame';
import TruthsLieGame from './TruthsLieGame';

const ActiveGameRenderer = () => {
  console.debug('In ActiveGameRenderer render()');

  const { roomState } = useRoomState();
  const { gameData, current } = roomState;

  const currentGame = gameData[current.game];
  const { type } = currentGame;

  const renderGameType = (gameType) => {
    switch (gameType) {
      case 'TEST':
        return <TestGame />;
      case 'TRUTHS_LIES':
        return <TruthsLieGame roomState={roomState} />;
      default:
        return <Spinner />;
    }
  };

  return (
    <>{renderGameType(type)}</>
  );
};

export default ActiveGameRenderer;
