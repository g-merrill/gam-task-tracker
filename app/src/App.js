import React, { Component } from 'react';
import './scss/App.scss';
import ListContainer from './components/ListContainer';
import AddTaskButton from './components/AddTaskButton';
import AddTaskModal from './components/AddTaskModal';
import { getAllLists } from './utils/listService';
import { addTaskToDB, removeTaskFromDB } from './utils/itemService';
import ConfirmDeleteTaskModal from './components/ConfirmDeleteTaskModal';

class App extends Component {
  state = {
    lists: [],
    isDataLoaded: false,
    deleteTaskListId: null,
    deleteTaskItemId: null
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

  stageForDeletion = (deleteTaskListId, deleteTaskItemId) => {
    this.setState({
      deleteTaskListId, 
      deleteTaskItemId 
    });
    this.hideOrShow([], ['ConfirmDeleteTaskModal']);
  }

  cancelStageForDeletion = () => {
    this.setState({
      deleteTaskListId: null, 
      deleteTaskItemId: null
    });
    this.hideOrShow(['ConfirmDeleteTaskModal'], []);
  }

  deleteTaskFromList = async (listId, taskId) => {
    await removeTaskFromDB(listId, taskId);
    let lists = this.state.lists.map(list => {
      if (list.id === listId) {
        list.items = list.items.filter(item => item.id !== taskId);
      }
      return list;
    });
    this.setState({ deleteTaskListId: null, deleteTaskItemId: null, lists });
    this.hideOrShow(['ConfirmDeleteTaskModal'], []);
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
          <ConfirmDeleteTaskModal 
            listId={this.state.deleteTaskListId}
            itemId={this.state.deleteTaskItemId}
            cancelStageForDeletion={this.cancelStageForDeletion}
            deleteTaskFromList={this.deleteTaskFromList}
          />
          <ListContainer 
            lists={this.state.lists} 
            stageForDeletion={this.stageForDeletion}
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
