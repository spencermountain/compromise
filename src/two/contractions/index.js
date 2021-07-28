import _methods from './methods.js'
import _model from './model/index.js'
import contract from './api/contract.js'
import Contractions from './api/Contractions.js'

// const simpleContractions = function (document, world) {
//   const { methods, model } = world
//   // this.compute('contractions')
//   methods.contractions.expand(document, model, methods)
//   return document
// }

const plugin = function (world, View) {
  const { methods, model } = world
  methods.contractions = _methods
  Object.assign(model, _model)
  parsers.push('contractions')
  methods.compute.contractions = _methods.expand

  // add fn to View
  View.prototype.contractions = function () {
    let m = this.match('@hasContraction{2,}')
    return new Contractions(this.document, m.pointer)
  }
  View.prototype.contract = contract
}

export default plugin
