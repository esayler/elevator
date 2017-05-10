export default class Person {
  constructor(name, start, dest) {
    this.name = name || 'Alice'
    this.startFloor = start || 0
    this.currFloor = this.startFloor
    this.endFloor = dest || 0
  }

}
