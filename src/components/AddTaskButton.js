import React from 'react';
import './scss/AddTaskButton.scss';

const AddTaskButton = () => {
  const showAddTaskModal = () => {
    document.getElementById('addTaskModal').classList.remove('hidden');
  }
  return (
    <>
      <button 
        className='AddTaskButton'
        onClick={showAddTaskModal}
      >
        Add a Task
      </button>
    </>
  );
};

export default AddTaskButton;
