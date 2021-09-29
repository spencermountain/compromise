import sets from './sets.js'
const addAPI = function (View) {
  Object.assign(View.prototype, sets)
}
export default addAPI
