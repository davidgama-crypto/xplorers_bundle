import * as SocketIO from 'socket.io-client'
import store, {roomStateUpdated} from '../store/store'

class Socket{
    socket;


    socketConnected(){
        console.debug('Socket IO - connect event');
    }

    updateGameStatus(state){
        console.debug('Socket IO - updated event');
        store.dispatch(roomStateUpdated(state));
    }


    connect = () => {



        const url = window.location.host.startsWith('localhost')
            ? 'http://localhost:3000/'
            : '/'

        console.debug('url: ' + url);
        this.socket = SocketIO.connect('/')

        // register listeners
        this.socket.on('connect', this.socketConnected);
        this.socket.on('updated', state => {
            this.updateGameStatus(state)
        })
    }

    close = () => {
        console.debug('Socket IO - closing....')
        if (this.socket) {
            this.socket.close()
            this.socket = undefined
        }
    }

    authenticate = ({roomId, playerId, token}) =>{

        console.debug(`authenticating socket roomId=${roomId}, playerId=${playerId}, token=${token}`)
        
        return new Promise((resolve, reject) => {
            this.socket.emit('authenticate', {
                playerId, roomId, token
            }, reply => {
                console.debug(`socket authenticate reply=${reply}`)
                if (reply === 'success') {
                    console.debug('socket auth resolving')
                    resolve(reply)
                } else {
                    console.debug('socket auth rejecting')
                    reject('Error: socket authenticate failed')
                }
            })
        })
    }




}

export default new Socket()
