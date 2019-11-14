const methods = [require('./people'), require('./place'), require('./organization')]

const tags = require('./tags')
const tagger = require('./tagger')

//add them all in
const addMethods = function(Doc, world) {
  //add new tags
  world.addTags(tags)
  //add tagger
  world.postProcess(tagger)
  // add
  methods.forEach(fn => fn(Doc))

  //combine them with .topics() method
  Doc.prototype.entities = function(n) {
    let r = this.splitAfter('@hasComma')
    // Find people, places, and organizations
    let yup = r.people()
    yup = yup.concat(r.places())
    yup = yup.concat(r.organizations())
    let ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father']
    yup = yup.not(ignore)
    //return them to normal ordering
    yup.sort('sequence')
    // yup.unique() //? not sure
    if (typeof n === 'number') {
      yup = yup.get(n)
    }
    return yup
  }
  //aliases
  Doc.prototype.things = Doc.prototype.entities
  Doc.prototype.topics = Doc.prototype.entities
}

module.exports = addMethods
