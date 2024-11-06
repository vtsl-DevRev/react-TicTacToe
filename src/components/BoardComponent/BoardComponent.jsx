import React from 'react'
import './BoardComponent.css'

const BoardComponent = ({ board, currentPlayer, changePlayer, status, checkWinner }) => {

    return (
        <div className='board'>{
            board.map((cell, index) => {
                return (
                    <div className='cell' key={index} id={index} onClick={() => {
                        if (status.includes('onGoing')) {
                            if (cell === ' ') {
                                board[index] = currentPlayer
                                changePlayer();
                            }
                            checkWinner();
                        }
                    }}>
                        <h3>{cell}</h3>
                    </div>
                )
            })
        }</div >
    )
}

export default BoardComponent