import m from './methods.js'
const aliases = {
  get: m.eq,
}
export default (function (View) {
  Object.assign(View.prototype, aliases)
})
