import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeContainer from './components/HomeContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
          <HomeContainer />
        <Footer />
      </div>
    );
  }
}

export default App;
