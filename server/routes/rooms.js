const RoomsController = require("../controllers/RoomsController")

const express = require("express")
const router = express.Router()
const serverURL = process.env.SELF_DOMAIN

if (!serverURL) {
  console.error("SELF_DOMAIN env var not set!")
  process.exit(1)
}

// Create a new room
router.get("/", async (req, res) => {
  const roomId = await RoomsController.generateRoom()
  const url = serverURL + "/" + roomId
  res.json({ url: url })
})

// Get the a specific room's state
router.get("/:id", async (req, res) => {
  const roomId = await RoomsController.getRoom(req.params.id)
  res.json(roomId)
})

// Update a specific room's state

// User joins/rejoins the room

// User changes their ready state, display name, or avatar

// User leaves the room

module.exports = router
