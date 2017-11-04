import React from 'react';
import PropTypes from 'prop-types';


import { 
  MoreHorizontal,
  Plus,
  List
} from 'react-feather';


const Controls = (props) => {

  return (
    <div className="card_controls">
      <div className="card-control card-control--toggle-expand"
              onClick={() => props.handleToggleExpand()}>
        {props.isExpanded 
          ? <MoreHorizontal size={16} />
          : <MoreHorizontal size={16} />
        }
      </div>
      
      {props.isExpanded &&
        <div className="card-control card-control--add-checklist"
             onClick={props.handleAddChecklist}>
          <Plus size={12} />
          <List size={16} />
        </div>
      }
    </div>
  );
}



Controls.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  handleToggleExpand: PropTypes.func.isRequired,
  handleAddChecklist: PropTypes.func.isRequired
}


export default Controls;
