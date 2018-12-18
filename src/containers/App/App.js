import React, { Component } from 'react';
import '../../assets/style/index.scss';
import './App.scss'; 
import 'bulma/css/bulma.css'
import Generator from '../Generator/Generator';


class App extends Component {

  render() {

    return (
        <section className="App">
          <div className="container is-fluid">            
            <Generator />
          </div>
        </section>
    );
  }
}

export default App;