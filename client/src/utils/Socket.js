import * as SocketIO from 'socket.io-client'
import store from '../store'
import {fetchGameStatus} from "../slices/GameStore";

class Socket{
    socket;


    socketConnected(){
        console.log('Socket IO is connected');
    }

    updateGameStatus(){
        console.log('Socket IO  - updateGameStatus');
        store.dispatch(fetchGameStatus());
    }


    connect = () => {

        console.log('in conncect');
        const playerId =  JSON.parse(localStorage.getItem('playerId'));
        const token =  JSON.parse(localStorage.getItem('token'));
        const gameInfo = JSON.parse(localStorage.getItem('document'));


        console.log('gameInfo' + gameInfo);
        console.log(playerId);
        console.log(token);
        // if ( !playerId || !token || !gameInfo) {
        //     return
        // }


        const url = window.location.host.startsWith('localhost')
            ? 'localhost:3000/'
            : '/'

        console.log('url: ' + url);
        this.socket = SocketIO.connect(url)

        // authenticate
        this.socket.emit('connect', () =>{
         console.log('emit connected')
        })




        // register listeners
        this.socket.on('connect', this.socketConnected);
        this.socket.on('updated', this.updateGameStatus);

        console.log(this.socket)

    }

    close = () => {
        if (this.socket) {
            this.socket.close()
            this.socket = undefined
        }
    }

    authenticate = async({roomId, playerId, token}) =>{
        return new Promise(resolve => {
            this.socket.emit('authenticate', {
                playerId, roomId, token
            }, () => {
                console.debug('successfully authenticated socket connection')
                resolve()
            })
        })
   
        
    }




}

export default new Socket()
