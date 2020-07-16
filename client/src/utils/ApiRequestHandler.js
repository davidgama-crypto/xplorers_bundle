import request from "./request";

class APIRequestHandler {
    async getRoomId(){
        const  roomInformation = (await request(
            `/api/rooms`,
            {
                method: 'GET',
            }
        ))
        return roomInformation;
    }

    // requires auth
    async getGameStatus(roomId){
        const response  = await request(
            `/api/rooms/${roomId}`,
            {
                method: 'GET'
            }
        )

        return response;
    }


    // generates the token
    async addPlayer(){
        const roomId = JSON.parse(localStorage.getItem('roomId'));

        const playerInfo = JSON.stringify({
            displayName: 'DefaultName',
            avatar: 'pig'
        })

        const response  = await request(
            `/api/rooms/${roomId}/players`,
            {
                method: 'POST',
                body: playerInfo
            }
        )

        return response;
    }

    // requires auth
    async addGames(games){
        const roomId = JSON.parse(localStorage.getItem('roomId'));
        const { response } = (await request(
            `/api/rooms/${roomId}/games`,
            {
                method: 'PUT',
                body: games,
            }
        ))
        return response;
    }


    // requires auth
    async getPlayerInfo(){
        const roomId = JSON.parse(localStorage.getItem('roomId'));
        const playerId = JSON.parse(localStorage.getItem('playerId'));
        const { playerInformation } = (await request(
            `/api/rooms/${roomId}/players/${playerId}`,
            {
                method: 'GET',
            }
        ))
        return playerInformation;
    }


    // requires auth
    async updatePlayerState(playerState){
        const roomId = JSON.parse(localStorage.getItem('roomId'));
        const playerId = JSON.parse(localStorage.getItem('playerId'));
        const { response } = await request(
            `/api/rooms/${roomId}/players/${playerId}`,
            {
                method: 'PUT',
                body: playerState,
            }

        )
        return response;
    }
}


const singleton = new APIRequestHandler()

export default singleton