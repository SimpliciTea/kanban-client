import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import * as actions from '../../actions/boardActions';


class DropFrame extends React.Component {
  constructor() {
    super();

    this.state = {
      hasOverlord: false
    }
  }

  static propTypes = {
    orderId: PropTypes.number.isRequired,
    dropCardOnFrame: PropTypes.func.isRequired
  }


  handleOnDragEnter(e) {
    // make sure it's our own card drag event 
    e.dataTransfer.types.indexOf('data/source-ids') !== -1 &&
      this.setState({ hasOverlord: true })
  }

  handleOnDragLeave(e) {
    e.dataTransfer.types.indexOf('data/source-ids') !== -1 &&
      this.setState({ hasOverlord: false });
  }

  handleOnDragOver(e) {
    e.preventDefault();
  }

  handleOnDrop(e) {
    let sourceIds;

    // every outcome flips hasOverlord to false
    this.setState({ hasOverlord: false });

    // no PropTypes to work with here, so 
    // we're gonna do our own type checking
    // before working with any drop events

    if (e.dataTransfer.types.indexOf('data/source-ids') !== -1) {
      // check to make sure we can parse our data as JSON
      try {
        sourceIds = JSON.parse(e.dataTransfer.getData('data/source-ids'));
      } catch(err) {
        // if we can't parse, log the JSON err and return from handler
        console.log(`error: ${err}`);
        
        return null;
      }

      // check to make sure the right property names were passed
      // with the right types of data
      let props = ['sourceBoardId', 'sourceColId', 'sourceCardId'];
      const isValid = props.every(prop =>
        sourceIds.hasOwnProperty(prop) && typeof sourceIds[prop] === 'number'
      );

      // squeak n boot if it's not the desired data format
      if (!isValid) {
        console.error(`error: data passed to <DropFrames /> via DataTransfer with type 'data/source-ids' is expected to be JSON with ${props} as properties passing values of type 'number'`);

        return null;
      }

      // we know our data is good, so let's use it
      // and dispatch our action
      this.props.dropCardOnFrame(
        sourceIds.sourceBoardId,
        sourceIds.sourceColId,
        sourceIds.sourceCardId,
        this.props.colId,
        this.props.orderId
      )
    }
  }


  render() {
    const classNames = ['drop-frame'];
    this.props.hasResident && classNames.push('has-resident');
    !this.props.hasResident && classNames.push('bachelor');
    !this.props.hasResident
      && this.state.hasOverlord
      && classNames.push('has-overlord');

    return (
      <div className={classNames.join(' ')}
           onDragEnter={this.handleOnDragEnter.bind(this)}
           onDragLeave={this.handleOnDragLeave.bind(this)}
           onDragOver={this.handleOnDragOver.bind(this)}
           onDrop={this.handleOnDrop.bind(this)}>
        {this.props.children}
      </div>
    )
  }
}


const mapDispatchToProps = {
  dropCardOnFrame: actions.dropCardOnFrame
}


export default connect(null, mapDispatchToProps)(DropFrame);
