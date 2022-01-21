import sets from './sets.js'
console.log(Object.keys(sets))
const addAPI = function (View) {
  // add set/intersection/union
  Object.assign(View.prototype, sets)
}
export default addAPI
