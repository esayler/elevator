export default class Elevator {
  constructor(options = {}) {
    this.currFloor = options.currFloor || 0
    this.totalStops = options.totalStops || 0
    this.totalTraversed = options.totalTraversed || 0
    this.requestQueue = options.requests || []
    this.currRiders = options.currRiders || []
    this.status = options.status || 'idle'
    this.direction = options.direction || 'none'
    this.stops = options.stops || []
  }

  addRequest(user) {
    this.requestQueue.push(user)
  }

  next() {
    const nextRider = this.requestQueue.shift()
    const { startFloor, endFloor } = nextRider

    if (this.currFloor !== startFloor) {
      this.addRider(nextRider)
      this.goToFloor(startFloor)
    }
    this.goToFloor(endFloor)
    this.removeRiders()
  }

  goToFloor(n) {
    this.status = 'moving'
    if (this.currFloor < n) {
      while (this.currFloor < n) {
        this.direction = 'up'
        this.moveUp()
        this.totalTraversed += 1
      }
    } else if (this.currFloor > n) {
      while (this.currFloor > n) {
        this.direction = 'down'
        this.moveDown()
        this.totalTraversed += 1
      }
    } else if (this.currFloor === n) {
      this.status = 'idle'
      this.direction = 'none'
      return
    }
    this.totalStops += 1
    this.status = 'idle'
    this.direction = 'none'
    this.stops.push(this.currFloor)
  }

  moveUp() {
    this.currFloor += 1
  }

  moveDown() {
    if (this.currFloor !== 0) {
      this.currFloor -= 1
    }
  }

  addRider(rider) {
    this.currRiders.push(rider)
  }

  removeRiders() {
    this.currRiders = this.currRiders.filter(rider => {
      return rider.endFloor !== this.currFloor
    })
  }

  reset() {
    this.currFloor = 0
    this.totalStops = 0
    this.totalTraversed = 0
    this.requests = []
    this.status = 'idle'
    this.pickups = []
    this.dropoffs = []
    this.currRiders = []
    this.direction = 'none'
    this.totalTraversed = 0
    this.totalStops = 0
  }
}
