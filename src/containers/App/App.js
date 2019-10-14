import React, { Suspense } from 'react';
import 'bulma/css/bulma.css';
import { Generator } from '..';
import {
    Header, Loader, ErrorBoundary, LoaderProvider, LoaderConsumer, ModalConsumer, ModalProvider,
} from '../../components';
import './App.scss';
import '../../assets/style/index.scss';

const App = () => (
    <Suspense fallback={<Loader />}>
        <ErrorBoundary>
            <LoaderProvider>
                <ModalProvider>
                    <LoaderConsumer />
                    <ModalConsumer />
                    <section className="App">
                        <Header />
                        <div className="container is-fluid">
                            <div className="columns is-centered is-vcentered full-height">
                                <Generator />
                            </div>
                        </div>
                    </section>
                </ModalProvider>
            </LoaderProvider>
        </ErrorBoundary>
    </Suspense>
);

export default App;
