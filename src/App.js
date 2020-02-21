import React, { Component } from 'react';
import './scss/App.scss';
import ListContainer from './components/ListContainer';
import AddTaskButton from './components/AddTaskButton';
import AddTaskModal from './components/AddTaskModal';

class App extends Component {
  state = {
    lists: [],
  }

  componentDidMount = () => {
    let list1 = {name: 'List 1', items: ['Drink milk', 'Buy bread']};
    let list2 = {name: 'List 2', items: ['Eat food', 'Get sleep']};
    let list3 = {name: 'List 3', items: ['Call that person because you really need to do that supercalifragilisticexpialadocious', 'Drive around']};
    let list4 = {name: 'List 4', items: ['Yes, do that', 'ASDFASDFASdfasdf', 'asdfasdfasdf', 'asdfa', 'aawefasd', 'awefaa']};
    let lists = [
      list1,
      list2,
      list3,
      list4,
    ];
    this.setState({ lists });
  }

  render() {
    return (
      <div className="App">
        <AddTaskButton />
        <AddTaskModal 
          lists={this.state.lists} 
        />
        <ListContainer 
          lists={this.state.lists} 
        />
      </div>
    );
  }
}

export default App;
