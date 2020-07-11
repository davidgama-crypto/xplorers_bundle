# API Design

Docs for Backend API Design


# Use Cases

- [x] Creating a new game room
- [x] Adding a new player to a game room
- [x] Players can update their information in a room
- [x] Players can toggle their status for "ready to play"
- [x] First player to join the room becomes Host of the room
- [ ] Host can update game settings like which games to play
- [ ] When all players are "ready" the game starts automatically
- [ ] When player is disconnected a player is removed from the game room
- [ ] When game state is updated by the server or other players, all players are notified dynamically
- [ ] When the last player is "done" with the current phase, the game state is progressed automatically to the next phase for all players simultaneously


# /api/rooms

```
GET /api/rooms

Description:

Create a new room

Request:

Response:

Body:

{
  "roomId": "A07j3KVybASMO1bkBavOv",
  "url": "http://localhost:3005/rooms/A07j3KVybASMO1bkBavOv"
}

```

# /api/rooms/:roomId

```
GET /api/rooms/:roomId

Description:

Get the current room's state

Request:

Headers:
Authorization: Bearer <JWT> // check if token valid and UID is in the room

Response:

{ ... room schema ... }

```

```
PUT /api/rooms/:roomId

Description: 

Update a game room's state. 
If host, can update the types of games selected for play
If player, can update their playerState


Request:

Headers:
Authorization: Bearer <JWT> // check if token valid and UID is in the room

Body:
{
  "playerState": { // update the player state for current game/round/phase
    "aslkdj231sd": "asdfa"
  }
}

Response:
{ ... room schema ... }

```

# /api/rooms/:roomId/players

```
POST /api/rooms/:roomId/players


Description:

player joins/rejoins the room, get JWT with UID

Request:
Body:
{
  "displayName": "DefaultName", // fetch from localstorage cache
  "avatar": "pig",
}

Response:
Body:

{
  "uid": "rasdlkjglkj1l23jlksdjl",  // cache payload in localstorage
  "token": "asdlkjlkjasda.asdgasd.asd.."
  "displayName": "DefaultName",
  "avatar": "pig",
  "ready": false,
  "connected": "true",
  "done": "false"
}

Notes:

- this should also add the UID to room state with player info
- updates to room state should trigger socket IO push with new room state to client

```

# /api/rooms/:roomId/players/:playerId

```
GET /api/rooms/:roomId/players/:playerId

Description:

Get info about player in a room

Request:
Header:
Authorization: Bearer <JWT>

Response:
Status: 200
Body:

{
    "id": "SvqUL_5PthfjvcIy-kkWC",
    "displayName": "shin",
    "avatar": "human",
    "done": true,
    "connected": true,
    "ready": false
}


```

```
PUT /api/rooms/:roomId/players/:playerId

Description:

  player changes ready state, display name, or avatar

Request:

Headers:
Authorization: Bearer <JWT> // check valid token also check if playerId is in the room

Body:
{
  "displayName": "shin",
  "avatar": "human",
  "ready": true,
  "done": false,
}

Response:
Status: 200

Body:

{
    "id": "SvqUL_5PthfjvcIy-kkWC",
    "displayName": "shin",
    "avatar": "human",
    "done": true,
    "connected": true,
    "ready": false
}

Notes:

- this should also add the UID to room state with player info
- updates to room state should trigger socket IO push with new room state to client


```

```

Description:

player leaves the room

-> this should be handled via socket io close/disconnect event handler
-> remove the uid and player data from the room


Notes:

- this should also remove the UID to room state with player info
- updates to room state should trigger socket IO push with new room state to client


```
