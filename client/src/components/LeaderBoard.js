import React from "react";
import PlayerScore from "./PlayerScore";
import {
    reconnectPlayerToRoom, useRoomState, roomCreated, playerJoiningRoom,
  } from '../store/store';
const LeaderBoard = (props) => {

    const { error, loading, roomState, roomId } = useRoomState()


    const title = roomState.current.status === 'finished' ? 'Final Leaderboard' : 'Leaderboard'

    return(
        <div>
            <div>
                <h2>{title}</h2>
            </div>
            <div>
                <ul >
                    {props.totalScores.map(playerScore => {
                        return (
                            <PlayerScore key={playerScore.playerId}
                                             name={playerScore.playerId}
                                             score={playerScore.score}
                            />
                        )
                    })}
                </ul>
            </div>
        </div>

    );

}

export default LeaderBoard