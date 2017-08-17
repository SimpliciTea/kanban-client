import React from 'react';

import Column from '../column/Column';

class Board extends React.Component {

  render() {
    return (
      <div className="board">
        <h1>Board!</h1>
        <div className="column-container">
          <Column />
          <Column />
          <Column />
        </div>
      </div>
    );
  }
}


export default Board;
