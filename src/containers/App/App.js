import React, { Suspense } from 'react';
import 'bulma/css/bulma.css';
import Generator from '../Generator/Generator';
import { Header, Loader } from '../../components';
import './App.scss';
import '../../assets/style/index.scss';

const App = () => (
    <Suspense fallback={<Loader />}>
        <section className="App">
            <Header />
            <div className="container is-fluid">
                <div className="columns is-centered is-vcentered full-height">
                    <Generator />
                </div>
            </div>
        </section>
    </Suspense>
);

export default App;
