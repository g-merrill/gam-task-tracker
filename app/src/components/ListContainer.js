import React from 'react';
import './scss/ListContainer.scss';
import List from './List';

const ListContainer = ({ lists, stageForDeletion }) => {
  let reversedLists = [];
  for (let i = lists.length - 1; i >= 0; i--) {
    reversedLists.push(
      <List 
        key={i} 
        list={lists[i]}
        stageForDeletion={stageForDeletion}
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
