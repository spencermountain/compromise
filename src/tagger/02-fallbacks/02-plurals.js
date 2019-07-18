const rules = require('./data/plural-rules')
//these tags don't have plurals
const noPlurals = ['Uncountable', 'Pronoun', 'Place', 'Value', 'Person', 'Month', 'WeekDay', 'RelativeDay', 'Holiday']

const notPlural = [/ss$/, /sis$/]

const knownPlurals = {
  we: true,
  they: true,
  i: false,
  he: false,
  she: false,
}

/** turn nouns into singular/plural */
const checkPlural = function(t, world) {
  if (t.tags.Noun) {
    //skip existing tags, fast
    if (t.tags.Singular || t.tags.Plural) {
      return
    }
    if (knownPlurals[t.normal] === true) {
      t.tag('Plural', 'known-plurals', world)
      return
    }
    if (knownPlurals[t.normal] === false) {
      t.tag('Singular', 'known-plurals', world)
      return
    }
    //is it potentially plural?
    if (noPlurals.find(tag => t.tags[tag])) {
      return
    }

    let str = t.normal
    // finally, fallback 'looks check plural' rules..
    if (/s$/.test(str) === true && str.length > 3) {
      //make sure it's not 'virus', or 'sepsis'
      if (notPlural.find(reg => reg.test(str))) {
        t.tag('Singular', 'not-plural', world)
        return
      }

      t.tag('Plural', 'plural-fallback', world)
    }
  }
}
module.exports = checkPlural
