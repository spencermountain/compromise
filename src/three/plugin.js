import dates from './dates/index.js'
import numbers from './numbers/index.js'
import people from './people/index.js'
import places from './places/index.js'
import verbs from './verbs/index.js'

const plugin = function (world) {
  dates(world)
  numbers(world)
  people(world)
  places(world)
  verbs(world)
}
export default plugin
