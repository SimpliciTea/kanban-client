import React from 'react';

import Item from '../item/Item';

class Column extends React.Component {

  render() {
    return (
      <div className="column">
        <h2 className="column-header">Column!</h2>
        <ul className="item-list">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </ul>
      </div>
    )
  }
}


export default Column;
