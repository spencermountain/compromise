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
    let match = this.splitAfter('@hasComma');
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

  Doc.prototype.places = function(n) {
    let m = this.splitAfter('@hasComma');
    m = m.match('#Place+');

    //grab (n)th result
    if (typeof n === 'number') {
      m = m.get(n);
    }
    return new Places(m.list, this, this.world)
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

var tags = {
  Address: {
    isA: 'Place',
  },
  School: {
    isA: 'Organization',
  },
  Company: {
    isA: 'Organization',
  },
};

//nouns that also signal the title of an unknown organization
//todo remove/normalize plural forms
const orgWords = [
  'academy',
  'administration',
  'agence',
  'agences',
  'agencies',
  'agency',
  'airlines',
  'airways',
  'army',
  'assoc',
  'associates',
  'association',
  'assurance',
  'authority',
  'autorite',
  'aviation',
  'bank',
  'banque',
  'board',
  'boys',
  'brands',
  'brewery',
  'brotherhood',
  'brothers',
  'building society',
  'bureau',
  'cafe',
  'caisse',
  'capital',
  'care',
  'cathedral',
  'center',
  'central bank',
  'centre',
  'chemicals',
  'choir',
  'chronicle',
  'church',
  'circus',
  'clinic',
  'clinique',
  'club',
  'co',
  'coalition',
  'coffee',
  'collective',
  'college',
  'commission',
  'committee',
  'communications',
  'community',
  'company',
  'comprehensive',
  'computers',
  'confederation',
  'conference',
  'conseil',
  'consulting',
  'containers',
  'corporation',
  'corps',
  'corp',
  'council',
  'crew',
  'daily news',
  'data',
  'departement',
  'department',
  'department store',
  'departments',
  'design',
  'development',
  'directorate',
  'division',
  'drilling',
  'education',
  'eglise',
  'electric',
  'electricity',
  'energy',
  'ensemble',
  'enterprise',
  'enterprises',
  'entertainment',
  'estate',
  'etat',
  'evening news',
  'faculty',
  'federation',
  'financial',
  'fm',
  'foundation',
  'fund',
  'gas',
  'gazette',
  'girls',
  'government',
  'group',
  'guild',
  'health authority',
  'herald',
  'holdings',
  'hospital',
  'hotel',
  'hotels',
  'inc',
  'industries',
  'institut',
  'institute',
  'institute of technology',
  'institutes',
  'insurance',
  'international',
  'interstate',
  'investment',
  'investments',
  'investors',
  'journal',
  'laboratory',
  'labs',
  // 'law',
  'liberation army',
  'limited',
  'local authority',
  'local health authority',
  'machines',
  'magazine',
  'management',
  'marine',
  'marketing',
  'markets',
  'media',
  'memorial',
  'mercantile exchange',
  'ministere',
  'ministry',
  'military',
  'mobile',
  'motor',
  'motors',
  'musee',
  'museum',
  // 'network',
  'news',
  'news service',
  'observatory',
  'office',
  'oil',
  'optical',
  'orchestra',
  'organization',
  'partners',
  'partnership',
  // 'party',
  "people's party",
  'petrol',
  'petroleum',
  'pharmacare',
  'pharmaceutical',
  'pharmaceuticals',
  'pizza',
  'plc',
  'police',
  'polytechnic',
  'post',
  'power',
  'press',
  'productions',
  'quartet',
  'radio',
  'regional authority',
  'regional health authority',
  'reserve',
  'resources',
  'restaurant',
  'restaurants',
  'savings',
  'school',
  'securities',
  'service',
  'services',
  'social club',
  'societe',
  'society',
  'sons',
  'standard',
  'state police',
  'state university',
  'stock exchange',
  'subcommittee',
  'syndicat',
  'systems',
  'telecommunications',
  'telegraph',
  'television',
  'times',
  'tribunal',
  'tv',
  'union',
  'university',
  'utilities',
  'workers',
];

var orgWords_1 = orgWords.reduce(function(h, str) {
  h[str] = 'Noun';
  return h
}, {});

//could this word be an organization
const maybeOrg = function(t) {
  //must be a noun
  if (!t.tags.Noun) {
    return false
  }
  //can't be these things
  if (t.tags.Pronoun || t.tags.Comma || t.tags.Possessive) {
    return false
  }
  //must be one of these
  if (t.tags.Organization || t.tags.Acronym || t.tags.Place || t.titleCase()) {
    return true
  }
  return false
};

const tagOrgs = function(doc, termArr) {
  termArr.forEach(terms => {
    for (let i = 0; i < terms.length; i += 1) {
      let t = terms[i];
      if (orgWords_1[t.clean] !== undefined && orgWords_1.hasOwnProperty(t.clean) === true) {
        // look-backward - eg. 'Toronto University'
        let lastTerm = terms[i - 1];
        if (lastTerm !== undefined && maybeOrg(lastTerm) === true) {
          lastTerm.tagSafe('Organization', 'org-word-1', doc.world);
          t.tagSafe('Organization', 'org-word-2', doc.world);
          continue
        }
        //look-forward - eg. University of Toronto
        let nextTerm = terms[i + 1];
        if (nextTerm !== undefined && nextTerm.clean === 'of') {
          if (terms[i + 2] && maybeOrg(terms[i + 2])) {
            t.tagSafe('Organization', 'org-of-word-1', doc.world);
            nextTerm.tagSafe('Organization', 'org-of-word-2', doc.world);
            terms[i + 2].tagSafe('Organization', 'org-of-word-3', doc.world);
            continue
          }
        }
      }
    }
  });

  return doc
};
var isOrg = tagOrgs;

const tagger = function(doc) {
  // addresses
  doc.match('#Value #Noun (st|street|rd|road|crescent|way)').tag('Address');
  // schools
  doc.match('#Noun+ (public|private) school').tag('School');
};
var corrections = tagger;

//some 'deeper' tagging, based on some basic word-knowledge
const inference = function(doc) {
  let termArr = doc.list.map(p => p.terms());
  isOrg(doc, termArr);

  // match-tag statements
  corrections(doc);
  return doc
};
var tagger$1 = inference;

const methods = [people, place, organization];




//add them all in
const addMethods = function(Doc, world) {
  //add new tags
  world.addTags(tags);
  //add tagger
  world.postProcess(tagger$1);
  // add
  methods.forEach(fn => fn(Doc));

  //combine them with .topics() method
  Doc.prototype.entities = function(n) {
    let r = this.splitAfter('@hasComma');
    // Find people, places, and organizations
    let yup = r.people();
    yup = yup.concat(r.places());
    yup = yup.concat(r.organizations());
    let ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father'];
    yup = yup.not(ignore);
    //return them to normal ordering
    yup.sort('sequence');
    // yup.unique() //? not sure
    if (typeof n === 'number') {
      yup = yup.get(n);
    }
    return yup
  };
  //aliases
  Doc.prototype.things = Doc.prototype.entities;
  Doc.prototype.topics = Doc.prototype.entities;
};

var src = addMethods;

export default src;
