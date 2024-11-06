import React, { useEffect } from 'react'
import { useState } from 'react'
import BoardComponent from '../BoardComponent/BoardComponent'
import './MainComponent.css'

const MainComponent = () => {

    const [grid, setGrid] = useState(9)
    const [board, setBoard] = useState(Array(grid).fill(' '))
    const [players, setPlayers] = useState(['X', 'O'])
    const [currentPlayer, setCurrentPlayer] = useState(players[0])
    const [status, setStatus] = useState(`onGoing : ${currentPlayer}'s turn`)
    const [stats, setStats] = useState(localStorage.getItem('stats') !== null ? JSON.parse(localStorage.getItem('stats')) : {X: 0, O: 0, Draw: 0})

    const changePlayer = () => {
        currentPlayer === players[0] ? setCurrentPlayer(players[1]) : setCurrentPlayer(players[0])
        if (status.includes('onGoing')) {
            setStatus(`onGoing : ${currentPlayer === 'X' ? 'O' : 'X'}'s turn`)
        }
        if (currentPlayer === 'X') {
            document.getElementById('O').style.backgroundColor = 'green'
            document.getElementById('X').style.backgroundColor = 'white'
            document.getElementById('X').style.color = 'black'
        } else {
            document.getElementById('X').style.backgroundColor = 'green'
            document.getElementById('O').style.backgroundColor = 'white'
            document.getElementById('O').style.color = 'black'
        }
    };

    const checkWinner = () => {
        let flag = false;
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        let hasWinner = false;
        winPatterns.forEach(pattern => {
            const [a, b, c] = pattern;
            if (board[a] === currentPlayer && board[a] === board[b] && board[a] === board[c]) {
                setStatus(`Winner : ${currentPlayer}`);
                hasWinner = true;
                flag = true;
                setStats(prevStats => ({ ...prevStats, [currentPlayer]: prevStats[currentPlayer] + 1 }));
                document.getElementById(a).style.backgroundColor = 'skyblue'
                document.getElementById(b).style.backgroundColor = 'skyblue'
                document.getElementById(c).style.backgroundColor = 'skyblue'
            }
        });

        if (!hasWinner && !board.includes(' ')) {
            setStatus('Draw');
            flag = true;
            setStats(prevStats => ({ ...prevStats, Draw: prevStats.Draw + 1 }));
        }

        if (flag) {
            document.getElementById('O').style.backgroundColor = 'white'
            document.getElementById('X').style.backgroundColor = 'white'
            document.getElementById('X').style.color = 'black'
            document.getElementById('O').style.color = 'black'
        }
    };

    useEffect(() => {
        localStorage.setItem('stats', JSON.stringify(stats));
    }, [stats]);

    const handleRestart = () => {
        for (let i = 0; i < grid; i++) {
            document.getElementById(i).style.backgroundColor = 'white'
        }
        setBoard(Array(grid).fill(' '))
        currentPlayer === 'O' ? setCurrentPlayer('O') : setCurrentPlayer('X')
        setStatus(`onGoing : ${currentPlayer}'s turn`)

        if(currentPlayer === 'X'){
            document.getElementById('X').style.backgroundColor = 'green'
            document.getElementById('X').style.color = 'black'
        } else {
            document.getElementById('O').style.backgroundColor = 'green'
            document.getElementById('O').style.color = 'black'
        }
    };

    return (
        <div id='outer'>
            <div id="status">
                <h2>Status : {status}</h2>
            </div>
            <div id="stats">
                <h2>Stats</h2>
                <p>X : {stats.X}</p>
                <p>O : {stats.O}</p>
                <p>Draw : {stats.Draw}</p>
            </div>
            <div className='main'>
                <div className='player' id='X'>
                    <h3>Player 1</h3>
                    <h3 className='symbol'>X</h3>
                </div>
                <BoardComponent board={board} currentPlayer={currentPlayer} status={status} changePlayer={changePlayer} checkWinner={checkWinner} />
                <div className='player' id='O'>
                    <h3>Player 2</h3>
                    <h3 className='symbol'>O</h3>
                </div>
            </div>
            <div id='restartButton'>{
                !status.includes('onGoing') ? <button onClick={() => {handleRestart()}}>Restart</button> : null
            }</div>
        </div>
    )
}

export default MainComponent