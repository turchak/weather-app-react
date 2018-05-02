import React, { Component } from 'react';
import './App.css';
import { Search } from './components/Search/Search';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="app">
        <Search />
      </div>
    );
  }
}

export default App;
