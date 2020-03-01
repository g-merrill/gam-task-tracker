import React, { Component } from 'react';
import './scss/AddTaskModal.scss';

class AddTaskModal extends Component {
  state = {
    selectedList: null,
    otherListNames: [],
    taskInput: '',
    modalSlide: 1
  }

  loadSelectedList = () => {
    const lists = this.props.lists;
    if (lists.length) {
      this.setState({ 
        selectedList: lists[lists.length - 1].name
      });
    }
  }

  slideOutOrIn = (outArr, inArr) => {
    outArr.length
      && outArr.forEach(id => {
        document.getElementById(id).classList.remove('slide-in');
        document.getElementById(id).classList.add('slide-out');
      });
    inArr.length
      && inArr.forEach(id => {
        document.getElementById(id).classList.remove('slide-out');
        document.getElementById(id).classList.add('slide-in');
      });
  }

  changeHeadingTo = (text) => {
    document.getElementById('AddTaskModal-heading').innerText = text;
  }

  getInputVal = () => document.getElementById('AddTaskModal-task-input').value;

  setSelectedList = (listName) => {
    let selectedList = listName;
    this.props.hideOrShow(['AddTaskModal-other-lists'], []);
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
        'AddTaskModal-choose-list-btn'
      ], [
        'AddTaskModal-task-input-form'
      ]);
      this.changeHeadingTo('What you need to do');
      this.slideOutOrIn([], ['AddTaskModal-heading', 'AddTaskModal-task-input-form']);
    }, 500);
    this.setState({ modalSlide: 2 });
  }

  handleChange = () => {
    let taskInput = this.getInputVal();
    this.setState({ taskInput });
  }

  submitTask = (e) => {
    e.preventDefault();
    let list = this.state.selectedList;
    let task = this.getInputVal();
    this.props.addTaskToList(list, task);
    this.resetModal();
  }

  resetModal = () => {
    let taskInput = '';
    let modalSlide = 1;
    this.props.hideOrShow([
      'addTaskModal', 
      'AddTaskModal-task-input-form'
    ], [
      'AddTaskModal-list-selecter', 
      'AddTaskModal-choose-list-btn',
    ]);
    this.changeHeadingTo('Which list?');
    document.getElementById('AddTaskModal-other-lists').classList.add('hidden');
    this.slideOutOrIn([], ['AddTaskModal-heading', 'AddTaskModal-list-selecter', 'AddTaskModal-choose-list-btn']);
    this.setState({ taskInput, modalSlide });
  }

  componentDidMount = () => {
    this.loadSelectedList();
  }

  componentDidUpdate = () => {
    let selectedList = this.state.selectedList;
    selectedList 
      && !this.state.otherListNames.length 
      && this.updateOtherLists(selectedList);
  }

  render() {
    const modalSlideOne = (
      <>
        <div
          id='AddTaskModal-list-selecter'
          className='AddTaskModal-list-selecter-btn slide-in'
        >
          <div 
            id='AddTaskModal-selected-list'
            className='AddTaskModal-selected-list'
            onClick={() => 
              document.getElementById('AddTaskModal-other-lists')
                .classList.toggle('hidden')}
          >
            {this.state.selectedList ? this.state.selectedList : 'Loading lists...'}
            <div 
              className='AddTaskModal-arrow-down'
            />
          </div>
          <div 
            id='AddTaskModal-other-lists'
            className='AddTaskModal-other-lists hidden'
          >
            {this.state.otherListNames}
          </div>
        </div>
        <button
          id='AddTaskModal-choose-list-btn'
          className='purple-btn slide-in'
          onClick={this.chooseList}
        >
          Choose This List
        </button>
      </>
    );

    const modalSlideTwo = (
      <form 
        id='AddTaskModal-task-input-form'
        className='AddTaskModal-task-input-form hidden'
        onSubmit={this.submitTask}
      >
        <input 
          id='AddTaskModal-task-input'
          className='AddTaskModal-task-input' 
          type='text' 
          onChange={this.handleChange}
          value={this.state.taskInput}
        />
        <button 
          type='submit'
          className='purple-btn'
        >
          Add task to {this.state.selectedList}
        </button>
      </form>
    );

    return (
      <div 
        id='addTaskModal'
        className='AddTaskModal hidden'
      >
        <button 
          className='purple-btn align-flex-end'
          onClick={this.resetModal}
        >
          X
        </button>
        <h1 
          id='AddTaskModal-heading'
          className='AddTaskModal-heading slide-in'
        >
          Which list?
        </h1>
        {modalSlideOne}
        {modalSlideTwo}
      </div>
    );
  }
}

export default AddTaskModal;
