import React, {Component} from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
// import { Server } from "miragejs"
import Socket from "./utils/Socket";

// let server = new Server()
// server.get("/api/rooms", { url: "https://bundle.app/rooms/12345666",
//     roomId: 12345666 })
//
// server.get("/api/rooms/:id", (schema, request) => {
//     let id = request.params.id
//     console.log("id:" + id);
//
//     return {
//         "roomId": 123,
//         "current": {
//             "status": "waiting",
//             "game": 0, // first game
//             "round": 1, // second round second round of current game
//             "phase": 0, // second phase of current game
//             "phaseStartTime": 15123123, // unix timestamp in seconds
//             "phaseDuration": 6, // in seconds
//             "players": {
//                 "aslkdj231sd": { // randomly generated session GUID
//                     "displayName": "shin",
//                     "selectedAvatar": "pig",
//                     "done": false,
//                     "connected": true
//                 },
//                 "aslkasdaf231sd": {
//                     "displayName": "david",
//                     "selectedAvatar": "human",
//                     "done": true,
//                     "connected": true
//                 }
//             },
//             "totalScores": [ // ordered array by score
//                 {
//                     "name": "david",
//                     "score": 10,
//                 },
//                 {
//                     "name": "shin",
//                     "score": 50
//                 }
//             ],
//             "totalGames": 0,
//             "gameData": [
//                 {
//                     "type": "test",
//                     "instructions": "1. ........ ",
//                     "title": "Test Game",
//                     "totalRounds": 2,
//                     "totalPhases": 3,
//                     "rounds": []
//                 }
//             ]
//         }
//     }
// });
//
// server.post("/api/rooms/:id/players",
//     {
//         "uid": "rasdlkjglkj1l23jlksdjl",
//         "token": "asdlkjlkjasda.asdgasd.asd..",
//         "displayName": "DefaultName",
//         "avatar": "pig",
//         "ready": false,
//         "connected": "true",
//         "done": "false"
//     }
// )
//
//
// server.get("/api/rooms/:id/players/:playerId",
//     {
//         "id": "SvqUL_5PthfjvcIy-kkWC",
//         "displayName": "shin",
//         "avatar": "human",
//         "done": true,
//         "connected": true,
//         "ready": false
//     }
// )
//
//
// server.put("/api/rooms/:id/players/:playerId",
//     {
//         "id": "SvqUL_5PthfjvcIy-kkWC",
//         "displayName": "shin",
//         "avatar": "human",
//         "done": true,
//         "connected": true,
//         "ready": false
//     }
// )
//


class App extends Component {

    componentDidMount() {
        Socket.connect()
    }

    componentWillUnmount() {
        Socket.close()
    }

    render() {
        return (
            <div className="App">
                <MainPage />
            </div>
        )
    }
}

// function App() {
//   return (
//     <div className="App">
//       <MainPage />
//
//     </div>
//   );
// }

export default App;
