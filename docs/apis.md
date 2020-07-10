# APIs

Docs for Backend APIs

# /api/bot

# /api/rooms

```
GET /api/rooms
: Create a new room

Request:

Response:

Body:

{
  "url": "https://bundle.app/rooms/123"
}

```

```
GET /api/rooms/:id
: Get the current room's state

Request:

Headers:
Authorization: Bearer <JWT> // check if token valid and UID is in the room

Response:

{ ... room schema ... }

```

```
PUT /api/rooms/:id
: Update a room's state

Request:

Headers:
Authorization: Bearer <JWT> // check if token valid and UID is in the room

Body:
{
  "current": { //make sure we are synced
    "game": 0,
    "round": 0,
    "phase": 0,
    "players": {
      "aslkdj231sd": { // update done state
        "done": true
      }
    }
  },
  "playerState": { // update the player state for current game/round/phase
    "aslkdj231sd": "asdfa"
  }
}

Response:
{ ... room schema ... }

```

# /api/rooms/:id/players

```
POST /api/rooms/:id/players

: User joins/rejoins the room, get JWT with UID

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
  "ready": false
}

=> this should also add the UID to room state with user info
=> updates to room state should trigger socket IO push with new room state to client

```

```
PUT /api/rooms/:id/players/:uid
: User changes ready state, display name, or avatar
Request:

Headers:
Authorization: Bearer <JWT> // check valid token also check if UID is in the room

Body:
{
  "displayName": "shin",
  "avatar": "human",
  "ready": true,
}

Response:
Status: 200

Body:

{
  "displayName": "shin",
  "avatar": "human",
  "ready": true,
}


=> this should also add the UID to room state with user info
=> updates to room state should trigger socket IO push with new room state to client


```

```
: User leaves the room

-> this should be handled via socket io close/disconnect event handler
-> remove the uid and user data from the room


=> this should also remove the UID to room state with user info
=> updates to room state should trigger socket IO push with new room state to client


```
