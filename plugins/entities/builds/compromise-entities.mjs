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
    let match = this.clauses();
    match = match.match('#Person+');

    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n);
    }
    return new People(match.list, this, this.world)
  };
  return Doc
};
var people = addMethod;

const addMethod$1 = function(Doc) {
  /**  */
  class Places extends Doc {
    // regions(){}
  }

  Doc.prototype.organizations = function(n) {
    let match = this.clauses();
    match = match.match('#Place+');

    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n);
    }
    return new Places(match.list, this, this.world)
  };
  return Doc
};
var place = addMethod$1;

const addMethod$2 = function(Doc) {
  /**  */
  class Organizations extends Doc {
    // normalize(){}
  }

  Doc.prototype.organizations = function(n) {
    let match = this.clauses();
    match = match.match('#Organization+');

    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n);
    }
    return new Organizations(match.list, this, this.world)
  };
  return Doc
};
var organization = addMethod$2;

const methods = [people, place, organization];

//add them all in
const addMethods = function(Doc) {
  methods.forEach(fn => fn(Doc));

  //combine them with .topics() method
  Doc.prototype.things = function(n) {
    let r = this.clauses();
    // Find people, places, and organizations
    let yup = r.people();
    yup.concat(r.places());
    yup.concat(r.organizations());
    let ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father'];
    yup = yup.not(ignore);
    //return them to normal ordering
    yup.sort('chronological');
    // yup.unique() //? not sure
    if (typeof n === 'number') {
      yup = yup.get(n);
    }
    return yup
  };
  //aliases
  Doc.prototype.entities = Doc.prototype.things;
  Doc.prototype.topics = Doc.prototype.things;
};

var src = addMethods;

export default src;
