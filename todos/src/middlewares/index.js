import { applyMiddleware } from 'redux';

import logger from './logger';
import thunk from 'redux-thunk';
import alertBitcoin from './alert-bitcoin';

export default applyMiddleware(thunk, alertBitcoin, logger)