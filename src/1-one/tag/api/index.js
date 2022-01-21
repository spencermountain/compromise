import tag from './tag.js'
console.log(Object.keys(tag))
const tagAPI = function (View) {
  Object.assign(View.prototype, tag)
}
export default tagAPI
