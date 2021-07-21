import contract from './contract.js'
import Contractions from './Contractions.js'

const plugin = function (world, View) {
  View.prototype.contractions = function () {
    let m = this.match('@hasContraction{2,}')
    return new Contractions(this.document, m.pointer)
  }
  View.prototype.contract = contract
}

export default plugin
