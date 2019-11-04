import React, { Component } from 'react';
import { StoreContext, LoaderContext } from '../../context';
import { withContext } from '../../hoc';
import setupTransloadit from '../../setupTransloadit';

class StoreProvider extends Component {
    constructor(props) {
        super(props);
        this.props.setLoading(true);
        this.getRessources();
    }

    getRessources = async () => {
        this.setState({
            transloaditParams : await setupTransloadit(),
        }, this.props.setLoading(false));
    }

    add = (key, value) => {
        this.setState({ [key] : value });
    }

    get = (keys = []) => {
        return keys.reduce((total, current) => {
            total[current] = !this.state[current] ? false : this.state[current];
            return total;
        }, {});
    }

    render() {
        if (!this.state) return false;

        return (
            <StoreContext.Provider value={{
                add : this.add,
                get : this.get,
            }}>
                { this.props.children }
            </StoreContext.Provider>
        );
    }
}

export default withContext(LoaderContext)(StoreProvider);
