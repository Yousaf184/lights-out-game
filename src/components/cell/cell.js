import React from 'react';
import './cell.css';

function Cell(props) {
    const classes = 'cell' + (props.lightOn ? ' light-on' : '');

    return (
        <div
            className={classes}
            onClick={() => props.cellClicked(props.coordinates)}>
        </div>
    );
}

export default Cell;