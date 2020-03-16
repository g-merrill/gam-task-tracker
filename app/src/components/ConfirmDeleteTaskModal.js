import React from 'react';
import './scss/ConfirmDeleteTaskModal.scss';

const ConfirmDeleteTaskModal = ({ listId, itemId, cancelStageForDeletion, deleteTaskFromList }) => {
  return (
    <div 
      id='ConfirmDeleteTaskModal'
      className='ConfirmDeleteTaskModal hidden'
    >
      <button 
        className='purple-btn align-flex-end slide-in'
        onClick={cancelStageForDeletion}
      >
        X
      </button>
      <h1 
        className='ConfirmDeleteTaskModal-heading slide-in'
      >
        Are you sure you want to delete this item?
      </h1>
      <button
        className='purple-btn slide-in'
        onClick={() => deleteTaskFromList(listId, itemId)}
      >
        DELETE
      </button>
    </div>
  );
};

export default ConfirmDeleteTaskModal;
