import express from 'express';
import api from './api';
import { IMAGES_PATH } from '../const';

export default (app) => {
    app.use('/api', api);
};
