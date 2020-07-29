import React, { Component } from 'react'
import Square from './Square'

// 1. calculate which is a winner, when you have a winner, show X is a winner 
// 2. if there is not a winner, show "Game Over" 
// 3. if the user tries to click the square that already is clicked, block it 
// 4. make a history

export default class Board extends Component {
    selectSquare = (id) => {
        if (this.props.firstClick) {
            this.props.countTime()
            this.props.setParentsState({ firstClick: false })
        }
this.setState({})

        let array = this.props.squareList.slice();
        let isGameOver = false // made this variable, cuz couldn't update directly this.props.gameOver(which is for read only)
        let historyArray = this.props.history.slice();

        if (this.props.squareList[id] !== "") {
            alert("Click another square!")
            return
        }
        if (this.props.gameOver) {
            alert("Game Over!")
            return
        }

        array[id] = this.props.nextPlayer ? "X" : "O";

        let winnerValue = this.calculateWinner(array);
        console.log('winnerValue:', winnerValue)
        if (winnerValue !== null) {
            this.props.postData();
        }

        if (winnerValue !== null) {
            isGameOver = true;
            this.props.stopTimer()

        }
        else if (winnerValue === null && !array.includes("")) {
            isGameOver = true;
            this.props.stopTimer()
        }

        historyArray.push({
            squareList: array,
            nextPlayer: !this.props.nextPlayer
        });

        this.props.setParentsState
            ({
                squareList: array,
                nextPlayer: !this.props.nextPlayer,
                winner: winnerValue,
                gameOver: isGameOver,
                history: historyArray,
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
        return (
            <div className="border-red">
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
            </div>
        )
    }
}
