import * as React from 'react';
import { render } from 'react-dom';
import { App } from './app';
const rootEl = document.querySelector('#root');
render(<App />, rootEl);
if (module.hot !== undefined) {
  module.hot.accept('./app', () => {
    console.log('hot accept');
    const NewApp: React.FC = require('./app').App;
    render(<NewApp />, rootEl);
  });
}
