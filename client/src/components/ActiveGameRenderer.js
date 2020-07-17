import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useRoomState } from '../store';
import TestGame from './TestGame';

const ActiveGameRenderer = () => {
  console.debug('In ActiveGameRenderer render()');

  const { roomState } = useRoomState();
  const { gameData, current } = roomState;

  const currentGame = gameData[current.game];
  const { type } = currentGame;

  const renderGameType = (gameType) => {
    switch (gameType) {
      case 'test':
        return <TestGame />;
      default:
        return <Spinner />;
    }
  };

  return (
    <>{renderGameType(type)}</>
  );
};

export default ActiveGameRenderer;
