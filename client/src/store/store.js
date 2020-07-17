import { createSlice, configureStore } from '@reduxjs/toolkit'
import APIRequestHandler from "../utils/ApiRequestHandler";
import Socket from '../utils/Socket'
import PlayerCache from '../utils/PlayerCache'


const gameRoom = createSlice({
  name: 'room',
  initialState: {
    loading: false,
    error: null,
    roomState: {}
  },
  reducers: {
    roomStateUpdating: (state) => {state.loading = true},
    roomStateUpdated: (state, {payload}) => {
      state.roomState = payload
      state.loading = false
      state.error = null
    },
    roomErrored: (state, {payload}) => {
      state.error = payload
      state.loading = false
    }
  }
})

/*
 * Async Thunk Actions
 */

// startNewGame() bootstraps a new game room with current user as host player
export function startNewGame() {
  return async (dispatch) => {
    try {
      // set status to loading
      dispatch(roomStateUpdating())
      // create a new room
      const {roomId} = await APIRequestHandler.createNewRoom()
      // add a player to that room
      const playerInfo = await APIRequestHandler.addPlayer(roomId)
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
      console.error(e)
      dispatch(roomErrored(e))
    }
  }
}


const store = configureStore({reducer: gameRoom.reducer})

export const {
  roomStateUpdating, roomStateUpdated, roomErrored
} = gameRoom.actions


export default store