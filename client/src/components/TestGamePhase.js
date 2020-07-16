import React, {useEffect} from "react";
import Timer from "./Timer";
import APIRequestHandler from "../utils/ApiRequestHandler";

const TestGamePhase = (props) => {


    useEffect( () => {
        return () => {
           submitGameInfo();
        };
    })



    //Adding player to the game
    const submitGameInfo = async () =>{
        console.log('Submit game player result');
        const playerStatus = JSON.stringify({
            done: true
        });

        await APIRequestHandler.updatePlayerState(playerStatus)
            .then((json) => {
                console.log(json);
            })
            .catch((error) =>{
                console.log(error)
                alert(error.error);
            })
    }


    return(
        <div>
            <div>
                <Timer time={props.gameTime}
                       endTime={submitGameInfo}
                />
            </div>
            <div>
                <button onClick={submitGameInfo} className='roomCreateBtn'>Submit</button>

            </div>
        </div>

    );

}

export default TestGamePhase