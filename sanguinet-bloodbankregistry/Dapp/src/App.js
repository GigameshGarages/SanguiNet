import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Form from './components/form';
import DonorView from './components/donorView'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import OrbitHandler from './orbitdb';

import Portis from '@portis/web3';
import Web3 from 'web3';

const portis = new Portis('dbffa7d7-3195-4d1e-8d69-48cd35da3421', 'mainnet');
const web3 = new Web3(portis.provider);

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
