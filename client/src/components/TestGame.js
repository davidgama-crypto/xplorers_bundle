import React from "react";
import {useSelector} from "react-redux";
import {fetchGameStatus, gamesSelector} from "../slices/GameStore";
import GameInstructions from "./GameInstructions";
import TestGamePhase from "./TestGamePhase";
import LeaderBoard from "./LeaderBoard";
import GameRoom from "./GameRoom";
import APIRequestHandler from "../utils/ApiRequestHandler";
import Socket from "../utils/Socket";

const TestGame = () => {
    //const dispatch = useDispatch()
    const { gameStatus } = useSelector(gamesSelector)

    const endTimeFunction = () =>{
        console.log('endTimeFunction');
    }

    const renderSwitch = () => {
        switch(gameStatus.current.phase) {
            case 0:
                return <GameInstructions gameTitle = {'Test Game'}
                                gameInstructions = { '1...... 2..... 3.....'}
                                time={gameStatus.current.phaseDuration}
                                endTime= {endTimeFunction}
                            />
            case 1:
                return <TestGamePhase gameTime = {gameStatus.current.phaseDuration} />
            case 2:
                return <LeaderBoard totalScores = {gameStatus.totalScores} />
            default:
                return <GameRoom />
        }
    }


    return(
        <div>
                {renderSwitch()}
        </div>

    );

}

export default TestGame