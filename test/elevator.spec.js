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
          .property('requests')
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
          .property('requests')
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
      elevator.addRequest({ name: 'Eric' }, 0, 2)
      elevator.requests.should.deep.equal([
        { user: { name: 'Eric' }, start: 0, end: 2 },
      ])
      elevator.pickups.should.deep.equal([0])
      elevator.dropoffs.should.deep.equal([2])
    })
  })

  describe('goToFloor', function () {
    it('should move up if dest "n" is greater than the current floor', () => {
      elevator = new Elevator({currFloor: 0})
      elevator.currFloor.should.equal(0)
      elevator.goToFloor(3)
      elevator.currFloor.should.equal(3)
      elevator.totalTraversed.should.equal(3)
    })

    it('should move down if dest "n" is less than the current floor', () => {
      elevator = new Elevator({currFloor: 3})
      elevator.currFloor.should.equal(3)
      elevator.goToFloor(0)
      elevator.currFloor.should.equal(0)
      elevator.totalTraversed.should.equal(3)
    })

    it('should update totalTraversed to equal total number of floors traversed', () => {
      elevator = new Elevator({currFloor: 0})
      elevator.currFloor.should.equal(0)
      elevator.goToFloor(3)
      elevator.currFloor.should.equal(3)
      elevator.totalTraversed.should.equal(3)
    })

    it('should increment totalStops by one', () => {
      elevator = new Elevator({currFloor: 3})
      elevator.totalStops.should.equal(0)
      elevator.currFloor.should.equal(3)
      elevator.goToFloor(0)
      elevator.currFloor.should.equal(0)
      elevator.totalStops.should.equal(1)
    })

    it('should add each floor stopped at to stops array', () => {
      elevator = new Elevator({currFloor: 3})
      elevator.totalStops.should.equal(0)
      elevator.currFloor.should.equal(3)
      elevator.goToFloor(0)
      elevator.currFloor.should.equal(0)
      elevator.totalStops.should.equal(1)
      elevator.stops.should.deep.equal([3, 0])
      elevator.stops.should.have.lengthOf(2)
    })
  })
})
