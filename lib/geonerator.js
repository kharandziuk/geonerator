const _ = require('lodash');
const geolib = require('geolib');
const math = require('mathjs');

const DEFAULT_DISTANCE_IN_KM = 5

function Point() {
  const latitude = math.random(-90, 90)
  const longitude = math.random(-180, 180)
  return {latitude, longitude}
}

function generate(center, radius = DEFAULT_DISTANCE_IN_KM) {
  center = center || Point()
  const names = [
    'topLeft', 'topRight',
    'bottomRight', 'bottomLeft',
  ]
  const pairs = _(names).map((n, i) => [n, i * 90 + 45]).value()
  const verticesByName = _(pairs).reduce(
    function(obj, [name, rotation]) {
      obj[name] = geolib.computeDestinationPoint(
        center, radius, rotation
      )
      return obj
    },
    {}
  )
  const vertices = _(names).map(name => verticesByName[name]).value()

  const generatePoint = function() {
    const randomRotation = math.random(0, 360)
    const randomRadius = math.random(0, radius)
    const point = geolib.computeDestinationPoint(
      center, randomRadius, randomRotation
    )
    if (geolib.isPointInside(point, vertices)) {
      return point
    } else {
      return generatePoint() // HACK: maybe there is a better solution
    }

  }

  return _.extend(verticesByName, {
    vertices, center, generatePoint
  })
}

module.exports = generate
