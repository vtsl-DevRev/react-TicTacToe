import React, { useEffect, useState } from 'react'
import SuperBoardComponent from '../SuperBoardComponent/SuperBoardComponent';
import './SuperComponent.css'

const SuperComponent = () => {

    const [board, setBoard] = useState(Array(9).fill(' ').map(() => Array(9).fill(' ')));
    const [players, setPlayers] = useState(['X', 'O']);
    const [currentPlayer, setCurrentPlayer] = useState(players[0]);
    const [status, setStatus] = useState(`onGoing : ${currentPlayer}'s turn`);
    const [localGameStatus, setLocalGameStatus] = useState(Array(9).fill(' '));
    const [ superStats, setSuperStats] = useState(localStorage.getItem(' superStats') !== null ? JSON.parse(localStorage.getItem(' superStats')) : { X: 0, O: 0, Draw: 0 });

    useEffect(() => {
        highlightTurn();
    }, [currentPlayer]);

    useEffect(() => {
        localStorage.setItem(' superStats', JSON.stringify( superStats));
    }, [ superStats]);

    // useEffect(() => {
    //     board.forEach((localGame, index) => {
    //         for (let i = 0; i < 9; i++) {
    //             if(localGameStatus[index] === 'X' || localGameStatus[index] === 'O') {
    //                 document.getElementById(`${index}${i}`).style.backgroundColor = localGameStatus[index] === 'X' ? 'lightgreen' : 'skyblue';
    //             }
    //         }
    //     });
    // }, [localGameStatus]);


    const highlightTurn = () => {
        if(currentPlayer === 'X'){
            document.getElementById('sX').style.backgroundColor = 'green';
            document.getElementById('sX').style.color = 'white';
            document.getElementById('sO').style.backgroundColor = 'white';
            document.getElementById('sO').style.color = 'black';
        } else {
            document.getElementById('sO').style.backgroundColor = 'green';
            document.getElementById('sO').style.color = 'white';
            document.getElementById('sX').style.backgroundColor = 'white';
            document.getElementById('sX').style.color = 'black';
        }
    };

    const changePlayer = () => {
        currentPlayer === players[0] ? setCurrentPlayer(players[1]) : setCurrentPlayer(players[0]);
        if (status.includes('onGoing')) {
            setStatus(`onGoing : ${currentPlayer === 'X' ? 'O' : 'X'}'s turn`);
        }
    };

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        board.forEach((localGame,index) => {
            let hasWinner = false;
            winPatterns.forEach(pattern => {
                const [a, b, c] = pattern;
                if (localGame[a] === currentPlayer && localGame[a] === localGame[b] && localGame[a] === localGame[c]) {
                    hasWinner = true;
                    localGameStatus[index] = currentPlayer;
                    setLocalGameStatus([...localGameStatus]);
                    for (let i = 0; i < 9; i++) {
                        document.getElementById(`${index}${i}`).style.backgroundColor = currentPlayer === 'X' ? 'lightgreen' : 'skyblue';
                    }
                    document.getElementById(`${index}${a}`).style.backgroundColor = currentPlayer === 'X' ? '#2ee62e' : '#00c8ff';
                    document.getElementById(`${index}${b}`).style.backgroundColor = currentPlayer === 'X' ? '#2ee62e' : '#00c8ff';
                    document.getElementById(`${index}${c}`).style.backgroundColor = currentPlayer === 'X' ? '#2ee62e' : '#00c8ff';
                }
            });

            if(!hasWinner && !localGame.includes(' ')) {
                localGameStatus[index] = 'D';
            }
        });

        let xCount = 0;
        let oCount = 0;
        let drawCount = 0;
        let result = 0;

        localGameStatus.forEach(status => {
            if (status === 'X') {
                xCount++;
                result++;
            } else if (status === 'O') {
                oCount++;
                result++;
            } else if (status === 'D') {
                drawCount++;
                result++;
            }
        });
        
        if (result === 9) {
            if(xCount > oCount) {
                setStatus(`Winner : X (${xCount} - ${oCount})`);
                setSuperStats(prevStats => ({ ...prevStats, X: prevStats.X + 1 }));
            } else if (xCount < oCount) {
                setStatus(`Winner : O (${oCount} - ${xCount})`);
                setSuperStats(prevStats => ({ ...prevStats, O: prevStats.O + 1 }));
            } else {            
                setStatus('Draw');
                setSuperStats(prevStats => ({ ...prevStats, Draw: prevStats.Draw + 1 }));
            }
        }
    };

    const handleRestart = () => {
        setBoard(Array(9).fill(' ').map(() => Array(9).fill(' ')));
        setCurrentPlayer(currentPlayer);
        setStatus(`onGoing : ${currentPlayer}'s turn`);
        setLocalGameStatus(Array(9).fill(' '));
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                document.getElementById(`${i}${j}`).style.backgroundColor = 'white';
            }
        }
    };

    return (
        <div id='superOuter'>
            <div id="superStatus">
                <h2>Status : {status}</h2>
            </div>
            <SuperBoardComponent board={board} currentPlayer={currentPlayer} localGameStatus={localGameStatus} status={status} changePlayer={changePlayer} checkWinner={checkWinner}/>
            <div id='superRestartButton'>{
                !status.includes('onGoing') ? <button onClick={() => { handleRestart() }}>Restart</button> : null
            }</div>
            <div id='super'>
                <div className='superPlayer' id='sX'>
                    <h3>Player 1</h3>
                    <h3 className='symbol'>X</h3>
                </div>
                <div className='superPlayer' id='sO'>
                    <h3>Player 2</h3>
                    <h3 className='symbol'>O</h3>
                </div>
                <div id="superStats">
                    <h2> superStats</h2>
                    <p>X : { superStats.X} | O : { superStats.O} | Draw : { superStats.Draw}</p>
                </div>
            </div>
        </div>
    )
}

export default SuperComponent