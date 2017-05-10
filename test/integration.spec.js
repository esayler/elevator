/* eslint-env mocha */
import Elevator from '../src/elevator.js'

const should = chai.should()

describe('integration', function () {
  let elevator = new Elevator()

  afterEach(function () {
    elevator.reset()
  })

  describe('a single person can ride up and down', function () {
    it('person A goes up and down', () => {
      let mockRiderA = {
        name: 'Eric',
        startFloor: 0,
        currFloor: 0,
        endFloor: 3,
      }
      elevator.addRequest(mockRiderA)
      elevator.next()
      elevator.currFloor.should.equal(3)
      elevator.currRiders.should.be.empty
      let mockRiderA2 = {
        name: 'Eric',
        startFloor: 3,
        currFloor: 0,
        endFloor: 0,
      }
      elevator.addRequest(mockRiderA2)
      elevator.next()
      elevator.currRiders.should.be.empty
      elevator.currFloor.should.equal(0)
      elevator.requestQueue.should.be.empty
      elevator.stops.should.deep.equal([3, 0])
      elevator.stops.should.have.lengthOf(2)
      elevator.totalTraversed.should.equal(6)
      elevator.direction.should.equal('none')
      elevator.status.should.equal('idle')
    })
  })

  describe('mutiple people can request drop off floors', function () {
    it('should pick up and drop off each person in order of the requests', () => {
      let mockRiderA = {
        name: 'Bob',
        startFloor: 3,
        currFloor: 3,
        endFloor: 9,
      }

      let mockRiderB = {
        name: 'Sue',
        startFloor: 6,
        currFloor: 0,
        endFloor: 2,
      }

      elevator.addRequest(mockRiderA)
      elevator.addRequest(mockRiderB)
      elevator.next()
      elevator.stops.should.have.lengthOf(2)
      elevator.stops.should.deep.equal([3, 9])
      elevator.currFloor.should.equal(9)
      elevator.totalTraversed.should.equal(9)
      elevator.requestQueue.should.not.be.empty
      elevator.next()
      elevator.totalTraversed.should.equal(16)
      elevator.currFloor.should.equal(2)
      elevator.stops.should.have.lengthOf(4)
      elevator.stops.should.deep.equal([3, 9, 6, 2])
    })
    context('Person A sends an elevator request before Person B', function () {
      it('Person A goes up, Person B goes up', () => {
        let mockRiderA = {
          name: 'Bob',
          startFloor: 1,
          currFloor: 1,
          endFloor: 4,
        }

        let mockRiderB = {
          name: 'Sue',
          startFloor: 3,
          currFloor: 3,
          endFloor: 9,
        }

        elevator.addRequest(mockRiderA)
        elevator.addRequest(mockRiderB)
        elevator.next()
        elevator.stops.should.have.lengthOf(2)
        elevator.stops.should.deep.equal([1, 4])
        elevator.currFloor.should.equal(4)
        elevator.totalTraversed.should.equal(4)
        elevator.requestQueue.should.not.be.empty
        elevator.next()
        elevator.totalTraversed.should.equal(11)
        elevator.currFloor.should.equal(9)
        elevator.stops.should.have.lengthOf(4)
        elevator.stops.should.deep.equal([1, 4, 3, 9])
      })

      it('Person A goes up, Person B goes down', () => {
        let mockRiderA = {
          name: 'Bob',
          startFloor: 9,
          currFloor: 9,
          endFloor: 10,
        }

        let mockRiderB = {
          name: 'Sue',
          startFloor: 10,
          currFloor: 10,
          endFloor: 0,
        }

        elevator.addRequest(mockRiderA)
        elevator.addRequest(mockRiderB)
        elevator.next()
        elevator.stops.should.have.lengthOf(2)
        elevator.stops.should.deep.equal([9, 10])
        elevator.currFloor.should.equal(10)
        elevator.totalTraversed.should.equal(10)
        elevator.requestQueue.should.not.be.empty
        elevator.next()
        elevator.totalTraversed.should.equal(20)
        elevator.currFloor.should.equal(0)
        elevator.stops.should.have.lengthOf(3)
        elevator.stops.should.deep.equal([9, 10, 0])
      })

      it('Person A goes down, Person B goes up', () => {
        let mockRiderA = {
          name: 'Bob',
          startFloor: 10,
          currFloor: 10,
          endFloor: 4,
        }

        let mockRiderB = {
          name: 'Sue',
          startFloor: 2,
          currFloor: 2,
          endFloor: 8,
        }

        elevator.addRequest(mockRiderA)
        elevator.addRequest(mockRiderB)
        elevator.currFloor.should.equal(0)
        elevator.next()
        elevator.stops.should.have.lengthOf(2)
        elevator.stops.should.deep.equal([10, 4])
        elevator.currFloor.should.equal(4)
        elevator.totalTraversed.should.equal(16)
        elevator.requestQueue.should.not.be.empty
        elevator.next()
        elevator.totalTraversed.should.equal(24)
        elevator.currFloor.should.equal(8)
        elevator.stops.should.have.lengthOf(4)
        elevator.stops.should.deep.equal([10, 4, 2, 8])
      })

      it('Person A goes down, Person B goes down', () => {
        let mockRiderA = {
          name: 'Bob',
          startFloor: 10,
          currFloor: 10,
          endFloor: 0,
        }

        let mockRiderB = {
          name: 'Sue',
          startFloor: 5,
          currFloor: 5,
          endFloor: 0,
        }

        elevator.addRequest(mockRiderA)
        elevator.addRequest(mockRiderB)
        elevator.next()
        elevator.stops.should.have.lengthOf(2)
        elevator.stops.should.deep.equal([10, 0])
        elevator.currFloor.should.equal(0)
        elevator.totalTraversed.should.equal(20)
        elevator.requestQueue.should.not.be.empty
        elevator.next()
        elevator.currFloor.should.equal(0)
        elevator.stops.should.have.lengthOf(4)
        elevator.stops.should.deep.equal([10, 0, 5, 0])
        elevator.totalTraversed.should.equal(30)
      })
    })
  })
})
