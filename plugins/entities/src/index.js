const methods = [require('./people'), require('./place'), require('./organization')]

//add them all in
const addMethods = function(Doc, world) {
  //
  world.addTags({
    Address: {
      isA: 'Place',
    },
    School: {
      isA: 'Organization',
    },
    Company: {
      isA: 'Organization',
    },
  })
  //
  world.postProcess(doc => {
    // addresses
    doc.match('#Value #Noun (st|street|rd|road|crescent|way)').tag('Address')
    // schools
    doc.match('#Noun+ (public|private) school').tag('School')
  })

  methods.forEach(fn => fn(Doc))

  //combine them with .topics() method
  Doc.prototype.entities = function(n) {
    let r = this.clauses()
    // Find people, places, and organizations
    let yup = r.people()
    yup = yup.concat(r.places())
    yup = yup.concat(r.organizations())
    let ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father']
    yup = yup.not(ignore)
    //return them to normal ordering
    yup.sort('chronological')
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
