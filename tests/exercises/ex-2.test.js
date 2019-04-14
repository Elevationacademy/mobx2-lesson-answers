import React from 'react';
import Restaurant from '../../src/components/Restaurant'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Reservation as Res} from '../../src/stores/ReservationStore'
import { RestaurantStore } from '../../src/stores/RestaurantStore'
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
        expect(wrapper.find('#restPop').length, 
            "You should have a div with the ID 'restPop'")
            .toBe(1)
        expect(wrapper.find("#restPop").text(), 
            "the restPop div should display the computed restPopulation")
            .toBe("4")
    })
    it('the number of completed tables should be rendered with the id "completedTables"', () => {
        let bernard = restaurantStore.reservations.find(r => r.name === "Bernard")
        restaurantStore.completeRes(bernard.id)
        const wrapper = shallow(<Restaurant.wrappedComponent RestaurantStore={restaurantStore}/>)
        expect(wrapper.find("#completedTables").text(), 
            'the number of completed tables should be rendered with the id "completedTables"')
            .toBe("1")
    })

    it('The add reservation button should add a new reservation to the restaurant store using the general store to store inputs', () => {
        generalStore.handleInput("name", "Georgio")
        generalStore.handleInput("numPeople", "3")
        const wrapper = shallow(<Restaurant.wrappedComponent RestaurantStore={restaurantStore} GeneralStore={generalStore}/>)
        expect(wrapper.find("#addRes").length, 
            "You should have a button with the id addRes")
            .toBe(1)
        wrapper.find("#addRes").simulate("click")
        expect(restaurantStore.reservations.find(r => r.name === "Georgio"), 
            'The add reservation button should add a new reservation to the restaurant store using the general store to store inputs')
            .toBeTruthy()
    })
    it('each reservation should be rendered using the reservation component', () => {
        const wrapper = shallow(<Restaurant.wrappedComponent RestaurantStore={restaurantStore} GeneralStore={generalStore}/>)
        expect(wrapper.find('.reservations').length,
            "you should have a div with the class 'reservations'").toBe(1)
        expect(wrapper.find('.reservations').children(), 
            "each reservation should be mapped and rendered as an array of reservation components")
        .toHaveLength(1)
    })
    it('each reservation should have a "Complete Reservation" button', () => {
        const wrapper = shallow(<Reservation.wrappedComponent RestaurantStore={restaurantStore} res={newRes}/>)
        expect(wrapper.find('.completeRes').html(), 
            "each reservation should have a 'Complete Reservation' button with the id 'completeRes'")
        .toBeTruthy()
    })
})