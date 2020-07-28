import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {

    selectSquare = (id) => {
        if (this.props.squareList[id] !== "") {
            return
        }
        // console.log("id:", id)
        let historyList = (this.props.nextPlayer.length - 1).push
        console.log("history list:", historyList)
        // console.log("game over:", this.props.gameover)
        let isGameOver = false // made this variable, couldn't use props
        let array = this.props.squareList;
        array[id] = this.props.nextPlayer ? "X" : "O";
        // console.log("player:", this.props.nextPlayer)
        let winnerValue = this.calculateWinner(this.props.squareList);
        if (winnerValue !== null) { isGameOver = true }
        this.props.setParentsState
            ({
                squareList: array,
                nextPlayer: !this.props.nextPlayer,
                winner: winnerValue,
                gameover: isGameOver, // from the App.js
                history: historyList,
            });
    };

    calculateWinner(squares) {
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

    render() {
        // 1. calculate which is a winner, when you have a winner, show X is a winner //
        // 2. if there is not a winner, show "Game Over" //
        // 3. if the user tries to click the square that already is clicked, block it //
        // 4. make a history

        return (
            <div className="game">
                <h4> Next Player: {this.props.nextPlayer ? `X` : `O`}</h4>
                <h4> Winner: {this.props.winner}</h4>
                <h4> Game: {this.props.gameover ? <h1>Game Over</h1> : `Gaming`}</h4>
                <div style={{ display: "flex" }}>
                    <Square id={0} selectSquare={this.selectSquare} value={this.props.squareList[0]} />
                    <Square id={1} selectSquare={this.selectSquare} value={this.props.squareList[1]} />
                    <Square id={2} selectSquare={this.selectSquare} value={this.props.squareList[2]} />
                </div>
                <div style={{ display: "flex" }}>
                    <Square id={3} selectSquare={this.selectSquare} value={this.props.squareList[3]} />
                    <Square id={4} selectSquare={this.selectSquare} value={this.props.squareList[4]} />
                    <Square id={5} selectSquare={this.selectSquare} value={this.props.squareList[5]} />
                </div>
                <div style={{ display: "flex" }}>
                    <Square id={6} selectSquare={this.selectSquare} value={this.props.squareList[6]} />
                    <Square id={7} selectSquare={this.selectSquare} value={this.props.squareList[7]} />
                    <Square id={8} selectSquare={this.selectSquare} value={this.props.squareList[8]} />
                </div>
                <h4> History: <button className="history">



                </button></h4>
            </div >
        )
    }
}
