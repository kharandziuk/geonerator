'use strict';

const _ = require('lodash');
const geolib = require('geolib');
const should = require('chai').expect;

const {BoundingBox, PointInsideBBox} = require('../lib/georandom')

const _Point = (latitude, longitude) => ({latitude, longitude})

describe('bounding box', function() {

  it('can generate random bounding box with a default radius', function(){
    const bbox = BoundingBox()
    _(bbox.vertices).each(function(v) {
      should(geolib.getDistance(bbox.center, v)).equal(5) // FIXME: constant
    })
  })

  it('can generate bounding box with center and radius', function() {
    const RADIUS = 5
    const center = _Point(52, 13)
    const bbox = BoundingBox(center, RADIUS)
    _(bbox.vertices).each(function(v) {
      should(geolib.getDistance(center, v)).equal(RADIUS)
    })
    should(bbox.center).eql({ latitude: 52, longitude: 13 })
    should(bbox.topLeft)
        .eql({ latitude: 52.000031760230186, longitude: 13.000051587219987 })
    should(bbox.topRight)
        .eql({ latitude: 51.99996823974729, longitude: 13.00005158714681 })
    should(bbox.bottomRight)
        .eql({ latitude: 51.99996823974729, longitude: 12.999948412853202 })
    should(bbox.bottomLeft)
        .eql({ latitude: 52.000031760230186, longitude: 12.999948412780023 })
    should(bbox.vertices).eql([
        { latitude: 52.000031760230186, longitude: 13.000051587219987 },
        { latitude: 51.99996823974729, longitude: 13.00005158714681 },
        { latitude: 51.99996823974729, longitude: 12.999948412853202 },
        { latitude: 52.000031760230186, longitude: 12.999948412780023 } 
      ])
  })

  it('can generate a point inside of a bounding box', function() {
    const bbox = BoundingBox()
    const pointInside = PointInsideBBox(bbox)
    const isPointInside = geolib.isPointInside(pointInside, bbox.vertices)
    should(isPointInside).to.be.true
  })

  it('can generate a point inside of bounding box with distance', function() {
    const EXPECTED_DISTANCE = 3
    const bbox = BoundingBox()
    const pointInside = PointInsideBBox(bbox, EXPECTED_DISTANCE)
    const isPointInside = geolib.isPointInside(pointInside, bbox.vertices)
    should(isPointInside).to.be.true
    should(geolib.getDistance(bbox.center, pointInside)).equal(EXPECTED_DISTANCE)
  })
})

describe('point', function() {
  xit('can generate a point around other point', function() {
  })

  xit('can generate a point on some distance from other point', function() {
  })
})
