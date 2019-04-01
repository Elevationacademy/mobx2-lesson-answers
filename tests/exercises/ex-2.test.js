import React from 'react';
import Restaurant from '../../src/components/Restaurant'
import { render, mount, configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RestaurantStore, Res} from '../../src/stores/RestStore'
import {GeneralStore} from '../../src/stores/GeneralStore'
import Reservation from '../../src/components/Reservation';

configure({ adapter: new Adapter() });

let restaurantStore;
let generalStore;
let newRes;

describe("exercise 2", () => {
    beforeEach(() => {
        newRes = new Res("Hunter", 3)
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
    it('each reservation should be rendered using the reservation component', () => {
        const wrapper = shallow(<Restaurant.wrappedComponent RestaurantStore={restaurantStore} GeneralStore={generalStore}/>)
        expect(wrapper.find('.reservations').children()).toHaveLength(1)
    })
    it('each reservation shold have a "Complete Reservation" button', () => {
        const wrapper = shallow(<Reservation.wrappedComponent RestaurantStore={restaurantStore} res={newRes}/>)
        expect(wrapper.find('.completeRes').html()).toBeTruthy()
    })
})