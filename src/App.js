import React, { Component } from 'react';


/* COMPONENTS */
import Board from './components/board/Board'
import Sidebar from './components/sidebar/Sidebar';


class App extends Component {
  render() {
    return (
      <div className="board-view">
        <Board id={0} />
        <Sidebar />
      </div>
    );
  }
}

export default App;
