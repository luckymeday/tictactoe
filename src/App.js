import React, { Component } from 'react';
import Board from "./component/Board";
import SignInPage from "./component/SignInPage";
import "./App.css";
export default class App extends Component {

  // 1. facebook login
  // 2. see your name
  // 3. see the calculated score
  constructor(props) {
    super(props)
    this.state = {
      userName: "",
      nextPlayer: true, // true:X false:O
      winner: "",
      gameOver: false, // true: "Game Over"
      squareList: ["", "", "", "", "", "", "", "", ""],
      history: [],
      picture: "",
      rankingList: [],
    };
  }
  setParentsState = (obj) => {
    console.log("obj?", obj)
    this.setState(obj)
  };

  responseFacebook = (response) => {
    this.setState({ ...this.state, picture: response.picture.data.url, userName: response.name })
  };

  // when fetch, put async!
  postData = async () => {
    let data = new URLSearchParams();

    data.append("player", this.state.userName);
    data.append("score", 1);

    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      json: true
    });
    this.getData()
  }

  getData = async () => {
    let url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    let data = await fetch(url);
    let result = await data.json();
    console.log("result:",result)
    this.setState({ ...this.state, rankingList: result.items })
  }

  componentDidMount() {
    this.getData();
  }

  backToPast = (index) => {
    let past = this.state.history[index]
    this.setState({ ...this.state, squareList: past.squareList, nextPlayer: past.nextPlayer })
  };

  render() {
    return (
      <div>
        <div className="body border-red">
          <SignInPage responseFacebook={this.responseFacebook} />
          <h1>Tic Tac Toe</h1>
          <h3>User Name : {this.state.userName}</h3>
          <div><img src={this.state.picture} /></div>
          <h4> Next Player: {this.state.nextPlayer ? `X` : `O`}</h4>
          <h4> Winner: {this.state.winner}</h4>
          <h4> Game: {this.state.gameOver ? `Game Over` : `Gaming`}</h4>
          <div className="row">
            <div className="col-sm-8 border-red">
              <Board
                postData={this.postData}
                squareList={this.state.squareList}
                setParentsState={this.setParentsState}
                nextPlayer={this.state.nextPlayer}
                winner={this.state.winner}
                gameOver={this.state.gameOver}
                history={this.state.history}
                rankingList={this.getData}
              />
            </div>
            <div className="col-sm-4 border-red">
              <ol>
                <h4>
                  <p>History</p>
                  {this.state.history.map((record, index) => {
                    return (
                      <li>
                        <button onClick={() => this.backToPast(index)}>Go to: {index + 1}</button>
                      </li>
                    );
                  })}
                  <p>Ranking</p>
                  {this.state.rankingList.map((item, index) => {
                    return (
                      <li> {item.player} :{item.score}</li>
                    );
                  })}
                </h4>
              </ol>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

// useEffect === componentDidMount()
// useState === this.state={}
// setWinner() => this.setState()