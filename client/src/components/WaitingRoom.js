import React, {useEffect} from "react";
import APIRequestHandler from "../utils/ApiRequestHandler";
import { useDispatch, useSelector } from 'react-redux'
import {fetchGameStatus, gamesSelector} from '../slices/GameStore'
import Socket from '../utils/Socket'

const WaitingRoom  = () => {

    const dispatch = useDispatch()
    const { gameStatus } = useSelector(gamesSelector)

    useEffect( () => {
        // code to run on component mount
         APIRequestHandler.addPlayer()
            .then((json) => {
                console.log(json);
                localStorage.setItem('token',JSON.stringify(json.token));
                localStorage.setItem('playerId',JSON.stringify(json.id));
                //Socket.connect();
                Socket.authenticate();
                dispatch(fetchGameStatus())
            })
            .catch((error) =>{
                console.log(error)
                alert(error.error);
            })
    }, [])


    const updatePlayerStatus = () => {
        const playerStatus = JSON.stringify({
            ready: true
        });

        APIRequestHandler.updatePlayerState(playerStatus)
            .then((json) => {
                console.log(json)
            })
            .catch((error) =>{
                alert(error.error);
            })



    }

    const addGames= () =>{
        //TODO CHANGE FOR ACTUAL GAME SELECTION ALL THIS SECTION
        const playerId = JSON.parse(localStorage.getItem('playerId'));
        if(gameStatus.current.host === playerId){
            const games = JSON.stringify({
                games: [
                    {
                        type: 'test',
                        rounds: 1,
                    },
                ]
            });

            APIRequestHandler.addGames(games)
                .then( (response) =>{
                    console.log('success adding games')
                    console.log(response)
                })
                .catch((error) =>{
                    console.log(error)
                    alert(error);
                })
        }
    }

    const isHost=  ()=>{
        const playerId = JSON.parse(localStorage.getItem('playerId'));
        return gameStatus.current.host === playerId
    }


    return (
            <div>
                <button onClick={addGames} className='roomCreateBtn'>Add Games</button>
                 <button onClick={updatePlayerStatus} className='roomCreateBtn'>Ready</button>:
            </div>
        );

}

export default WaitingRoom;