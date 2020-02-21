import React, { Component } from 'react';
import './scss/AddTaskModal.scss';

class AddTaskModal extends Component {
  state = {
    selectedList: 'Loading lists...',
  }

  hideAddTaskModal = () => {
    document.getElementById('addTaskModal').classList.add('hidden');
  };

  expandListSelecter = () => {
    console.log('clicked');
    return;
  };

  componentDidUpdate = () => {
    const lists = this.props.lists;

    if (this.state.selectedList === 'Loading lists...' && lists.length) {
      let selectedList = lists[lists.length - 1].name;
      this.setState({ selectedList });
    }
  }

  render() {
    return (
      <div 
        id='addTaskModal'
        className='AddTaskModal hidden'
      >
        <h1>Which list?</h1>
        <div
          onClick={this.expandListSelecter}
        >{this.state.selectedList}</div>
        <button
          className='AddTaskModal-SubmitTaskBtn'
          onClick={this.hideAddTaskModal}
        >
          Add This Task
        </button>
      </div>
    );
  }
}

export default AddTaskModal;
