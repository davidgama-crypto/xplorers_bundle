# Room State Schema

Test Game Example Schema for Entire Room State

`GET /api/rooms/123`

Response Body:

```json


{
	"id": 123,
	"current": {
		"status": "waiting|playing|finished",
		"game": 0,
		"round": 1,
		"phase": 1,
		"phaseStartTime": 15123123,
		"phaseDuration": 30,
		"host": "aslkdj231sd",
		"players": {
			"aslkdj231sd": {
				"displayName": "shin",
				"selectedAvatar": "pig",
				"done": false,
				"connected": true
			},
			"aslkasdaf231sd": {
				"displayName": "david",
				"selectedAvatar": "human",
				"done": true,
				"connected": true
			}
		}
	},
	"totalScores": [{
			"playerId": "aslkasdaf231sd",
			"score": 10
		},
		{
			"playerId": "aslkdj231sd",
			"score": 50
		}
	],
	"totalGames": 0,
	"gameData": [{
		"type": "test",
		"totalRounds": 2,
		"totalPhases": 3,
		"phaseDurations": [
			1,
			5,
			5,
		],
		"rounds": [{
				"id": 0,
				"scoredPoints": {
					"aslkasdaf231sd": 200,
					"aslkdj231sd": 100
				},
				"initState": {},
				"playerState": {
					"aslkdj231sd": 1,
					"aslkasdaf231sd": 2
				}
			},
			{
				"id": 1,
				"scoredPoints": {},
				"initState": {},
				"playerState": {
					"aslkdj231sd": 1,
					"aslkasdaf231sd": 2
				}
			}
		]
	}]
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
