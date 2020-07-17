import { createSlice } from '@reduxjs/toolkit'
import APIRequestHandler from "../utils/ApiRequestHandler";

// A slice for posts with our three reducers
const gameInfo = createSlice({
    name: 'gameInfo',
    initialState: {
        roomLoading: false,
        roomStatus: {},
        // maybe not necessary
        gameStatus: '',
        gameState: -1,
        gameView: ''

    },
    reducers: {
        roomLoading: (state) => state.loadingState = true,
        roomDoneLoading: (state) => state.loading = false,
        roomStateUpdated: (state, {payload}) => state.roomStatus = payload,
        // maybe not necessary
        getGameStatus: (state) => {
            return state;
        },
        setGameStatus:(state, {payload} ) =>{
            //state.gameState = 0;
            state.gameStatus = payload;
            //state.gameView = <TestGamePhase gameTime={ state.gameStatus.current.phaseDuration}/>
        },
        setInitialState: (state) => {
            state.gameStatus = ''
        }
    },
})

// The reducer
export default gameInfo.reducer
// Three actions generated from the slice
export const {roomLoading, roomDoneLoading, roomStateUpdated, getGameStatus, setGameStatus ,setInitialState} = gameInfo.actions

// A selector
export const gamesSelector = (state) => {
    return state.gameSlices;
}


// Asynchronous thunk action
export function fetchGameStatus() {
    return async (dispatch) => {
        try {
            const roomId = JSON.parse(localStorage.getItem('roomId'));
            console.log('fetching room:' + roomId);
            const response = await APIRequestHandler.getGameStatus(roomId);
            console.log('fetchGameStatus: ' + response)
            await dispatch(setGameStatus(response))
        } catch (error) {

        }
    }
}

export function initialState() {
    return async (dispatch) => {
        try {
            await dispatch(setInitialState())
        } catch (error) {

        }
    }
}