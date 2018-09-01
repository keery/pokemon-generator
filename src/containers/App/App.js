import React, { Component } from 'react';
import '../../assets/style/index.scss';
import './App.scss'; 
import 'bulma/css/bulma.css'
import Generator from '../Generator/Generator';


class App extends Component {

  render() {

    return (
        <section className="App container is-fluid">
          {/* <div id="test">test</div> */}
          <Generator />
        </section>
    );
  }
}

export default App;