import React, { Component } from 'react';
import '../../assets/style/index.scss';
import './App.scss'; 
import 'bulma/css/bulma.css'
import Generator from '../Generator/Generator';
import Header from '../../components/Header'


class App extends Component {

  render() {

    return (
        <section className="App">
          <Header />
          <div className="container is-fluid">
            <div className="global-wrapper">
              <Generator />
            </div>
          </div>
        </section>
    );
  }
}

export default App;