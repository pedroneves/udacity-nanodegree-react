import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
import middlewares from './middlewares';
import ConnectedApp from './components/App';

const store = createStore(reducers, middlewares);

ReactDOM.render(
	<Provider store={ store }>
		<ConnectedApp />
	</Provider>,
	document.getElementById('root')
);