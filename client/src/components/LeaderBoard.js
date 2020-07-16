import React from "react";
import PlayerScore from "./PlayerScore";
const LeaderBoard = (props) => {


    return(
        <div>
            <div>
                <h2>Leaderboard</h2>
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