import express from 'express';
import api from './api';
import { IMAGES_PATH } from '../const';

export default (app) => {
    app.use('/static/images', express.static(IMAGES_PATH));
    app.use('/api', api);
};
