import React, { Component } from 'react';
import './scss/List.scss';

class List extends Component {
  render() {
    const {id: listId, name, items} = this.props.list;
    return (
      <div className='List'>
        <div className='List-name'>{name}</div>
        <ul className='List-item-ctnr'>
        {items.map((item, idx) => (
          <li 
            key={idx}
            className='List-item'
          >
            <div 
              className='List-item-check'
            >
              &#10003;
            </div>
            <span 
              className='List-item-txt'
            >
              {item.description}
            </span>
            <div 
              className='List-item-x'
              onClick={() => this.props.stageForDeletion(listId, item.id)}
            >
              X
            </div>
          </li>
        ))}
        </ul>
      </div>
    );
  }
}

export default List;
