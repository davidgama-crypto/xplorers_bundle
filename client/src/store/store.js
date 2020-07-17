import { createSlice, configureStore } from '@reduxjs/toolkit'
import APIRequestHandler from "../utils/ApiRequestHandler";
import Socket from '../utils/Socket'
import PlayerCache from '../utils/PlayerCache'
import { useSelector } from 'react-redux';

/* Main slice definition */
const gameRoom = createSlice({
  name: 'room',
  initialState: {
    loading: false,
    error: null,
    roomId: null,
    roomState: null
  },
  reducers: {
    roomStateUpdating: (state) => {state.loading = true},
    roomStateUpdated: (state, {payload}) => {
      state.roomState = payload
      state.loading = false
      state.error = null
    },
    roomCreated: (state, {payload}) => {
      state.roomId = payload
      state.loading = false
      state.error = null
    },
    roomErrored: (state, {payload}) => {
      console.debug(payload)
      state.error = payload
      state.loading = false
    }
  }
})


export const {
  roomStateUpdating, roomStateUpdated, roomErrored, roomCreated
} = gameRoom.actions


/* Async Thunk Actions */

// startNewGame(): bootstraps a new game room with current user as host player
export function createNewRoom() {
  return async (dispatch) => {
    try {
      // set status to loading
      dispatch(roomStateUpdating())
      // create a new room and save to state
      const {roomId} = await APIRequestHandler.createNewRoom()
      dispatch(roomCreated(roomId))
    } catch(e) {
      // catch any errors then set the room state as errored
      dispatch(roomErrored(e))
    }
  }
}

// addPlayerToRoom(roomId): adds a new user to the given roomId
// if there is cached player info on the browser, use that as basis for the request
export function addPlayerToRoom(roomId) {
  const info = {displayName: 'defaultUser', avatar: 'pig'}

  if (PlayerCache.cachedInfoExists()) {
    const {displayName, avatar} = PlayerCache.getPlayerInfo()
    info.displayName = displayName
    info.avatar = avatar
  }

  return async (dispatch) => {
    try {
      console.debug('dispatching room/addPlayerToRoom')

      // set status to loading
      dispatch(roomStateUpdating())

      // add a player to that room
      const playerInfo = await APIRequestHandler.addPlayer(roomId, info)

      const {id, token} = playerInfo
      // with fetched user info authenticate via socket connection
      await Socket.authenticate({
        playerId: id,
        roomId, 
        token
      })

      // if successful, save user details in localStorage
      PlayerCache.cachePlayerInfo(playerInfo)
      // load the gameRoom info via API + token
      const roomState = await APIRequestHandler.getRoomState(roomId, token)
      // update the state with the fetched room state
      dispatch(roomStateUpdated(roomState))
    } catch(e) {
      // catch any errors then set the room state as errored
      dispatch(roomErrored(e))
    }
  }
}

// setCurrentPlayerReady(roomId, ready): sets the current user saved on browser's ready state 
export function setCurrentPlayerReady(roomId, ready) {
  const {id} = PlayerCache.getPlayerInfo()
  const token = PlayerCache.getPlayerToken()

  return async (dispatch) => {
    try {
      dispatch(roomStateUpdating())
      await APIRequestHandler.updatePlayerState(roomId, id, {
        ready
      }, token)

    } catch(e) {
      dispatch(roomErrored(e))

    }
  }
}

// setGames(roomId, games): sets the games for the target room
export function setGames(roomId, games) {
  const token = PlayerCache.getPlayerToken()
  return async (dispatch) => {
    try {
      dispatch(roomStateUpdating())
      await APIRequestHandler.addGames(roomId, games, token)

    } catch(e) {
      dispatch(roomErrored(e))

    }
  }
}

// reconnectPlayertoRoom(roomId): attempts to reconnect the player to the current room
// if this reconnect fails, the playerToken should be completely cleared
export function reconnectPlayerToRoom(roomId) {
  const {id} = PlayerCache.getPlayerInfo()
  const token = PlayerCache.getPlayerToken()
  return async (dispatch) => {
    try {
      console.debug('dispatching room/reconnectPlayerToRoom')
      // set status to loading
      dispatch(roomStateUpdating())

      // with fetched user info authenticate via socket connection
      // if this rejects, then we should clear the player token
      Socket.authenticate({
        playerId: id,
        roomId, 
        token
      })
      // load the gameRoom info via API + token
      const roomState = await APIRequestHandler.getRoomState(roomId, token)
      // update the state with the fetched room state
      dispatch(roomStateUpdated(roomState))
    } catch(e) {
      PlayerCache.clearPlayerToken()
      // catch any errors then set the room state as errored
      dispatch(roomErrored(e))
    }
  }
}


/* Utility functions */

export function useRoomState() {
  return useSelector((state) => state)
}

/* Store Configuration */

const store = configureStore({reducer: gameRoom.reducer})
export default store