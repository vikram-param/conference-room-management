import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import App from 'app';

// import registerServiceWorker from './registerServiceWorker';

import configureStore from 'store/store';
const store = configureStore();

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// registerServiceWorker();
