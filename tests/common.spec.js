'use strict';
const _ = require('lodash');
const geolib = require('geolib');
const should = require('chai').expect;

const generate = require('../lib/geonerator')

const point = (latitude, longitude) => ({latitude, longitude})

describe('bounding box', function() {

  it('can generate random bounding box with a default radius', function(){
    const bbox = generate()
    should.fail()
  })

  it('can generate bounding box with center and radius', function() {
    const RADIUS = 5
    const center = point(52, 13)
    const bbox = generate(center, RADIUS)
    _(bbox.vertices).each(function(v) {
      should(geolib.getDistance(center, v)).equal(RADIUS)
    })
    should(bbox).eql({
      center: { latitude: 52, longitude: 13 },
      topLeft: { latitude: 52.000031760230186, longitude: 13.000051587219987 },
      topRight: { latitude: 51.99996823974729, longitude: 13.00005158714681 },
      bottomRight: { latitude: 51.99996823974729, longitude: 12.999948412853202 },
      bottomLeft: { latitude: 52.000031760230186, longitude: 12.999948412780023 },
      vertices: [
        { latitude: 52.000031760230186, longitude: 13.000051587219987 },
        { latitude: 51.99996823974729, longitude: 13.00005158714681 },
        { latitude: 51.99996823974729, longitude: 12.999948412853202 },
        { latitude: 52.000031760230186, longitude: 12.999948412780023 } 
      ]
    })
  })

  xit('can generate bounding box with center and zero radius', function() {
    should(generate(point(52, 13), 0)).eql({
      center: { latitude: 52, longitude: 13 },
      rightBottom: { latitude: 52.00000000000001, longitude: 13.000000000000005 },
      topLeft: { latitude: 52.00000000000001, longitude: 13.000000000000005 }
    })
  })

  xit('can generate a point inside of bounding box', function() {
    const bbox = generate()
    const pointInside = bbox.generatePoint()
    const isPointInside = geolib.isPointInside(point, [
      bbox.topLeft, bbox.topRight,
      bbox.bottomRight, bbox.bottomLeft,
    ])
    should(isPointInside).to.be.true()
  })
})

describe('point', function() {
  xit('can generate a point around other point', function() {
  })

  xit('can generate a point on some distance from other point', function() {
  })
})
