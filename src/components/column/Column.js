import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '../card/Card';

class Column extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    boardId: PropTypes.number.isRequired,
    title: PropTypes.string,
    cardIds: PropTypes.arrayOf(PropTypes.number)
  }


  render() {
    const { id, boardId, title, cardIds } = this.props;

    return (
      <div className="column">
        <h2 className="column-header">{title}</h2>
        <ul className="card-list">
          {cardIds.map(cardId => <Card key={cardId}
                                       id={cardId}
                                       colId={id}
                                       boardId={boardId} />
          )}
        </ul>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  // yuck. I'm trying to avoid re-renders of the whole board when an card is
  // edited or moved between columns. Is there a better way to do this?
  const col = state.boards.byId[ownProps.boardId].columns.byId[ownProps.id];

  return {
    title: col.title,
    cardIds: col.cardIds
  }
}


export default connect(mapStateToProps)(Column);
