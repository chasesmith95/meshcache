import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as web3Utils from "./util/web3Utils";


class App extends Component {
  constructor(props) {
    super(props)
    var self=this;

    this.state={
      service : "services card",
      table : "",
      node : "node card",
      subscribers : "subscribers card",
      name : "{service registry}",
      contractAddress : web3Utils.getContractAddress()
    }

    web3Utils.getServices().then(services => {
      self.setState({table:services.toString()});
    })




  }
  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1> Name: {this.state.name} </h1>
          <h3> Contract Address: {this.state.contractAddress} </h3>
        </header>



        <div className = "App-stats">
          <h1>{this.state.service}</h1>
          <h1>{this.state.node}</h1>
          <h1>{this.state.subscribers}</h1>
        </div>


      <div className = "App-table">
        <h1>Services: {this.state.table}</h1>
      </div>


      </div>


    );
  }
}

export default App;
