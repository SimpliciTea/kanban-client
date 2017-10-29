import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions/boardActions';

import Column from './column/Column';
import EditableField from '../editable-field/EditableField';

class Board extends React.Component {
  constructor() {
    super();

    this.state = {
      isEditingTitle: false,
      hasDraggingCard: false
    }
  }

  
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    columnIds: PropTypes.arrayOf(PropTypes.number),
    updateBoardTitle: PropTypes.func.isRequired
  }


  handleToggleBoardDragState = () => this.setState({ hasDraggingCard: !this.state.hasDraggingCard })


  /* interface EditableField for board title */
  // this looks like a good opportunity to extract a HOC [TODO]
  handleEditTitle = () => this.setState({ isEditingTitle: true })
  handleCancelEditingTitle = () => this.setState({ isEditingTitle: false })
  handleDoneEditingTitle = (value) => {
    this.setState({ isEditingTitle: false });
    this.props.updateBoardTitle(
      this.props.id,
      value
    )
  }


  render() {
    const { id, columnIds, title } = this.props;
    const classNames = ["board"];
    this.state.hasDraggingCard && classNames.push('has-dragging-card');

    return (
      <div className={classNames.join(' ')}>
        <h1 className="board_title-container">
          <EditableField value={title}
                         isEditing={this.state.isEditingTitle}
                         editField={this.handleEditTitle.bind(this)}
                         cancelEditingField={this.handleCancelEditingTitle.bind(this)}
                         doneEditingField={this.handleDoneEditingTitle.bind(this)} />
        </h1>

        <div className="column-container">
          {columnIds.map(colId => <Column key={colId} 
                                          id={colId} 
                                          boardId={id}
                                          toggleBoardDragState={this.handleToggleBoardDragState.bind(this)}/>
          )}
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = {
  updateBoardTitle: actions.updateBoardTitle
}

const mapStateToProps = (state, ownProps) => {
  const board = state.boards.byId[ownProps.id]

  return {
    title: board.title,
    columnIds: board.columns.allIds
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
