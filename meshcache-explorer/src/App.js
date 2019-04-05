'use strict';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Registry from './regis.js';

var service = "services card";
var table = "services table";
var node = "node card";
var subscribers = "subscribers card";
var name = "{service registry}"
var contractAddress = "contract address";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1> {name} </h1>
          <h3> {contractAddress} </h3>
        </header>



        <div className = "App-stats">
          <h1>{service}</h1>
          <h1>{node}</h1>
          <h1>{subscribers}</h1>
        </div>


      <div className = "App-table">
        <h1>{table}</h1>
      </div>


      </div>


    );
  }
}

export default App;
