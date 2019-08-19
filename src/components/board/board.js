import React, { Component } from 'react';
import Cell from '../cell/cell';
import GameInstructions from '../instructions/instructions';
import './board.css';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: this.initBoard(),
            hasWon: false,
            instructionsShown: false
        }
    }

    static defaultProps = {
        numRows: 5,
        numCols: 5,
        litChance: 0.25   // 0 - 1, chance of each board cell getting lit
    };

    // return 2D-array representing board
    // 0 --> cell light off
    // 1 --> cell light on
    initBoard = () => {
        const board = [];

        for (let i=0; i<this.props.numRows; i++) {
            const row = [];

            for (let j=0; j<this.props.numCols; j++) {
                row[j] = Math.random() < this.props.litChance ? 1 : 0;
            }

            board.push(row);
        }

        return board;
    };

    /**
     * returns array containing multiple <tr> elements
     * each <tr> element has following structure
     * <tr>
     *   <td><Cell/></td>
     *   <td><Cell/></td>
     *   <td><Cell/></td>
     * </tr>
    */
    drawBoardRows = () => {
        const tableRows = [];
        let lightOn = null;

        for (let i=0; i<this.props.numRows; i++) {
            const rowCells = [];

            for (let j=0; j<this.props.numCols; j++) {
                lightOn = this.state.board[i][j] === 1 ? true : false;
                rowCells[j] = (
                    <td key={i + '-' +j}>
                        <Cell
                            coordinates={i+'-'+j}
                            lightOn={lightOn}
                            cellClicked={this.handleCellClick}/>
                    </td>
                );
            }

            tableRows.push(<tr key={i}>{rowCells}</tr>);
        }

        return tableRows;
    };

    drawBoard = () => {
        return (
            <table>
                <tbody>
                    { this.drawBoardRows() }
                </tbody>
            </table>
        );
    };

    handleCellClick = (cellCoordinates) => {
        let [cellX, cellY] = cellCoordinates.split('-').map(e => parseInt(e));

        const boardCopy = [...this.state.board];

        // toggle cell light
        boardCopy[cellX][cellY] = this.state.board[cellX][cellY] === 1 ? 0 : 1;

        // toggle light of neighboring cells
        // upper cell
        if (cellX - 1 >= 0) {
            boardCopy[cellX - 1][cellY] = boardCopy[cellX - 1][cellY] === 1 ? 0 : 1;
        }
        // bottom cell
        if (cellX + 1 < this.props.numRows) {
            boardCopy[cellX + 1][cellY] = boardCopy[cellX + 1][cellY] === 1 ? 0 : 1;
        }
        // right cell
        if (cellY + 1 < this.props.numCols) {
            boardCopy[cellX][cellY + 1] = boardCopy[cellX][cellY + 1] === 1 ? 0 : 1;
        }
        // left cell
        if (cellY - 1 >= 0) {
            boardCopy[cellX][cellY - 1] = boardCopy[cellX][cellY - 1] === 1 ? 0 : 1;
        }

        this.setState({ board: boardCopy });
    };

    restartGame = () => {
        this.setState({ hasWon: false, board: this.initBoard() });
    };

    toggleInstructions = () => {
        this.setState({ instructionsShown: !this.state.instructionsShown });
    };

    render() {
        if (!this.state.instructionsShown) {
            return <GameInstructions dismissInstructions={this.toggleInstructions}/>
        }

        if (this.state.hasWon) {
            return (
                <div>
                    <p className="neon-orange won-text">You Won!</p>
                    <button className="play-again-btn" onClick={this.restartGame}>
                        Play Again
                    </button>
                </div>
            );
        }

        return (
            <div className="board">
                <h1 className="neon-blue">Lights Out</h1>
                <div className="board-container">
                    { this.drawBoard() }
                </div>
                <button className="restart-btn" onClick={this.restartGame}>
                    Restart
                </button>
                <button className="instructions-btn" onClick={this.toggleInstructions}>
                    Instructions
                </button>
            </div>
        );
    }
}

export default Board;