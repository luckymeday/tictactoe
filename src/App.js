import React, { Component } from 'react';
import Board from "./component/Board";
import SignInPage from "./component/SignInPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";




let timer;
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
      firstClick: true,
      elapsedTime: 0,
    };
  }

  setParentsState = (obj) => {
    console.log("obj?", obj)
    this.setState(obj)
  };

  stopTimer = () => {
    clearInterval(timer)
  }

  countTime = () => {
    timer = setInterval(() => this.setState({ elapsedTime: this.state.elapsedTime + 1 }), 1000)
  }

  responseFacebook = (response) => {
    this.setState({ ...this.state, picture: response.picture.data.url, userName: response.name })
  };

  // when fetch, put async!
  postData = async () => {
    let data = new URLSearchParams();

    data.append("player", this.state.userName);
    data.append("score", this.state.elapsedTime);

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
    console.log("result:", result)
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
      <div className="whole-part">
        <SignInPage responseFacebook={this.responseFacebook} className="sign-in" />
        <div className="body border-red">
          <h6> Elapsed Time :{this.state.elapsedTime}</h6>

          <h1>Tic Tac Toe</h1>
          <h3>User Name : {this.state.userName}</h3>
          <div><img src={this.state.picture} /></div>
          <h6> Next Player:
            {this.state.nextPlayer ?
              <img src="./mic.png" width="5%" alt="..."></img> :
              <img src="./min.png" width="5%" alt="..."></img>}
          </h6>
          <h6> Winner: {this.state.winner === "X" ? <img src="./mic.png" width="5%" alt="..."></img> :
            this.state.winner === "O" ? <img src="./min.png" width="5%" alt="..."></img> : ""}
          </h6>
          <h6> Game: {this.state.gameOver ? `Game Over` : `Gaming`}</h6>
          <div className="row">
            <div className="board-main col-sm-8 border-red">
              <Board
                countTime={this.countTime}
                postData={this.postData}
                squareList={this.state.squareList}
                setParentsState={this.setParentsState}
                nextPlayer={this.state.nextPlayer}
                winner={this.state.winner}
                gameOver={this.state.gameOver}
                history={this.state.history}
                rankingList={this.getData}
                firstClick={this.state.firstClick}
                stopTimer={this.stopTimer}

              />
            </div>
            <div className="col-sm-4 border-red">
              <ol>
                <h6>
                  <p>History</p>
                  {this.state.history.map((record, index) => {
                    return (
                      <li>
                        <button className="buttons" onClick={() => this.backToPast(index)}>Go to: {index + 1}</button>
                      </li>
                    );
                  })}
                  <p>Ranking</p>
                  {this.state.rankingList.map((item, index) => {
                    return (
                      <li> {item.player} :{item.score}</li>
                    );
                  })}
                </h6>
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

