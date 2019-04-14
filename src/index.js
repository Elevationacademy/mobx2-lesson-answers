import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react'
import {GeneralStore as generalStore} from './stores/GeneralStore'
import {RestaurantStore as restaurantStore} from './stores/RestaurantStore'

let GeneralStore = new generalStore()
let RestaurantStore = new restaurantStore()

const stores = {GeneralStore, 
                RestaurantStore}
ReactDOM.render(<Provider {...stores}>
                    <App />
                </Provider>, document.getElementById('root'));

