/* eslint-env mocha */
import Elevator from '../src/elevator.js'

const should = chai.should()

describe('integration', function () {
  let elevator = new Elevator()

  afterEach(function () {
    elevator.reset()
  })

  describe('level 2', function () {
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
    })

    describe('level 3', function () {
      it.skip('', () => {
        elevator.should.have
          .property('currFloor')
          .that.is.an('number')
          .that.equals(0)
      })
    })
  })
})
