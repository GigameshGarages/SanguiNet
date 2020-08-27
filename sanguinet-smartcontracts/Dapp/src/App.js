import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Form from './components/form';
import DonorView from './components/donorView'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import OrbitHandler from './orbitdb';

let orbit;
class App extends Component {
  render() {
    orbit = new OrbitHandler();
    orbit.setUp();
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path = "/register" component = { Form } />
            <Route exact path = "/view" component = { DonorView } />
            <Redirect to = "/register" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;