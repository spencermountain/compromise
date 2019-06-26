const methods = [require('./people'), require('./place'), require('./organization')]

//add them all in
const addMethods = function(Doc) {
  methods.forEach(fn => Doc.extend(fn))
}

module.exports = addMethods
