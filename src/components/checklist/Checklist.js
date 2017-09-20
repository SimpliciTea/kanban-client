import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ChecklistItem from './_item';
import EditableField from '../editable-field/EditableField';

import {
  Plus,
  X
}  from 'react-feather';

import * as actions from '../../actions/boardActions';


class Checklist extends React.Component {
  constructor() {
    super();

    this.state = { isEditingTitle: false };
  }

  static PropTypes = {
    boardId: PropTypes.number.isRequired,
    cardId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    items: PropTypes.object.isRequired,
    addChecklistItem: PropTypes.func.isRequired,
    deleteChecklist: PropTypes.func.isRequired,
    updateChecklistTitle: PropTypes.func.isRequired
  }

  handleAddChecklistItem = () => {
    this.props.addChecklistItem(
      this.props.boardId,
      this.props.cardId,
      this.props.id
    )
  }

  handleDeleteChecklist = () => {
    this.props.deleteChecklist(
      this.props.boardId,
      this.props.cardId,
      this.props.id
    )
  }

  /* BEGIN EditableField interface for checklist title */
  // this looks like a good opportunity to extract a HOC [TODO]
  handleEditTitle = () => this.setState({ isEditingTitle: true })
  handleCancelEditingTitle = () => this.setState({ isEditingTitle: false })
  handleDoneEditingTitle = (value) => {
    this.setState({ isEditingTitle: false });
    this.props.updateChecklistTitle(
      this.props.boardId,
      this.props.cardId,
      this.props.id,
      value
    )
  }
  /* END EditableField interface for checklist title */

  render() {
    return (
      <div className="checklist_container">
        <div className="checklist_title-container">

          <span className="checklist_title-text">
            <EditableField value={this.props.title}
                           editField={this.handleEditTitle.bind(this)}
                           cancelEditingField={this.handleCancelEditingTitle.bind(this)}
                           doneEditingField={this.handleDoneEditingTitle.bind(this)}
                           isEditing={this.state.isEditingTitle} />
          </span>
          
          <div className="checklist_control--delete-checklist"
               onClick={this.handleDeleteChecklist.bind(this)}>
            <X size="16"/>
          </div>
        </div>

        <ul className="checklist_items">
          {!this.props.items.allIds.length &&
            <span className="placeholder">--- empty list ---</span>
          }

          {Object.values(this.props.items.allIds).map(itemId =>
            <ChecklistItem key={itemId}
                           id={itemId}
                           boardId={this.props.boardId}
                           cardId={this.props.cardId}
                           checklistId={this.props.id} />
          )}
        </ul>

        <div className="checklist_control">
          <Plus size={16}
                className="checklist_control--add-item"
                onClick={this.handleAddChecklistItem.bind(this)} />
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = {
  addChecklistItem: actions.addChecklistItem,
  deleteChecklist: actions.deleteChecklist,
  updateChecklistTitle: actions.updateChecklistTitle
}


const mapStateToProps = (state, ownProps) => {
  const { boardId, cardId, id } = ownProps;
  const checklist = state.boards.byId[boardId]
    .cards.byId[cardId]
    .checklists.byId[id];

  return { ...checklist }
}


export default connect(mapStateToProps, mapDispatchToProps)(Checklist);
