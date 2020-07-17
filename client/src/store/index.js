import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import APIRequestHandler from '../utils/ApiRequestHandler';
import Socket from '../utils/Socket';
import PlayerCache from '../utils/PlayerCache';

/* Main slice definition */
const gameRoom = createSlice({
  name: 'room',
  initialState: {
    loading: false,
    error: null,
    roomId: null,
    roomState: null,
  },
  reducers: {
    roomStateUpdating: (state) => { state.loading = true; },
    roomStateUpdated: (state, { payload }) => {
      state.roomState = payload;
      state.loading = false;
      state.error = null;
    },
    roomCreated: (state, { payload }) => {
      state.roomId = payload;
      state.loading = false;
      state.error = null;
    },
    roomErrored: (state, { payload }) => {
      state.error = {
        message: payload.message.toString(),
      };
      state.loading = false;
    },
  },
});

export const {
  roomStateUpdating, roomStateUpdated, roomErrored, roomCreated,
} = gameRoom.actions;

/* Async Thunk Actions */

// startNewGame(): bootstraps a new game room with current user as host player
export function createNewRoom() {
  return async (dispatch) => {
    try {
      // set status to loading
      dispatch(roomStateUpdating());
      // create a new room and save to state
      const { roomId } = await APIRequestHandler.createNewRoom();
      dispatch(roomCreated(roomId));
    } catch (e) {
      // catch any errors then set the room state as errored
      console.error(e);
      dispatch(roomErrored(new Error('Something went wrong while creating the room')));
    }
  };
}

// playerJoiningRoom(roomId): adds a new user to the given roomId
// if there is cached player info on the browser, use that as basis for the request
export function playerJoiningRoom(roomId) {
  let info = { displayName: 'defaultUser', avatar: 'pig' };

  if (PlayerCache.cachedInfoExists()) {
    info = PlayerCache.getPlayerInfo();
  }

  return async (dispatch) => {
    try {
      console.debug('dispatching room/playerJoiningRoom');

      // set status to loading
      dispatch(roomStateUpdating());

      // add a player to that room
      const playerInfo = await APIRequestHandler.addPlayer(roomId, info);

      const { id, token } = playerInfo;
      // with fetched user info authenticate via socket connection
      await Socket.authenticate({
        playerId: id,
        roomId,
        token,
      });

      // if successful, save user details in localStorage
      PlayerCache.cachePlayerInfo(playerInfo);
      // load the gameRoom info via API + token
      const roomState = await APIRequestHandler.getRoomState(roomId, token);
      // update the state with the fetched room state
      dispatch(roomStateUpdated(roomState));
    } catch (e) {
      // catch any errors then set the room state as errored
      console.error(e);
      dispatch(roomErrored(new Error('Something went wrong while player was joining the room')));
    }
  };
}

// setCurrentPlayerReady(roomId, ready): sets the current user saved on browser's ready state
export function setCurrentPlayerReady(roomId, ready) {
  const { id } = PlayerCache.getPlayerInfo();
  const token = PlayerCache.getPlayerToken();

  return async (dispatch) => {
    try {
      dispatch(roomStateUpdating());
      await APIRequestHandler.updatePlayerInfo(roomId, id, {
        ready,
      }, token);
    } catch (e) {
      console.error(e);
      dispatch(roomErrored(new Error('Something went wrong while toggling player ready')));
    }
  };
}

// setGames(roomId, games): sets the games for the target room
export function setGames(roomId, games) {
  const token = PlayerCache.getPlayerToken();
  return async (dispatch) => {
    try {
      dispatch(roomStateUpdating());
      await APIRequestHandler.addGames(roomId, games, token);
    } catch (e) {
      dispatch(roomErrored(e));
    }
  };
}

/* Utility functions */

export function useRoomState() {
  return useSelector((state) => state);
}

/* Store Configuration */

const store = configureStore({ reducer: gameRoom.reducer });
export default store;
