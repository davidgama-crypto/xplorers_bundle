import React, {useEffect} from "react";
import APIRequestHandler from "../utils/ApiRequestHandler";
import { useDispatch, useSelector } from 'react-redux'
import {addPlayerToRoom, useRoomState, roomCreated, setCurrentPlayerReady, setGames} from '../store/store'
import Socket from '../utils/Socket'
import { useParams, useHistory, Redirect } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import PlayerCache from "../utils/PlayerCache";

const WaitingRoom  = () => {

    console.debug('In WaitingRoom render()')

    const dispatch = useDispatch()
    const history = useHistory()
    const { error, roomState, roomId } = useRoomState()

    if (error) {
        alert('There was an error joining the room. Please create a new room.')
        return (
        <>
            <Redirect to="/" />
        </>
        )
    }

    // we did all the validation in the GameRoomPage
    const info = PlayerCache.getPlayerInfo()
    const {id} = info
    console.debug('playerInfoFromLocalStorage')
    console.debug(id)
    console.debug(roomState)
    const {current, gameData} = roomState
    const {players, host} = current
    const {ready} = players[id]
    const playerIds = Object.keys(players)
    const numberPlayers = playerIds.length

    const togglePlayerReady = () => {
        const newReady = !ready
        dispatch(setCurrentPlayerReady(roomId, newReady))
    }

    const isHost = () => host === id

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

    // TODO: replace selected games and user list with actual components
    return (
            <div>

                {isHost() ? <button onClick={addGames} className='roomCreateBtn'>Add Games</button> : null}
                
                <button onClick={togglePlayerReady} className='roomCreateBtn' disabled={numberPlayers === 1}>{ ready ? "Not Ready" : "Ready"}</button>
                <h1> Player Ready={String(ready)}</h1>
                <h1>Users: {numberPlayers}</h1>
                <ul>
                    {playerIds.map((e, i) => {
                        const playerInfo = players[e]
                        const {displayName, avatar} = playerInfo
                        return (
                            <li key={i}>{`${e}:${displayName}:${avatar}`}</li>
                        )
                    })} 
                </ul>
                <h1>Selected Games: {gameData.length}</h1>
                <ul>
                    {gameData.map((e, i) => <li key={i}>{e.type}</li>)}
                </ul>
            </div>
        );

}

export default WaitingRoom;