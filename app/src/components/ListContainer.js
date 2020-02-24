import React from 'react';
import './scss/ListContainer.scss';
import List from './List';

const ListContainer = ({ lists }) => {
  let reversedLists = [];
  for (let i = lists.length - 1; i >= 0; i--) {
    reversedLists.push(
      <List 
        key={i} 
        list={lists[i]} 
      />
    );
  }
  return (
    <div className='ListContainer'>
      {reversedLists}
    </div>
  );
};

export default ListContainer;
