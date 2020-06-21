import React from 'react';
import { render } from 'react-dom';
import { App } from './app';
const rootEl = document.querySelector('#root');
render(<App />, rootEl);
if (module.hot) {
  module.hot.accept('./app', () => {
    console.log('hot accept');
    const NewApp = require('./app').App;
    render(<NewApp />, rootEl);
  });
}
