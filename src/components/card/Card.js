import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/boardActions';

class Card extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    boardId: PropTypes.number.isRequired,
    colId: PropTypes.number.isRequired,
    description: PropTypes.string,
    deleteCard: PropTypes.func.isRequired
  }

  handleDeleteCard() {
    this.props.deleteCard(
      this.props.boardId,
      this.props.colId,
      this.props.id
    )
  }

  render() {
    const { description } = this.props;

    return (
      <li className="card">
        {description}
        <button className="card-control--delete" 
                onClick={this.handleDeleteCard.bind(this)}>
          x
        </button>
      </li>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { boardId, id } = ownProps;
  const card = state.boards.byId[boardId].cards.byId[id];

  return {
    description: card.description
  }
}


export default connect(mapStateToProps, actions)(Card);
