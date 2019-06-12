import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {RestaurantStore} from '../../src/stores/RestaurantStore'
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
            "restPopulation should be a computed property")
            .toBeTruthy()
        restaurantStore.addRes("Gerald", 2)
        restaurantStore.addRes("Lerald", 2)
        let lerald = restaurantStore.reservations.find(r => r.name === "Lerald")
        lerald.seated = true
        lerald.completed = false
        expect(restaurantStore.restPopulation, 
            "the restPopulation property should count the total number of people in the restaurant")
            .toBe(restPopulation + 2)
    })

    it ('completeRes function should be a MobX action', () => {
        const completeRes = restaurantStore.completeRes
        expect(completeRes.isMobxAction, 
            "the completeRes method should be a mobx action")
            .toBeTruthy()
    })

    it("completeRes function should complete the table with the given ID", () => {
        let bernard = restaurantStore.reservations.find(r => r.name === "Bernard")
        let completed = bernard.completed
        restaurantStore.completeRes(bernard.id)
        expect(bernard.completed, 
            "the completeRes function should complete the table with the given ID")
            .toBe(!completed)
    })
    
    it("completedTables should be a computed value in your restaurant store, which automatically calculates the number of tables that have been completed", () => {
        expect(isComputedProp(restaurantStore, "completedTables"), 
                    "completed tables should be a computed property")
                    .toBeTruthy()
        restaurantStore.addRes("Gerald", 2)
        let completedTablesCount = restaurantStore.completedTables
        let res1 = restaurantStore.reservations.find(r => r.name === "Gerald").id
        restaurantStore.completeRes(res1)
        expect(restaurantStore.completedTables, 
            "the completedTables property should automatically update when a table is completed")
            .toBe(completedTablesCount+1)
    })
})