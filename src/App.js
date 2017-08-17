import React, { Component } from 'react';
import logo from './logo.svg';


import Board from './components/board/Board'
import Sidebar from './components/sidebar/Sidebar';


import store from './dummyStore';


class App extends Component {
  render() {
    return (
      <div className="board-view">
        <Board />
        <Sidebar />
      </div>
    );
  }
}

export default App;
