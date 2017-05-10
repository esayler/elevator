export default class Elevator {
  constructor(options = {}) {
    this.currFloor = options.currFloor || 0
    this.totalStops = options.totalStops || 0
    this.totalTraversed = options.totalTraversed || 0
    this.requests = options.requests || []
    this.pickups = options.pickups || []
    this.dropoffs = options.dropoffs || []
    this.currRiders = options.currRiders || []
    this.status = options.status || 'idle'
    this.direction = options.direction || 'none'
    this.stops = options.stops || []
  }

  addRequest(user, start, end) {
    this.requests.push({ user, start, end })
    this.pickups.push(start)
    this.dropoffs.push(end)
  }

  goToFloor(n) {
    this.stops.push(this.currFloor)
    this.status = 'moving'
    if (this.currFloor < n) {
      while (this.currFloor < n) {
        this.direction = 'up'
        this.moveUp()
        this.totalTraversed += 1
      }
    } else {
      while (this.currFloor > n) {
        this.direction = 'down'
        this.moveDown()
        this.totalTraversed += 1
      }
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
    this.currFloor -= 1
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
