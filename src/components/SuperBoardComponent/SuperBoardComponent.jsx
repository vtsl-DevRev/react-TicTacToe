import React from 'react'
import './SuperBoardComponent.css'

const SuperBoardComponent = ({ board, currentPlayer, changePlayer, localGameStatus, status, checkWinner }) => {
  return (
    <div className='superBoard'>{
        board.map((localGame, index) => {
            return (
                <div className='localGame' key={index} id={index}>{
                    localGame.map((cell, localIndex) => {
                        return (
                            <div className='cell' key={localIndex} id={`${index}${localIndex}`} onClick={() => {
                                // console.log(localGameStatus);
                                
                                if (status.includes('onGoing') && localGameStatus[index] == ' ') {
                                    if (cell === ' ') {
                                        localGame[localIndex] = currentPlayer
                                        changePlayer();
                                        document.getElementById(`${index}${localIndex}`).style.backgroundColor = currentPlayer === 'X' ? 'lightgreen' : 'skyblue'
                                    }
                                    checkWinner();
                                }
                            }}>
                                <h3>{cell}</h3>
                            </div>
                        )
                    })
                }</div>
            )
        })
    }</div>
  )
}

export default SuperBoardComponent