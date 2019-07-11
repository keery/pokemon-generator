import React from 'react';
import 'bulma/css/bulma.css';
import Generator from '../Generator/Generator';
import { Header } from '../../components';
import './App.scss';
import '../../assets/style/index.scss';

const App = () => (
    <section className="App">
        <Header />
        <div className="container is-fluid">
            <div className="columns is-centered is-vcentered full-height">
                <Generator />
            </div>
        </div>
    </section>
);

export default App;
