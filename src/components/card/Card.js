import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Card extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    boardId: PropTypes.number.isRequired,
    text: PropTypes.string
  }


  render() {
    const { text } = this.props;

    return (
      <li className="card">{text}</li>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { boardId, id } = ownProps;
  const card = state.boards.byId[boardId].cards.byId[id];

  return {
    text: card.text
  }
}


export default connect(mapStateToProps)(Card);
