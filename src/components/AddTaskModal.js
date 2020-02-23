import React, { Component } from 'react';
import './scss/AddTaskModal.scss';

class AddTaskModal extends Component {
  state = {
    selectedList: 'Loading lists...',
    otherListNames: []
  }

  setNewList = (listName) => {
    let selectedList = listName;
    this.props.hideOrShow('AddTaskModal-other-lists');
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
          onClick={() => this.setNewList(lists[i].name)}
        >
          {lists[i].name}
        </div>
      );
    }
    this.setState({ otherListNames });
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
        <h1 className='AddTaskModal-which-list'>Which list?</h1>
        <div
          id='AddTaskModal-list-selecter'
          className='AddTaskModal-list-selecter-btn'
        >
          <div 
            id='AddTaskModal-selected-list'
            className='AddTaskModal-selected-list'
            onClick={() => this.props.hideOrShow('AddTaskModal-other-lists')}
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
          className='AddTaskModal-choose-list-btn'
          onClick={() => this.props.hideOrShow('addTaskModal')}
        >
          Choose This List
        </button>
      </div>
    );
  }
}

export default AddTaskModal;
