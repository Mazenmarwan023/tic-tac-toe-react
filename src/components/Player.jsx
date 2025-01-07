import { useState } from "react"

export default function Player({name,symbol,isActive,onChangeName}){
    
    const [playerInput,setPlayerInput]=useState(name)
    const [isEditing,setIsEditing]=useState(false)

    function handleInputChange(event){
        // console.log(event)
        setPlayerInput(event.target.value)
    }

    let btnText="Edit"
    if (isEditing){
        btnText="Save"
    }

    function toggleIsEditing(){
        // if (!isEditing){
        //     setIsEditing(true)
        // }else{
        //     setIsEditing(false)
        // }

        // setIsEditing(!isEditing)

        // this is prefered, it is like the example of doubling the count, it will take the latest state value
        setIsEditing(editing=>!editing)

        // id isEditing==true and i save the new name
        if(isEditing){
            onChangeName(symbol,playerInput)
        }
    }

    return(
        <li key={name} className={isActive? 'active': undefined}>
            <span className="player">
                {isEditing?(<input className="player-name" type="text" value={playerInput} onChange={handleInputChange}/>):
                (
                <span className="player-name">{playerInput}</span>
                )}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={toggleIsEditing}>{btnText}</button>
         </li>
    )
}