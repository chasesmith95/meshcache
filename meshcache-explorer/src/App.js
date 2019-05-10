import React, { Component } from 'react';
import './App.css';
import Nav from "./layouts/Nav"
import Server from "./layouts/Server"
import { Route, Switch, Redirect } from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props)

    this.state={

    }

  }



  render() {
    return (
      <Nav>
        <Switch>
          <Route exact path="/" component={Server} />

          <Redirect from="*" to="/" />
        </Switch>
      </Nav>


    );
  }
}

export default App;
