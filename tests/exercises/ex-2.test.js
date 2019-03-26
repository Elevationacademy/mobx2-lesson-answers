import React from 'react';
import ReactDOM from 'react-dom'
import App from '../../src/App';
import Restaurant from '../../src/components/Restaurant'
import { Provider } from 'mobx-react'
import { render, mount, configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RestaurantStore} from '../../src/stores/RestStore'
import {GeneralStore} from '../../src/stores/GeneralStore'

configure({ adapter: new Adapter() });

let restaurantStore;
let generalStore;

describe("exercise 2", () => {
    beforeAll(() => {
        restaurantStore = new RestaurantStore()
        restaurantStore.addRes("Bernard", 4)
        generalStore = new GeneralStore()
    });
    it('the number of people in the restaurant should be rendered with the id "restPop"', () => {
        const wrapper = shallow(<Restaurant.wrappedComponent RestaurantStore={restaurantStore}/>)
        expect(wrapper.find("#restPop").text()).toBe("4")
    })
    it('the number of completed tables should be rendered with the id "completedTables"', () => {
        let bernard = restaurantStore.reservations.find(r => r.name === "Bernard")
        expect(bernard.id).toBeTruthy()
        restaurantStore.completeRes(bernard.id)
        const wrapper = shallow(<Restaurant.wrappedComponent RestaurantStore={restaurantStore}/>)
        expect(wrapper.find("#completedTables").text()).toBe("1")
    })

    it('The add reservation button should add a new reservation to the restaurant store using the general store to store inputs', () => {
        generalStore.handleInput("name", "Georgio")
        generalStore.handleInput("numPeople", "3")
        const wrapper = shallow(<Restaurant.wrappedComponent RestaurantStore={restaurantStore} GeneralStore={generalStore}/>)
        wrapper.find("#addRes").simulate("click")
        expect(restaurantStore.reservations.find(r => r.name === "Georgio")).toBeTruthy()
    })
    // it('the location should be rendered next to each item', () => {
    //     const wrapper = render(<App store = {store}/>)
    //     let location = wrapper.find('.location').first().html()
    //     console.log(location)
    //     expect(location).toBeTruthy()
    // })
})