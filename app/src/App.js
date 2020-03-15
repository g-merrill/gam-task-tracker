import React, { Component } from 'react';
import './scss/App.scss';
import ListContainer from './components/ListContainer';
import AddTaskButton from './components/AddTaskButton';
import AddTaskModal from './components/AddTaskModal';
import { getAllLists } from './utils/listService';
import { addTaskToDB, removeTaskFromDB } from './utils/itemService';

class App extends Component {
  state = {
    lists: [],
    isDataLoaded: false
  }

  hideOrShow = (hideArr, showArr) => {
    hideArr.length
      && hideArr.forEach(id => 
        document.getElementById(id).classList.add('hidden'));
    showArr.length
      && showArr.forEach(id => 
        document.getElementById(id).classList.remove('hidden'));
  }

  addTaskToList = async (listId, task) => {
    let newTask = await addTaskToDB(listId, task);
    let lists = this.state.lists.map(list => {
      list.id === listId && list.items.push(newTask);
      return list;
    });
    this.setState({ lists });
  }

  deleteTaskFromList = async (listId, taskId) => {
    await removeTaskFromDB(listId, taskId);
    let lists = this.state.lists.map(list => {
      if (list.id === listId) {
        list.items = list.items.filter(item => item.id !== taskId);
      }
      return list;
    });
    this.setState({ lists });
  }

  componentDidMount = async () => {
    let lists = await getAllLists();
    let isDataLoaded = true;
    this.setState({ lists, isDataLoaded });
  }

  render() {
    return (
      <div className='App'>
      {this.state.isDataLoaded ? (
        <>
          <AddTaskButton 
            hideOrShow={this.hideOrShow}
          />
          <AddTaskModal 
            lists={this.state.lists} 
            hideOrShow={this.hideOrShow}
            addTaskToList={this.addTaskToList}
          />
          <ListContainer 
            lists={this.state.lists} 
            deleteTaskFromList={this.deleteTaskFromList}
          />
        </>
      ) : (
        <div className='loader'>
          <div className='loader-inner loader-one' />
          <div className='loader-inner loader-two' />
          <div className='loader-inner loader-three' />
        </div>
      )}
      </div>
    );
  }
}

export default App;
