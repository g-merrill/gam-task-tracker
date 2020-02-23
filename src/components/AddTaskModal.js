import React, { Component } from 'react';
import './scss/AddTaskModal.scss';

class AddTaskModal extends Component {
  state = {
    selectedList: 'Loading lists...',
    otherListNames: []
  }

  slideOutOrIn = (outArr, inArr) => {
    if (outArr.length) {
      outArr.forEach(id => {
        document.getElementById(id).classList.add('slide-out');
      });
    }
    if (inArr.length) {
      inArr.forEach(id => {
        document.getElementById(id).classList.add('slide-in');
      });
    }
  }

  setSelectedList = (listName) => {
    let selectedList = listName;
    this.props.hideOrShow(['AddTaskModal-other-lists']);
    this.updateOtherLists(selectedList);
    this.setState({ selectedList });
  }

  updateOtherLists = (selectedList) => {
    const lists = this.props.lists;
    let otherListNames = [];
    for (let i = lists.length - 1; i >= 0; i--) {
      if (lists[i].name === selectedList) continue;
      otherListNames.push(
        <div 
          key={lists[i].name}
          className='AddTaskModal-other-list'
          onClick={() => this.setSelectedList(lists[i].name)}
        >
          {lists[i].name}
        </div>
      );
    }
    this.setState({ otherListNames });
  }

  chooseList = () => {
    this.slideOutOrIn(['AddTaskModal-heading', 'AddTaskModal-list-selecter', 'AddTaskModal-choose-list-btn'], []);
    setTimeout(() => {
      this.props.hideOrShow([
        'AddTaskModal-list-selecter', 
        'AddTaskModal-choose-list-btn',
        'AddTaskModal-task-input-form'
      ]);
      document.getElementById('AddTaskModal-heading').innerText = 'What you need to do';
      this.slideOutOrIn([], ['AddTaskModal-heading', 'AddTaskModal-task-input-form']);
    }, 1000);
  }

  submitTask = (e) => {
    e.preventDefault();
    let list = this.state.selectedList;
    let task = document.getElementById('AddTaskModal-task-input').value;
    this.props.addTaskToList(list, task);
    // TODO: reset to first modal slide
    this.props.hideOrShow(['addTaskModal']);
  }

  componentDidUpdate = () => {
    const lists = this.props.lists;
    let selectedList = this.state.selectedList;
    let otherListNames = this.state.otherListNames;
    if (selectedList === 'Loading lists...' && lists.length) {
      selectedList = lists[lists.length - 1].name;
      this.setState({ selectedList });
    }
    if (selectedList !== 'Loading lists...' && !otherListNames.length) {
      this.updateOtherLists(selectedList);
    }
  }

  render() {
    return (
      <div 
        id='addTaskModal'
        className='AddTaskModal hidden'
      >
        <h1 
          id='AddTaskModal-heading'
          className='AddTaskModal-heading'
        >Which list?</h1>
        <div
          id='AddTaskModal-list-selecter'
          className='AddTaskModal-list-selecter-btn'
        >
          <div 
            id='AddTaskModal-selected-list'
            className='AddTaskModal-selected-list'
            onClick={() => this.props.hideOrShow(['AddTaskModal-other-lists'])}
          >
            {this.state.selectedList}
            <div 
              className="AddTaskModal-arrow-down"
            />
          </div>
          <div 
            id='AddTaskModal-other-lists'
            className="AddTaskModal-other-lists hidden"
          >
            {this.state.otherListNames}
          </div>
        </div>
        <button
          id='AddTaskModal-choose-list-btn'
          className='AddTaskModal-choose-list-btn'
          onClick={this.chooseList}
        >
          Choose This List
        </button>
        <form 
          id='AddTaskModal-task-input-form'
          className='AddTaskModal-task-input-form hidden'
          onSubmit={this.submitTask}
        >
          <input 
            id='AddTaskModal-task-input'
            className='AddTaskModal-task-input' 
            type="text" 
          />
          <button 
            type="submit"
            className='AddTaskModal-choose-list-btn'
          >
            Add task to {this.state.selectedList}
          </button>
        </form>
      </div>
    );
  }
}

export default AddTaskModal;
