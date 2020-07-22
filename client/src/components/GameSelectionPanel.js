import React from 'react';
import '../css/GameSelectionPanel.css';
import { useDispatch } from 'react-redux';
import { setGames, useRoomState } from '../store';
import { GAMES_CATALOG } from '../utils/GamesCatalog';

const GameSelectionPanel = (props) => {
  const dispatch = useDispatch();
  const { roomState, roomId } = useRoomState();
  const getGameFromArray = (gameArray, gameSelected) => gameArray.type === gameSelected;
  const removeGameFromArray = (gameArray, gameRemoved) => gameArray.type !== gameRemoved;

  const validateSelected = (gameSelected) => {
    const arrayFiltered = roomState.gameData.filter((data) => getGameFromArray(data, gameSelected));
    return arrayFiltered.length === 1;
  };
  const handleOnClick = (idGameSelected) => () => {
    console.debug(idGameSelected);
    if (props.isHost) {
      const element = document.getElementById(idGameSelected);
      const gamesSelectedArray = roomState.gameData;
      let arrayFiltered = [];
      if (element.classList.toggle('greenMark')) {
        // Adding Games
        const gameData = {
          type: idGameSelected,
          rounds: 1,
        };
        if (gamesSelectedArray === undefined || gamesSelectedArray.length === 0) {
          arrayFiltered.push(gameData);
        } else {
          gamesSelectedArray.push(gameData);
          arrayFiltered = gamesSelectedArray;
        }
      } else {
        // Removing Game
        // eslint-disable-next-line max-len
        arrayFiltered = roomState.gameData.filter((data) => removeGameFromArray(data, idGameSelected));
      }
      dispatch(setGames(roomId, { games: arrayFiltered }));
    }
  };
  return (
    <div className="gameSelectionGrid">
      <div className="gameSelectionDiv">
        {GAMES_CATALOG.map((game) => (
          <div key={game.id}>
            <div id={game.id} className={(validateSelected(game.id) ? 'gameSelectTestDiv greenMark' : 'gameSelectTestDiv')} onClick={handleOnClick(game.id)} />
            <label htmlFor={game.id}>{game.name}</label>
          </div>
        ))}

      </div>
    </div>
  );
};

export default GameSelectionPanel;
