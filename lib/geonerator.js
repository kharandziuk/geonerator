const _ = require('lodash');
const geolib = require('geolib');

const DEFAULT_DISTANCE_IN_KM = 5

function generate(center, radius = DEFAULT_DISTANCE_IN_KM) {
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
  return _.extend(verticesByName, {vertices, center})
}

module.exports = generate
