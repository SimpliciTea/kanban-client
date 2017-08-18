import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Column from '../column/Column';


class Board extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    columnIds: PropTypes.arrayOf(PropTypes.number)
  }

  render() {
    const { id, columnIds, title } = this.props;
    
    return (
      <div className="board">
        <h1>{title}</h1>
        <div className="column-container">
          {columnIds.map(colId => <Column key={colId} 
                                          id={colId} 
                                          boardId={id}/>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const board = state.boards.byId[ownProps.id]

  return {
    title: board.title,
    columnIds: board.columns.allIds
  }
}

export default connect(mapStateToProps)(Board);
