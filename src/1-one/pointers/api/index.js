import sets from './sets.js'

const addAPI = function (View) {
  // add set/intersection/union
  Object.assign(View.prototype, sets)
}
export default addAPI
