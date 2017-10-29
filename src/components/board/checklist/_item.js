import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EditableField from '../../editable-field/EditableField';
import {
  X
} from 'react-feather';

import * as actions from '../../../actions/boardActions';


class ChecklistItem extends React.Component {
  constructor() {
    super();

    this.state = { isEditing: false }
  }

  static PropTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    handleCheckItem: PropTypes.func.isRequired,
    handleUpdateChecklistItemText: PropTypes.func.isRequired,
    handlDeleteChecklistItem: PropTypes.func.isRequired
  }


  onCheckItem = () => {
    this.props.handleCheckItem(
      this.props.boardId,
      this.props.cardId,
      this.props.checklistId,
      this.props.id
    );
  }


  handleDeleteChecklistItem = () => {
    this.props.handleDeleteChecklistItem(
      this.props.boardId,
      this.props.cardId,
      this.props.checklistId,
      this.props.id
    )
  }


  /* interface EditableField to component */
  // this looks like a good opportunity to extract a HOC [TODO]
  handleEditField = () => this.setState({ isEditing: true })
  handleCancelEditingField = () => this.setState({ isEditing: false })
  handleDoneEditingField = (value) => {
    this.setState({ isEditing: false });
    this.props.handleUpdateChecklistItemText(
      this.props.boardId,
      this.props.cardId,
      this.props.checklistId,
      this.props.id,
      value
    )
  }
  

  render() {
    return (
      <li className="checklist-item_container">
        <input type="checkbox"
               checked={this.props.isChecked} 
               onClick={this.onCheckItem.bind(this)} />

        <EditableField value={this.props.text}
                       isEditing={this.state.isEditing}
                       editField={this.handleEditField.bind(this)}
                       cancelEditingField={this.handleCancelEditingField.bind(this)}
                       doneEditingField={this.handleDoneEditingField.bind(this)} />
        
        <div className="checklist_control--delete-item"
              onClick={this.handleDeleteChecklistItem.bind(this)}>
          <X size={16} color={"red"}/>
        </div>
      </li>
    )
  }
}


const mapDispatchToProps = {
  handleCheckItem: actions.toggleChecklistItem,
  handleUpdateChecklistItemText: actions.updateChecklistItemText,
  handleDeleteChecklistItem: actions.deleteChecklistItem
}

const mapStateToProps = (state, ownProps) => {
  const { boardId, cardId, checklistId, id } = ownProps;
  const item = state.boards.byId[boardId]
    .cards.byId[cardId]
    .checklists.byId[checklistId]
    .items.byId[id];

  return { ...item }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistItem);
