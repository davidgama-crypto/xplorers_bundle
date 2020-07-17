import React, {useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {fetchGameStatus, gamesSelector} from "../slices/GameStore";
import WaitingRoom from "../components/WaitingRoom";
import TestGame from "../components/TestGame";
import {Redirect} from "react-router-dom";
import LeaderBoard from "../components/LeaderBoard";

const GameRoomPage = ({match}) => {
    const dispatch = useDispatch()

    const { gameStatus } = useSelector(gamesSelector)

    useEffect( () => {
        // code to run on component mount
        async function initLocalStorage() {     // You can await here
            console.log(match.params.id);
             await localStorage.removeItem("token");
             await localStorage.removeItem("roomId");
             await localStorage.setItem('roomId',JSON.stringify(match.params.id));
             await dispatch(fetchGameStatus())
        }
        initLocalStorage().then((r) => { console.log('finish')});

    }, [])

    const renderSwitch = () => {
            console.log(gameStatus)
            if (gameStatus === undefined || gameStatus === '' || gameStatus.current.status === 'waiting') {
                return <WaitingRoom />
            } else if (gameStatus.current.status === 'playing') {
                switch (gameStatus.current.game) {
                    case 0:
                        return <TestGame />
                    default:
                        return <GameRoomPage />
                }
            } else if(gameStatus.current.status === 'finished'){
                //TODO CHECK STATUS FINISHED ---> WHEN TEST GAME IS SUBMITED, THE GAME STATUS IS CHANGED TO FINISHED, AND PHASES RETURNED TO 0
                localStorage.removeItem("token");
                localStorage.removeItem("roomId");
                localStorage.removeItem("roomId");
                return <LeaderBoard totalScores = {gameStatus.totalScores} />
            } else{
                //removing game data to start  a new game
                localStorage.removeItem("token");
                localStorage.removeItem("roomId");
                localStorage.removeItem("roomId");
                return  <Redirect to="/" />
            }

    }


    return(
        <div>
            {renderSwitch()}
        </div>

    );

}

export default GameRoomPage