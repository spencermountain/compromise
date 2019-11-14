const addMethod = function(Doc) {
  /**  */
  class People extends Doc {
    // honorifics(){}
    // firstNames(){}
    // lastNames(){}
    // pronouns(){}
    // toPronoun(){}
    // fromPronoun(){}
  }

  Doc.prototype.people = function(n) {
    let match = this.splitAfter('@hasComma')
    match = match.match('#Person+')

    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new People(match.list, this, this.world)
  }
  return Doc
}
var people = addMethod

const addMethod$1 = function(Doc) {
  /**  */
  class Places extends Doc {
    // regions(){}
  }

  Doc.prototype.places = function(n) {
    let m = this.splitAfter('@hasComma')
    m = m.match('#Place+')

    //grab (n)th result
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Places(m.list, this, this.world)
  }
  return Doc
}
var place = addMethod$1

const addMethod$2 = function(Doc) {
  /**  */
  class Organizations extends Doc {
    // normalize(){}
  }

  Doc.prototype.organizations = function(n) {
    let match = this.clauses()
    match = match.match('#Organization+')

    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Organizations(match.list, this, this.world)
  }
  return Doc
}
var organization = addMethod$2

const methods = [people, place, organization]

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

var src = addMethods

export default src
