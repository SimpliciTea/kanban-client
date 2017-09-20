import React from 'react';
import PropTypes from 'prop-types';

class EditableField extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    editField: PropTypes.func.isRequired,
    cancelEditingField: PropTypes.func.isRequired,
    doneEditingField: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired
  }

  // setting value at componentDidMount instead of in constructor
  // places the cursor at the end of the string when autofocused
  componentWillMount() { this.setState({ value: '' }) }
  componentDidMount() { this.setState({ value: this.props.value }) }


  handleDoubleClick = () => { 
    this.props.editField(); 
  }
  
  cancelEditing() {
    this.setState({ value: this.props.value });
    this.props.cancelEditingField(); 
  }

  doneEditing() {
    (this.props.value === this.state.value
      ? this.cancelEditing()
      : this.props.doneEditingField(this.state.value)
    )
  }

  handleOnChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleOnBlur() { this.cancelEditing(); }

  handleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
        return this.doneEditing();
      case 'Escape':
        return this.cancelEditing();
      default:
        return;
    }
  }

  
  render() {
    const {value, isEditing} = this.props;
    const spanClass = value ? '' : 'placeholder';

    return (
      <div className="editable-field_container"
           style={{ }}>
        {!isEditing &&
          <span className={spanClass}
                onDoubleClick={this.handleDoubleClick}>
            {value || 'double-click to edit'}
          </span>
        }

        {isEditing && 
          <textarea autoFocus={true}
                    value={this.state.value}
                    onChange={this.handleOnChange.bind(this)}
                    onBlur={this.handleOnBlur.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)} />
        }
      </div>
    )
  }
}


export default EditableField;
