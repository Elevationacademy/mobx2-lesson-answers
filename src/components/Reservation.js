import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

//inject your store here
@inject("RestaurantStore")
@observer
class Reservation extends Component{
    completeRes = (e) => {
        this.props.RestaurantStore.completeRes(e.target.id)
    }
    render () {
        let res = this.props.res
        return (
            <div 
                className = {res.completed ? "conditional":null}>
                {res.name} : {res.numPeople}  
                <button className = "completeRes"
                        id = {res.id}
                        onClick = {this.completeRes}>
                        Complete Reservation </button>
            </div>
        )
    }
}

export default Reservation