import React, { Component } from 'react';
import 'bulma/css/bulma.css' 
import Generator from '../Generator/Generator';
import Header from '../../components/Header'
import './App.scss'; 
import '../../assets/style/index.scss';


class App extends Component {
  render() {
    return (
        <section className="App">
          <Header />
          <div className="container is-fluid">
            <div className="columns is-centered is-vcentered full-height">
              <Generator />
              <div className="shape-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="839" height="783" viewBox="0 0 839 783" className="shape shape-1">
                  <path d="M417,9C581.813,25.749,841,231.508,839,361S745,609.688,669,678,467,857.556,237,708,3,523.361,1,403-11,235.147,125,107,299-2.992,417,9Z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="632" height="669" viewBox="0 0 632 669" className="shape shape-2">
                  <path d="M386,2c96.9,36.313,196,224.529,212,265s54,103.656,20,162S508,564.756,468,597s-86,93.757-168,64S106,584.7,76,569,0,494.583,0,439,22,270.44,30,226s10-89.626,32-114S188,52.32,254,32,370-4,386,2Z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="839" height="783" viewBox="0 0 839 783" className="shape shape-3">
                <path d="M386,2c96.9,36.313,196,224.529,212,265s54,103.656,20,162S508,564.756,468,597s-86,93.757-168,64S106,584.7,76,569,0,494.583,0,439,22,270.44,30,226s10-89.626,32-114S188,52.32,254,32,370-4,386,2Z"/>
                </svg>
              </div>
            </div>
          </div>
        </section>
    );
  }
}

export default App;