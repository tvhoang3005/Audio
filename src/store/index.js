import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';
import chart from './chartSlice';
import queue from './queueSlice';
import song from './songSlice';
import track from './trackSlice';
import ui from './uiSlice';

const rootReducer = combineReducers({ auth, chart, queue, song, track, ui });

export const setupStore = (preloadedState) =>
    configureStore({ reducer: rootReducer, preloadedState });
