import React from "react";
import { useRoomState} from '../store/store'
import { useDispatch } from 'react-redux'
import GameInstructions from "./GameInstructions";
import TestGamePhase from "./TestGamePhase";
import LeaderBoard from "./LeaderBoard";
import GameRoom from "./GameRoom";
import APIRequestHandler from "../utils/ApiRequestHandler";
import Socket from "../utils/Socket";
import { Redirect } from "react-router-dom";

const TestGame = () => {
    //const dispatch = useDispatch()
    const { error, roomState, roomId } = useRoomState()


    const endTimeFunction = () =>{
        console.log('endTimeFunction');
    }

    const phaseRenderer = () => {
        switch(roomState.current.phase) {
            case 0:
                return (
                <GameInstructions 
                        gameTitle = {'Test Game'}
                        gameInstructions={ 'Press the button before the timer runs out! Starting in...'}
                        time={roomState.current.phaseDuration}
                        endTime={endTimeFunction}
                    />)
            case 1:
                return <TestGamePhase gameTime={roomState.current.phaseDuration} />
            case 2:
                return <LeaderBoard totalScores={roomState.totalScores} />
            default:
                return <Redirect to="/" />
        }
    }


    return(
        <div>
                {phaseRenderer()}
        </div>

    );

}

export default TestGame