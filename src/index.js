import Elevator from './elevator'

const building = (() => {
  let elevator = new Elevator()

  console.log(elevator.currFloor)
})()
