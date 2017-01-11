'use strict';
const geolib = require('geolib');
const should = require('chai').expect;

function generate(center, radius) {
  const topLeft = geolib.computeDestinationPoint(
    center, radius, 360 - 45
  )
  const rightBottom = geolib.computeDestinationPoint(
    center, radius, 360 - 45
  )
  return {center, rightBottom, topLeft}
}
const point = (latitude, longitude) => ({latitude, longitude})

describe.only('bounding box', function() {
  it('can generate bounding box with center and radius', function() {
    should(generate(point(52, 13), 5)).eql({
      center: { latitude: 52, longitude: 13 },
      rightBottom: { latitude: 52.000031760230186, longitude: 12.999948412780023 },
      topLeft: { latitude: 52.000031760230186, longitude: 12.999948412780023 }
    })

  })
  it('can generate bounding box with center and zero radius', function() {
    should(generate(point(52, 13), 0)).eql({
      center: { latitude: 52, longitude: 13 },
      rightBottom: { latitude: 52.00000000000001, longitude: 13.000000000000005 },
      topLeft: { latitude: 52.00000000000001, longitude: 13.000000000000005 }
    })
  })
})

describe('point', function() {
  xit('can generate a point around other point', function() {
  })

  xit('can generate a point on some distance from other point', function() {
  })
})
