const {nanoid} = require('nanoid')

class RoomsController {

    async generateRoom(redisClient){
        const roomId  = nanoid();
        const roomJson = {
            roomId: roomId
        };

        //https://www.npmjs.com/package/redis-json
        return await redisClient.set(roomId, roomJson).then(()=>{
            return roomId;
        });

    }

    async getRoom(redisClient, roomId){
        console.log('getting key ' + roomId);
        //https://www.npmjs.com/package/redis-json
        return await redisClient.get(roomId);

    }
}


module.exports = RoomsController;
