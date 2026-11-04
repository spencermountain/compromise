import people from './people/api.js'
import findPlaces from './places.js'
import topics from './topics.js'

const api = function (View) {
  people(View)

  View.prototype.places = function (n) {
    const m = findPlaces(this)
    return m.getNth(n)
  }
  View.prototype.organizations = function (n) {
    const m = this.match('#Organization+')
    return m.getNth(n)
  }
  topics(View)
}
export default { api }
