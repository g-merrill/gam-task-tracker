import React, { Component } from 'react';
import './scss/List.scss';

class List extends Component {
  render() {
    const {name, items} = this.props.list;
    return (
      <div className='List'>
        <div className='List-name'>{name}</div>
        <ol className='List-item-ctnr'>
        {items.map((item, idx) => (
          <li 
            key={idx}
            className='List-item'
          >
            {item.description}
          </li>
        ))}
        </ol>
      </div>
    );
  }
}

export default List;
