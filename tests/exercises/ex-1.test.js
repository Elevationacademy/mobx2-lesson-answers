import React from 'react';
import { render, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RestaurantStore} from '../../src/stores/RestStore'
import {isComputedProp} from 'mobx'

configure({ adapter: new Adapter() });

let restaurantStore

describe("exercise1", () => {
    beforeAll(() => {
        restaurantStore = new RestaurantStore()
        restaurantStore.addRes("Bernard", 4)
    });

    it ('restPopulation should be a computed value in your restaurant store, which automatically calculates the number of people in your restaurant', () => {
        const restPopulation = restaurantStore.restPopulation
        expect(isComputedProp(restaurantStore, "restPopulation"), 
                    "restPopulation should be a computed property").toBeTruthy()
        restaurantStore.addRes("Gerald", 2)
        expect(restaurantStore.restPopulation).toBe(restPopulation + 2)
    })

    it ('completeRes function should be a MobX action', () => {
        const completeRes = restaurantStore.completeRes
        expect(completeRes.isMobxAction).toBeTruthy()
    })

    it("completeRes function should complete the table with the given ID", () => {
        let bernard = restaurantStore.reservations.find(r => r.name === "Bernard")
        let completed = bernard.completed
        restaurantStore.completeRes(bernard.id)
        expect(bernard.completed).toBe(!completed)
    })
    
    it("completedTables should be a computed value in your restaurant store, which automatically calculates the number of tables that have been completed", () => {
        expect(isComputedProp(restaurantStore, "completedTables"), 
                    "completed tables should be a computed property").toBeTruthy()
        restaurantStore.addRes("Gerald", 2)
        let completedTables1 = restaurantStore.completedTables
        let res1 = restaurantStore.reservations.find(r => r.name === "Gerald").id
        restaurantStore.completeRes(res1)
        expect(restaurantStore.completedTables).toBe(completedTables1+1)
    })
})