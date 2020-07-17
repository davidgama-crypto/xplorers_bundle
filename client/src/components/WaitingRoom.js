import React, {useEffect} from "react";
import APIRequestHandler from "../utils/ApiRequestHandler";
import { useDispatch, useSelector } from 'react-redux'
import {addPlayerToRoom, useRoomState, roomCreated, setCurrentPlayerReady, setGames} from '../store/store'
import Socket from '../utils/Socket'
import { useParams, useHistory } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import PlayerCache from "../utils/PlayerCache";

const WaitingRoom  = () => {

    console.debug('In WaitingRoom render()')

    const dispatch = useDispatch()
    const history = useHistory()
    const { error, roomState, roomId } = useRoomState()

    if (error) {
        alert('There was an error joining the room. Please create a new room.')
        history.push('/')
    }


    const info = PlayerCache.getPlayerInfo()
    const {id} = info
    console.debug('playerInfoFromLocalStorage')
    console.debug(id)
    console.debug(roomState)
    const {ready} = roomState.current.players[id]


    const togglePlayerReady = () => {
        const newReady = !ready
        dispatch(setCurrentPlayerReady(roomId, newReady))
    }

    const isHost = () => roomState.current.host === id

    const addGames= () =>{
        //TODO CHANGE FOR ACTUAL GAME SELECTION ALL THIS SECTION
        dispatch(setGames(roomId, {
            games: [
                {
                    type: 'test',
                    rounds: 1,
                },
            ]
        }))
    }

    return (
            <div>
                {isHost() ? <button onClick={addGames} className='roomCreateBtn'>Add Games</button> : null}
                
                 <button onClick={togglePlayerReady} className='roomCreateBtn'>Ready</button>:
            </div>
        );

}

export default WaitingRoom;