import React, { useState, useEffect } from "react";

import { CSSTransitionGroup } from "react-transition-group";

import { calculateWinner } from "../utils";

import Board from "./Board";

export default function GamePage(props) {
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const [highScores, setHighScores] = useState([]);
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);

    const fetchScores = async () => {
        try {
            const response = await fetch(
                "https://ftw-highscores.herokuapp.com/tictactoe-dev"
            );
            const data = await response.json();
            setHighScores(data.items);
        } catch (error) {
            console.log("Error", error);
        }
    };

    const postGameScore = async () => {
        let data = new URLSearchParams();

        data.append("player", props.currentUser.name || "Anonymous");
        data.append("score", -1565775172357);

        const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
        const config = {
            json: true,
            method: "POST",
            body: data.toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        const response = await fetch(url, config);
        const gogo = await response.json();
    };

    const removeOneScore = id => {
        const newScores = highScores.filter(score => score._id !== id);
        setHighScores(newScores);
    };

    useEffect(() => {
        fetchScores();
    }, []);

    // ============================================================================================
    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
    // ============================================================================================
    const handleClick = i => {
        let newHistory = history.slice(0, stepNumber + 1);
        let current = newHistory[newHistory.length - 1];
        let squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? "X" : "O";
        setHistory(newHistory.concat([{ squares: squares }]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    };
    // ============================================================================================
    const moves = history.map((step, move) => {
        const desc = move ? "Go to move #" + move : "Go to game start";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    const jumpTo = step => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

// ============================================================================================
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <div className="row">
            <div className="col-md-8">
                <h1>{props.currentUser.name}</h1>
                <Board
                    squares={current.squares}
                    someoneWon={postGameScore}
                    handleClick={handleClick}
                />
            </div>
            <div className="col-md-4 h-90 d-flex flex-column">
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <CSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    <ul>
                        {highScores.map(score => {
                            return (
                                <li key={score._id} onClick={() => removeOneScore(score._id)}>
                                    {score.player} got a {score.score}
                                </li>
                            );
                        })}
                    </ul>
                </CSSTransitionGroup>
            </div>
        </div>
    );
}
