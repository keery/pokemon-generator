import React from 'react';
import { LoaderContext } from '../../context';
import { Loader } from '..';

export default () => (
    <LoaderContext.Consumer>
        { ({ isLoading }) => {
            if (isLoading) {
                return <Loader />;
            }
        }}
    </LoaderContext.Consumer>
);
