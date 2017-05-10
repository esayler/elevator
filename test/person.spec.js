/* eslint-env mocha */
import Person from '../src/Person.js'

const should = chai.should()

describe('Person', function () {
  let person = null

  describe('instantiation', function () {
    context('without arguments', () => {
      beforeEach(function () {
        person = new Person()
      })

      it('should have a name', () => {
        person.should.have
          .property('name')
          .that.is.an('string')
          .that.equals('Alice')
      })

      it('should start with a default start floor of zero', () => {
        person.should.have
          .property('startFloor')
          .that.is.a('number')
          .that.equals(0)
      })
      it('should start with a default current floor of zero', () => {
        person.should.have
          .property('currFloor')
          .that.is.a('number')
          .that.equals(0)
      })
      it('should start with a default destination floor of zero', () => {
        person.should.have
          .property('endFloor')
          .that.is.a('number')
        .that.equals(0)
      })
    })

    context('with arguments', () => {
      beforeEach(function () {
        person = new Person('Eric', 3, 0)
      })

      it('should have a name of the first provided argument', () => {
        person.should.have
          .property('name')
          .that.is.an('string')
          .that.equals('Eric')
      })

      it('should have a startFloor of the provided second argument', () => {
        person.should.have
          .property('startFloor')
          .that.is.a('number')
          .that.equals(3)
      })
      it('should have a currFloor of the provided startFloor (second argument) ', () => {
        person.should.have
          .property('startFloor')
          .that.is.a('number')
          .that.equals(3)
      })
      it('should have a destination floor defined by the provided third argument', () => {
        person.should.have
          .property('endFloor')
          .that.is.a('number')
          .that.equals(0)
      })
    })
  })
})
