

export default function GameBoard({onSelectChange,board}){

    
    // const [gameBoard,setGameBoard]=useState(initialGameBoard)

    // function handleSquareChange(row,col){

    //     setGameBoard((prevGameBoard)=>{
    //         const newGameBoard=[...prevGameBoard]
    //         newGameBoard[row][col]=activePlayerSymbol
    //         return newGameBoard
    //     })
    //     // is called when a square button is selected as handleSquareChange function is executed when a square is selected
    //     onSelectChange()
    // }

    return(
        <ol id="game-board">
            {board.map((row,rowIndex)=>{
                return (
                <li key={rowIndex}>
                    <ol>
                    {row.map((column,colIndex)=>{
                     return   (
                     <li key={colIndex}>
                            <button onClick={()=>onSelectChange(rowIndex,colIndex)} disabled={column}>{/* disabled==false if column=null (null return false) (before clicking on it), disabled==true if column==anything ("X" or "O") as they return true */}
                                {column}
                            </button>
                        </li>
                    )
                    })}
                    </ol>
                </li>)
            })}
        </ol>
    )
}
