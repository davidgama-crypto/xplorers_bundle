import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import gameSlices from '../slices/GameStore'
const reducer = combineReducers({
    gameSlices
})
const store = configureStore({
    reducer,
})

export default store;