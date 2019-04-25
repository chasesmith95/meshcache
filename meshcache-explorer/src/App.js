import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as web3Utils from "./util/web3Utils";


class App extends Component {
  constructor(props) {
    super(props)

    this.state={
      service : "services card",
      table : [],
      node : "node card",
      subscribers : "subscribers card",
      name : "{service registry}",
      contractAddress : ''
      
    }

  }

  componentDidMount() {
    this.getEthData();
  }

  getEthData=() => {
    var self=this;
    web3Utils.getServices().then(services => {
      var seen={};
      services.map(service => {
        seen[service]=1;
        return service;
      })
      self.setState({table:Object.keys(seen)});
    })

    var contractAddress=web3Utils.getContractAddress();
    self.setState({contractAddress});
  }

  getService=(serviceId) => {
    var self=this;
    web3Utils.getService(serviceId).then(service => {
      self.setState({service:JSON.stringify(service)});
    });
    web3Utils.getBootstraps(serviceId).then(bootstraps => {
      self.setState({node:bootstraps.toString()});
    });
  }
 
  render() {
    var self=this;
    return (
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1> Name: {this.state.name} </h1>
          <h3> Contract Address: {this.state.contractAddress} </h3>
        </header>



        <div className = "App-stats">
          <h1>Service: {this.state.service}</h1>
          <h1>Node: {this.state.node}</h1>
          <h1>Subscribers: {this.state.subscribers}</h1>
        </div>


      <div className = "App-table">
        <h1>Services: {this.state.table.map(serviceId => {
            return <span>
              [
              <a href='#table' onClick={() => {
                self.getService(serviceId);
            }}>{serviceId}</a>
              ]
            </span>
        })}</h1>
      </div>


      </div>


    );
  }
}

export default App;
