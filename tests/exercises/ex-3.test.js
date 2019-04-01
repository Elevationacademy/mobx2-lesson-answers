import React from 'react';
import { render, mount, configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RestaurantStore, Res} from '../../src/stores/RestStore'
import Reservation from '../../src/components/Reservation';

configure({ adapter: new Adapter() });

let restaurantStore;
let newRes;

describe("exercise 2", () => {
    beforeEach(() => {
        newRes = new Res("Hunter", 3)
        newRes.completed = true
        restaurantStore = new RestaurantStore()
    });
    it('the number of people in the restaurant should be rendered with the id "restPop"', () => {
        const wrapper = shallow(<Reservation.wrappedComponent RestaurantStore={restaurantStore} res={newRes}/>)
        expect(wrapper.find(".conditional").html()).toBeTruthy()
    })
})