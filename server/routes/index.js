import express from 'express';
import api from './api';

export default (app) => {
    app.use('/api', api);
};
