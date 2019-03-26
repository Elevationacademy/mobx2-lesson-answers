import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import ResInput from './ResInput';

@inject("GeneralStore", "RestaurantStore")

@observer
class Restaurant extends Component{
    render () {
        return (
            <div>
                <span>You have {this.props.RestaurantStore.openTables} open tables</span>
                <div>There are <span id="restPop">{this.props.RestaurantStore.restPopulation}</span> people in the restaurant</div>
                <div><span id="completedTables">{this.props.RestaurantStore.completedTables}</span> tables have been served today</div>
                <ResInput/>
                <button>Add Reservation</button> 
                {/* Make the Add Reservation button work */}
                {/* Map reservation data to Reservation components here */}
            </div>
        )
    }
}

export default Restaurant