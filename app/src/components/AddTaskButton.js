import React from 'react';
import './scss/AddTaskButton.scss';

const AddTaskButton = (props) => {
  return (
    <>
      <button 
        className='purple-btn'
        onClick={() => props.hideOrShow([], ['addTaskModal'])}
      >
        Add a Task
      </button>
    </>
  );
};

export default AddTaskButton;
