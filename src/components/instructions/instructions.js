import React from 'react';
import ReactDOM from 'react-dom';
import './instructions.css';

function GameInstructions(props) {
    return (
        ReactDOM.createPortal(
            <div className="instructions-container">
                <div className="modal">
                    <h1>Game instructions</h1>
                    <ul>
                        <li>
                            When the game starts, some of the board cells will be
                            ON (blue colored) and some of them will be OFF (white colored)
                        </li>
                        <li>
                            You need to turn off all the cells in order to win
                        </li>
                        <li>
                            Clicking on a cell will toggle its light and the light of its
                            neighbouring cells
                        </li>
                        <li>
                            You also have one life line available. When used,
                            neighbouring cells of the clicked cell won't be toggled
                            You can only use it once, use it wisely
                        </li>
                    </ul>
                    <button onClick={props.dismissInstructions}>Dismiss</button>
                </div>
            </div>,
            document.getElementById('modal')
        )
    );
}

export default GameInstructions;