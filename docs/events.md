# Docs for Backend socket events

This describes supported socketIO events in the backend.

- [x] When a player client sends connected event, they should send their authentication token in order to be properly "connected" to the game room
- [ ] When player is disconnected, a player is removed from the game room
- [x] When game state is updated by the server or other players, all players are notified dynamically
- [x] When all players "done" with the current phase, the game state is progressed automatically to the next phase for all players simultaneously
- [ ] When a phase starts, if player do not respond with "done" within the phaseDuration time, the server updates the room state to the next phase automatically and issues an update

# on `connect` event

Player joins or reconnects to a room

##### Flow

- Client emits to server, server to client when successful connection is made
- Emit is done automatically by socketIO code.
- Handler is on both client/server code.


# on `authenticate` event 

Client sends server auth token after successfuly connection. If valid payload is received, the player client's socket is added to the game room.

##### Flow

- Client emits to Server. 
- Emit code is on client. 
- Handler is on server code.

##### Message Payload

```json

{
  "roomId": "<string>",
  "playerId": "<string>",
  "token": "<jwt string>"
}

```

# on `disconnect` event 

Player leaves or becomes disconnected to a room. Player socket is removed from the game room. This event

##### Flow

- Emitted on server automatically when heartbeat fails. 
- Handler is on server.

# on `updated` event

The game room state was updated. All player sockets receive an `updated` event with the game room's state as the message payload.

##### Flow

- Server emits to Client. 
- Emit code is on server.
- Handler is on client.

###### Messsage Payload

```
{... room state schema ...}
```

