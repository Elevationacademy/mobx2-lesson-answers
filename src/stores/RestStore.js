import { observable, computed, action } from  'mobx'

export class Res {
    @observable name
    @observable id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10) 
    //giving a random short string ID
    @observable numPeople
    @observable completed = false
    constructor(name, numPeople) {
        this.name = name
        this.numPeople = numPeople
    }
}

export class RestaurantStore {
    @observable reservations = []
    @observable numTables = 10
    @computed get totalReservations() {
        return this.reservations.length
    } 
    @computed get openTables() { //automatically caluclates the number of tables avalible, only when the state is affected
        let counter = 0
        this.reservations.forEach(r => !r.completed ? counter ++: null)
        return (this.numTables - counter)
    }
    @computed get restPopulation() {
        let totalPeople = 0
        this.reservations.forEach(r => totalPeople += parseInt(r.numPeople))
        return totalPeople
    }
    @computed get completedTables() {
        let totalTables = 0
        this.reservations.forEach(r => r.completed ? totalTables+= 1 : null)
        return totalTables
    }
    @action addRes = (name, numPeople) => {
        this.reservations.push(new Res(name, numPeople))
    }
    @action completeRes = (id) => {
        this.reservations.find(r => r.id === id).completed = true
    }
}
// const HaAchim = new RestaurantStore()
// HaAchim.addRes("Bernard", 4)

// export default HaAchim