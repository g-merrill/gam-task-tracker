import React, { Component } from 'react';
import './scss/App.scss';
import ListContainer from './components/ListContainer';
import AddTaskButton from './components/AddTaskButton';
import AddTaskModal from './components/AddTaskModal';
import { getAllLists } from './utils/listService';

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

  addTaskToList = (list, task) => {
    let lists = this.state.lists.map(oldList => {
      if (oldList.name === list) {
        oldList.items.push({'description': task});
      }
      return oldList;
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
