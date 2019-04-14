import React from 'react';
import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {RestaurantStore} from '../../src/stores/RestaurantStore'
import {Reservation as Res} from '../../src/stores/ReservationStore'
import Reservation from '../../src/components/Reservation';

configure({ adapter: new Adapter() });

let restaurantStore;
let newRes;

describe("exercise 3", () => {
    beforeEach(() => {
        newRes = new Res("Hunter", 3)
        newRes.completed = true
        restaurantStore = new RestaurantStore()
    });
    it('each completed reservation should be conditionally rendered with the class "conditional"', () => {
        const wrapper = shallow(<Reservation.wrappedComponent RestaurantStore={restaurantStore} res={newRes}/>)
        expect(wrapper.find(".conditional").first().html(), 
            'each completed reservation should be conditionally rendered with the class "conditional"')
            .toBeTruthy()
    })
})