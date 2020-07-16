import React from "react";
import Timer from "./Timer";

const GameInstructions = (props) => {

    return(
        <div>
            <div>
                <h1 className='bundleTitle'>{props.gameTitle}</h1>
                <h2 className='bundleTitle'>How to play:</h2>
            </div>
            <div>
                <label className=''>{props.gameInstructions}</label>
            </div>
            <div>
                <Timer time={props.time}
                       endTime={props.endTime}
                />
            </div>
        </div>

    );

}

export default GameInstructions