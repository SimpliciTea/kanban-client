import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions/boardActions';

import Card from '../card/Card';
import DropFrame from './_dropframe';
import { Plus } from 'react-feather';


class Column extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    boardId: PropTypes.string.isRequired,
    title: PropTypes.string,
    cardIds: PropTypes.arrayOf(PropTypes.number),
    createCard: PropTypes.func.isRequired,
    toggleBoardDragState: PropTypes.func.isRequired
  }


  handleAddCard() {
    this.props.createCard(this.props.boardId, this.props.id);
  }


  render() {
    const { id, boardId, title, cardIds } = this.props;
    let orderId = 0;

    return (
      <div className="column">
        <h2 className="column-header">{title}</h2>
        <ul className="card-list">
          
          {cardIds.map((cardId) => {
            return ([
              <DropFrame orderId={orderId++} colId={this.props.id}/>,
              <Card key={cardId}
                    id={cardId}
                    colId={id}
                    boardId={boardId} 
                    toggleBoardDragState={this.props.toggleBoardDragState}/>
            ])
          })}

          {/* and a trailing drop-frame */}
          <DropFrame orderId={orderId} colId={this.props.id}/>
        </ul>

        <div className="column-controls">
          <span className="column-control column-control--add-card"
                onClick={this.handleAddCard.bind(this)}>
            <Plus size={20} />
          </span>
        </div>
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


export default connect(mapStateToProps, actions)(Column);
