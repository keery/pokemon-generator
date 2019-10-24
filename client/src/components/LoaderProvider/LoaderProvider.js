import React, { Component } from 'react';
import { LoaderContext } from '../../context';

class LoaderProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading : false,
        };
    }

    setLoading = (enable) => {
        if (enable !== this.state.isLoading && typeof enable === 'boolean') {
            this.setState({ isLoading : enable });
        }
    }

    render() {
        const { children } = this.props;
        const { isLoading } = this.state;

        return (
            <LoaderContext.Provider value={{ isLoading, setLoading : this.setLoading }}>
                { children }
            </LoaderContext.Provider>
        );
    }
}

export default LoaderProvider;
