import React, { Component } from 'react';
import Board from "./component/Board";
import "./App.css";
export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "Jeesun Lee",
      nextPlayer: true, //true:X false:O
      winner: "",
      gameover: false, //true: "Game Over"
      squareList: ["", "", "", "", "", "", "", "", ""],
      history: ""
    };
  }

  setParentsState = (obj) => {
    console.log("obj?", obj)
    this.setState(obj)
  };

  render() {
    return (
      <div>
        <h1>Tic Tac Toe</h1>
        <h3>User Name : {this.state.username}</h3>
        <Board
          squareList={this.state.squareList}
          setParentsState={this.setParentsState}
          nextPlayer={this.state.nextPlayer}
          winner={this.state.winner}
          gameover={this.state.gameover}
          history={this.state.history} />
        <ol>Ranking</ol>
      </div>
    );
  }
}


// useEffect === componentDidMount()
// useState === this.state={}
// setWinner() => this.setState()