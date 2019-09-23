const findMethods = require('./find')
const simpleMethods = require('./simple')

module.exports = Object.assign({}, findMethods, simpleMethods)
