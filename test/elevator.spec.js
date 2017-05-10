/* eslint-env mocha */
import Elevator from '../src/elevator.js'

const should = chai.should()

describe('Elevator', function () {
  let elevator

  afterEach(function () {
    elevator.reset()
  })

  describe('instantiation', function () {
    context('without arguments', function () {
      beforeEach(() => {
        elevator = new Elevator()
      })

      it('should start at the bottom floor (0)', () => {
        elevator.should.have
          .property('currFloor')
          .that.is.an('number')
          .that.equals(0)
      })

      it('should start with 0 total floors traversed', () => {
        elevator.should.have
          .property('totalTraversed')
          .that.is.a('number')
          .that.equals(0)
      })

      it('should start with 0 total stops', () => {
        elevator.should.have
          .property('totalStops')
          .that.is.a('number')
          .that.equals(0)
      })

      it('should start with 0 requests', () => {
        elevator.should.have
          .property('requestQueue')
          .that.is.an('array')
          .with.lengthOf(0)
      })

      it('should start with 0 current riders', () => {
        elevator.should.have
          .property('currRiders')
          .that.is.an('array')
          .with.lengthOf(0)
      })

      it('should start with a status of "idle"', () => {
        elevator.should.have
          .property('status')
          .that.is.an('string')
          .that.equals('idle')
      })
    })

    context('with options object containing relevant key', function () {
      it('should default to the bottom floor (0)', () => {
        elevator = new Elevator({currFloor: 1})
        elevator.should.have
          .property('currFloor')
          .that.is.an('number')
          .that.equals(1)
      })

      it('should start with 0 total floors traversed', () => {
        elevator = new Elevator({totalTraversed: 1})
        elevator.should.have
          .property('totalTraversed')
          .that.is.a('number')
          .that.equals(1)
      })

      it('should start with 0 total stops', () => {
        elevator.should.have
          .property('totalStops')
          .that.is.a('number')
          .that.equals(0)
      })

      it('should start with 0 requests', () => {
        elevator.should.have
          .property('requestQueue')
          .that.is.an('array')
          .with.lengthOf(0)
      })

      it('should start with 0 current riders', () => {
        elevator.should.have
          .property('currRiders')
          .that.is.an('array')
          .with.lengthOf(0)
      })

      it('should start with a status of "idle"', () => {
        elevator.should.have
          .property('status')
          .that.is.an('string')
          .that.equals('idle')
      })
    })
  })

  describe('addRequest', function () {
    beforeEach(() => {
      elevator = new Elevator()
    })

    it('should add the request to the elevators request queue', () => {
      let mockUser = { name: 'Eric', startFloor: 0, currFloor: 0, endFloor: 3 }
      elevator.addRequest(mockUser)
      elevator.requestQueue.should.deep.equal([
        { name: 'Eric', startFloor: 0, currFloor: 0, endFloor: 3 },
      ])
    })
  })

  describe('moveUp()', function () {
    it('should increment the current floor count', () => {
      elevator = new Elevator()
      elevator.moveUp()
      elevator.currFloor.should.equal(1)
    })
  })

  describe('moveDown()', function () {
    it('should decrement the current floor count', () => {
      elevator = new Elevator({ currFloor: 1 })
      elevator.moveDown()
      elevator.currFloor.should.equal(0)
    })

    it('should not move down if the current floor is 0', () => {
      elevator = new Elevator({ currFloor: 0 })
      elevator.moveDown()
      elevator.currFloor.should.equal(0)
    })
  })

  describe('goToFloor', function () {
    it('should move up if dest "n" is greater than the current floor', () => {
      elevator = new Elevator({ currFloor: 0 })
      elevator.currFloor.should.equal(0)
      elevator.goToFloor(3)
      elevator.currFloor.should.equal(3)
      elevator.totalTraversed.should.equal(3)
    })

    it('should move down if dest "n" is less than the current floor', () => {
      elevator = new Elevator({ currFloor: 3 })
      elevator.currFloor.should.equal(3)
      elevator.goToFloor(0)
      elevator.currFloor.should.equal(0)
      elevator.totalTraversed.should.equal(3)
    })

    it('should update totalTraversed to equal total number of floors traversed', () => {
      elevator = new Elevator({ currFloor: 0 })
      elevator.currFloor.should.equal(0)
      elevator.goToFloor(3)
      elevator.currFloor.should.equal(3)
      elevator.totalTraversed.should.equal(3)
    })

    it('should increment add one stop to total stops', () => {
      elevator = new Elevator({ currFloor: 3 })
      elevator.currFloor.should.equal(3)
      elevator.goToFloor(0)
      elevator.currFloor.should.equal(0)
      elevator.stops.should.deep.equal([0])
    })

    it('should add each floor stopped at to stops array', () => {
      elevator = new Elevator({ currFloor: 3 })
      elevator.totalStops.should.equal(0)
      elevator.currFloor.should.equal(3)
      elevator.goToFloor(0)
      elevator.currFloor.should.equal(0)
      elevator.stops.should.deep.equal([0])
      elevator.stops.should.have.lengthOf(1)
      elevator.goToFloor(5)
      elevator.currFloor.should.equal(5)
      elevator.stops.should.deep.equal([0, 5])
      elevator.stops.should.have.lengthOf(2)
    })

    it('should not call moveDown() if currFloor is 0', () => {
      elevator = new Elevator({ currFloor: 0 })
      const moveDown = sinon.spy(elevator, 'moveDown')
      elevator.totalStops.should.equal(0)
      elevator.currFloor.should.equal(0)
      elevator.goToFloor(0)
      elevator.currFloor.should.equal(0)
      elevator.stops.should.deep.equal([])
      elevator.stops.should.have.lengthOf(0)
      moveDown.should.have.not.been.called
    })
  })

  describe('next()', function () {
    context('next request pickup floor is on current floor', () => {
      it("should only move to the next request's destination", () => {
        elevator = new Elevator({ currFloor: 0 })
        let mockUser = { name: 'Eric', startFloor: 0, currFloor: 0, endFloor: 3 }
        const goToFloor = sinon.spy(elevator, 'goToFloor')
        elevator.addRequest(mockUser)
        elevator.next()
        goToFloor.should.have.been.calledWith(3)
        elevator.currFloor.should.equal(3)
      })
    })

    context('next request pickup floor is not on current floor', () => {
      it("should move to the next request's startFloor, then go to destination", () => {
        elevator = new Elevator({ currFloor: 1 })
        let mockUser = { name: 'Eric', startFloor: 0, currFloor: 0, endFloor: 3 }
        const goToFloor = sinon.spy(elevator, 'goToFloor')
        elevator.addRequest(mockUser)
        elevator.next()
        goToFloor.should.have.been.calledWith(0)
        goToFloor.should.have.been.calledWith(3)
        elevator.currFloor.should.equal(3)
        elevator.stops.should.deep.equal([0, 3])
      })
    })
  })

  describe('addRider()', function () {
    it('should add Rider to currRiders', () => {
      elevator = new Elevator()
      let mockRider = { name: 'Eric', startFloor: 0, currFloor: 0, endFloor: 3 }
      elevator.addRider(mockRider)
      elevator.currRiders.should.deep.equal([
        { name: 'Eric', startFloor: 0, currFloor: 0, endFloor: 3 },
      ])
    })
  })

  describe('removeRiders()', function () {
    it('should remove any Riders from currRiders whose stop is currFloor', () => {
      elevator = new Elevator()
      let mockRider = { name: 'Eric', startFloor: 0, currFloor: 0, endFloor: 3 }
      elevator.addRider(mockRider)
      elevator.currRiders.should.not.be.empty
      elevator.goToFloor(3)
      elevator.removeRiders()
      elevator.currRiders.should.be.empty
    })
  })
})
