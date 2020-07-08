# Room State Schema

Test Game Example Schema for Entire Room State

```json
GET /api/rooms/123

Response Body:

{
 "id": 123,
 "current": {
   "game": 0, // first game
   "round": 1, // second round second round of current game
   "phase": 1, // second phase of current game
   "phaseStartTime": 15123123, // unix timestamp in seconds
   "phaseDuration": 30, // in seconds
   "players": {
   "shin": {
     "done": false,
     "connected": true
   },
   "david": {
     "done": true,
     "connected": true
   }
 },
 "totalScores": [ // ordered array by score
  {
   "name": "david",
   "score": 10,
  },
  {
   "name": "shin",
   "score": 50
  }
 ],
 "gameData": [
  {
    "type": "test",
    "totalRounds": 2,
    "totalPhases": 3,
    "rounds": [
      {
        "id": 0,
        "finished": true, // is the round done?
        "scoredPoints": {
          "david": 200, // ex. 100 * number of seconds left
          "shin": 100,
        },
        "initState": {}, // unique to each game
        "playerState": { // player state relevant to the game round
          "shin": 1, // how many seconds left on client's timer when press submit
          "david": 2
        }
      },
      {
        "id": 1,
        "finished": false, // is the round done?
        "scoredPoints": {},
        "initState": {},
        "playerState": { // player state relevant to the game round
          "shin": 1, // how many seconds left on client's timer when press submit
          "david": 2
        }
      },
    ]
  }
 ]
}
```

# Anagrams

Init State

Player State

# Tiles

Init State

Player State

# 2 Truths 1 Lie

Init State

Player State
