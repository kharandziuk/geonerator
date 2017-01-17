const _ = require('lodash');
const geolib = require('geolib');
const math = require('mathjs');

const DEFAULT_DISTANCE_IN_KM = 5

function generatePointAround(center, maxDistance = DEFAULT_DISTANCE_IN_KM) {
  const randomRotation = math.random(0, 360)
  const randomRadius = math.random(0, maxDistance)
  const point = geolib.computeDestinationPoint(
    center, randomRadius, randomRotation
  )
  return point

}

function Point(base) {
  base = base || {
    latitude: math.random(-90, 90),
    longitude: math.random(-180, 180)
  }
  return _.extend(
    base,
    { generatePoint: _.partial(generatePointAround, base) }
  )
}

function BoundingBox(center, radius = DEFAULT_DISTANCE_IN_KM) {
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
  const generatePoint = () => {
    let _point
    do {
      _point = center.generatePoint(radius)
    } while(!geolib.isPointInside(_point, vertices))
    return _point
  }

  return _.extend(verticesByName, {
    vertices, center, generatePoint
  })
}

function PointInsideBBox(bbox) {
  const radius = geolib.getDistance(bbox.center, bbox.vertices[0])
  let result
  do {
    result = generatePointAround(bbox.center, radius)
  } while(!geolib.isPointInside(result, bbox.vertices))
  return result
}


module.exports = { BoundingBox, PointInsideBBox}
