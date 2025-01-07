import { useState } from "react"
import GameBoard from "./components/gameBoard"
import Player from "./components/Player"
import Log from "./components/log"
import { WINNING_COMBINATIONS } from "./winning_combinations"
import GameOver from "./components/gameOver"

function deriveActivePlayer(gameTurns){
  let currPlayer="X"

  if (gameTurns.length>0 && gameTurns[0].player==="X"){
        currPlayer="O"
  }

  return currPlayer
}

const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function deriveWinner(gameBoard,playersNames){
  let winner;
  // in each turn we iterate over the winning combinations to check if a winning combination happens
  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner=playersNames[firstSquareSymbol]
    }
  }
  return winner
}

function deriveGameboard(){
  
}


function App() {
  // we can getrid of the activePlayer state and we can derive(compute) 
  // the active player from the gameTurns state
  // const [activePlayer,setActivePlayer]=useState("X")

  const [gameTurns,setGameTurns]=useState([])  //gameTurns is an array of objects and each object is a turn
  const activePlayer=deriveActivePlayer(gameTurns)  // it will be updated in every turn (rerendering)

  const [playersNames,setPlayerNames]=useState({'X':'Player 1','O':'Player 2'}) // this state for showing the player name in game over screen

  // let gameBoard=[...initialGameBoard.map((array=>[...array]))]
  let gameBoard=[
    [null,null,null],
    [null,null,null],
    [null,null,null]
  ]

  console.log(gameBoard)
  // console.log(initialGameBoard)

  // this for loop will be executed if turns array is not empty and if it is empty gameBoard will still equal initialGameBoard
  for(const turn of gameTurns){
      const {square,player}=turn
      const {row,col}=square

      gameBoard[row][col]=player
  }

  const winner=deriveWinner(gameBoard,playersNames)

  // we have a draw if there are 9 turns and no winner
  const hasDraw= gameTurns.length==9 && !winner  

  // we want to make sure it is executed when a square button is selected
  function handleSquareSelect(rowIndex,colIndex){
    // setActivePlayer(currActivePlayer => currActivePlayer==="X" ? "O" : "X")
    
    setGameTurns(prevGameTurns=>{

      const currentPlayer=deriveActivePlayer(prevGameTurns)

      // we want to add the latest turn at the beginning of the array
      const updatedTurns=[{square:{row:rowIndex,col:colIndex},player:currentPlayer},...prevGameTurns]
      // we could use the activePlayer state and pass it to player in the object instead of doing that if condition above
      //  but we would not guarantee that the activePlayer is the latest state when changing the gameTurns,
      // so we did this, we check who is the current player every time. we should avoid merging two different states
      // look at setActivePlayer we gauarantee that currActivePlayer is the latest value

      return updatedTurns
    })
  }

  function handleRestart(){
    setGameTurns([])
  }


  function handlePlayerNames(symbol,newName){
      setPlayerNames({...playersNames,[symbol]:newName})
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer==="X"} onChangeName={handlePlayerNames}/>
          <Player name="Player 2" symbol="O" isActive={activePlayer==="O"} onChangeName={handlePlayerNames}/>
        </ol>
        {(winner || hasDraw)&& <GameOver winner={winner} onRematch={handleRestart} />}   {/* {winner? <GameOver />:null}  */}
        <GameBoard onSelectChange={handleSquareSelect} board={gameBoard}/>
      </div>
      <div>
        <Log turns={gameTurns}/>
      </div>
    </main>
  )
}

export default App
