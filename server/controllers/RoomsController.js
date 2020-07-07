const {nanoid} = require('nanoid')
const RedisClient = require("../utils/redisClient");

class RoomsController {

    async generateRoom(){
        const roomId  = nanoid();
        const roomJson = {
            roomId: roomId
        };

        //https://www.npmjs.com/package/redis-json
        const redisClient =  await RedisClient.getInstance();
        return await redisClient.set(roomId, roomJson).then(()=>{
            return roomId;
        });

    }

    async getRoom(roomId){
        console.log('getting key ' + roomId);
        //https://www.npmjs.com/package/redis-json
        return await RedisClient.getInstance().get(roomId);

    }
}


module.exports = RoomsController;
