import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header';
import HomeContainer from './components/HomeContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
          <HomeContainer />
      </div>
    );
  }
}

export default App;
