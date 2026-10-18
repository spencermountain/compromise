import select from '../../_select.js'
import find from './find.js'

const addMethod = function (View) {
  View.prototype.places = select(View, find, true)
}
export default addMethod
