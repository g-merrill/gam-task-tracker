import React, { Component } from 'react';
import './scss/App.scss';
import ListContainer from './components/ListContainer';
import AddTaskButton from './components/AddTaskButton';
import AddTaskModal from './components/AddTaskModal';
import { getAllLists } from './utils/listService';

class App extends Component {
  state = {
    lists: [],
  }

  hideOrShow = (idArray) => {
    idArray.forEach(id => 
      document.getElementById(id).classList.toggle('hidden'));
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
    this.setState({ lists });
  }

  render() {
    return (
      <div className='App'>
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
      </div>
    );
  }
}

export default App;
