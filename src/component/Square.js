import React, { Component } from 'react'

export default class Square extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         value: "",
    //     }
    // }

    // -> move to Board.js
    // selectSquare = () => {
    //     let array = this.props.squareList;
    //     // console.log("id", this.props.id);
    //     array[this.props.id] = "X";
    //     // console.log("array?", array)
    //     this.props.setParentsState({ squareList: array })

    render() {
        return (
            <div
                className="square"
                onClick={() => this.props.selectSquare(this.props.id)}>
                {/* {this.props.value} */}
                {this.props.value
                    === "X" ? <img src="./mic.png" width="85%" alt="..."></img> :
                    this.props.value
                        === "O" ? <img src="./min.png" width="85%" alt="..."></img> : ""}
            </div>
        );
    }
}
