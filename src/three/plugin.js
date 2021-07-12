import dates from './dates/index.js'
import numbers from './numbers/index.js'
import people from './people/index.js'
import places from './places/index.js'
import verbs from './verbs/index.js'
import contractions from './contractions/index.js'

const plugin = function (world, View) {
  contractions(world, View)
  dates(world, View)
  numbers(world, View)
  people(world, View)
  places(world, View)
  verbs(world, View)
}
export default plugin
