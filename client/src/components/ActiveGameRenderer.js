import React from "react"
import { useRoomState} from '../store/store'
import TestGame from "./TestGame"
import Spinner from 'react-bootstrap/Spinner'

const ActiveGameRenderer = () => {

  console.debug('In ActiveGameRenderer render()')


  const { roomState } = useRoomState()
  const {gameData, current} = roomState

  const currentGame = gameData[current.game]
  const {type} = currentGame

  const renderGameType = (type) => {
    switch(type) {
      case "test":
        return <TestGame />
      default:
        return <Spinner />
    }
  }

  return (
    <>{renderGameType(type)}</>
  )
}

export default ActiveGameRenderer