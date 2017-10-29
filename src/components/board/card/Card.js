import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions/boardActions';

// components
import Checklist from '../checklist/Checklist';
import CardControls from './_controls';
import EditableField from '../../editable-field/EditableField';

import {
  X
} from 'react-feather';

// This component is getting fairly complicated... 
// should more be extracted?

class Card extends React.Component {
  constructor() {
    super();

    this.state = {
      isExpanded: true,
      isEditingDescription: false,
      isDragging: false,
      hasEditingDescendant: false
    }
  }


  static propTypes = {
    id: PropTypes.number.isRequired,
    boardId: PropTypes.number.isRequired,
    colId: PropTypes.number.isRequired,
    description: PropTypes.string,
    deleteCard: PropTypes.func.isRequired,
    addChecklist: PropTypes.func.isRequired,
    updateCardDescription: PropTypes.func.isRequired,
    toggleBoardDragState: PropTypes.func.isRequired
  }


  handleDeleteCard() {
    this.props.deleteCard(
      this.props.boardId,
      this.props.colId,
      this.props.id
    )
  }


  handleToggleExpand() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }


  handleAddChecklist() {
    this.props.addChecklist(
      this.props.boardId,
      this.props.id
    )
  }


  handleDragStart(e) {
    this.props.toggleBoardDragState();
    this.setState({ isDragging: true });

    const eventData = JSON.stringify({
      sourceBoardId: this.props.boardId,
      sourceColId: this.props.colId,
      sourceCardId: this.props.id
    });

    // the HTML5 DnD API expects strings for data
    e.dataTransfer.setData('data/source-ids', eventData);
  }


  handleDragEnd(e) {
    this.props.toggleBoardDragState();
    this.setState({ isDragging: false });
  }


  /* BEGIN EditableField interface for card description */
  // this looks like a good opportunity to extract a HOC [TODO]
  handleEditDescription = () => this.setState({ isEditingDescription: true })
  handleCancelEditingDescription = () => this.setState({ isEditingDescription: false })
  handleDoneEditingDescription = (value) => {
    this.setState({ isEditingDescription: false });
    this.props.updateCardDescription(
      this.props.boardId,
      this.props.id,
      value
    );
  } 
  /* END EditableField interface for card description*/


  render() {
    const { description, checklists } = this.props;
    let cardClassNames = ['card'];
    this.state.isDragging && cardClassNames.push('is-dragging');

    return (
      <li className={cardClassNames.join(' ')}>
       
        <div className="card_description-container"
              draggable={!this.state.isEditingDescription}
              onDragStart={this.handleDragStart.bind(this)} 
              onDragEnd={this.handleDragEnd.bind(this)}> 
          <EditableField value={description}
                         isEditing={this.state.isEditingDescription}
                         editField={this.handleEditDescription.bind(this)}
                         cancelEditingField={this.handleCancelEditingDescription.bind(this)}
                         doneEditingField={this.handleDoneEditingDescription.bind(this)} />
          <div className="btn card-control card-control--delete" 
               onClick={this.handleDeleteCard.bind(this)}>
            <X size={16} color={"red"} />
          </div>
        </div>

        {this.state.isExpanded &&
          <div className="card_checklist-container">
            {checklists.allIds.length === 0 &&
              <span className="placeholder">no checklists</span>
            }

            {checklists.allIds.map(id => {
              return <Checklist key={id} id={id}
                                cardId={this.props.id}
                                boardId={this.props.boardId} />
            })}
          </div>
        }

        <CardControls isExpanded={this.state.isExpanded} 
                      handleToggleExpand={this.handleToggleExpand.bind(this)}
                      handleAddChecklist={this.handleAddChecklist.bind(this)}/>
      </li>
    )
  }
}

const mapDispatchToProps = {
  addChecklist: actions.addChecklist,
  deleteCard: actions.deleteCard,
  updateCardDescription: actions.updateCardDescription
}

const mapStateToProps = (state, ownProps) => {
  const { boardId, id } = ownProps;
  const card = state.boards.byId[boardId].cards.byId[id];

  return { ...card }
}


export default connect(mapStateToProps, mapDispatchToProps)(Card);
