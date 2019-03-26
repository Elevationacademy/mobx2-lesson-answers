import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react'
import {GeneralStore} from './stores/GeneralStore'
import {RestaurantStore} from './stores/RestStore'

const stores = {GeneralStore, 
                RestaurantStore}
ReactDOM.render(<Provider {...stores}>
                    <App />
                </Provider>, document.getElementById('root'));

