//these tags don't have plurals
const noPlurals = ['Uncountable', 'Pronoun', 'Place', 'Value', 'Person', 'Month', 'WeekDay', 'RelativeDay', 'Holiday']

const notPlural = [/ss$/, /sis$/, /[uo]s$/]
const notSingular = [/i$/, /ae$/, /men$/, /tia$/]

/** turn nouns into singular/plural */
const checkPlural = function(t, world) {
  if (t.tags.Noun) {
    let str = t.normal
    //skip existing tags, fast
    if (t.tags.Singular || t.tags.Plural) {
      return
    }
    //too short
    if (str.length <= 2) {
      return
    }
    //is it impossible to be plural?
    if (noPlurals.find(tag => t.tags[tag])) {
      return
    }
    // finally, fallback 'looks check plural' rules..
    if (/s$/.test(str) === true) {
      //avoid anything too sketchy to be plural
      if (notPlural.find(reg => reg.test(str))) {
        return
      }
      t.tag('Plural', 'plural-fallback', world)
      return
    }
    //avoid anything too sketchy to be singular
    if (notSingular.find(reg => reg.test(str))) {
      return
    }
    t.tag('Singular', 'singular-fallback', world)
  }
}
module.exports = checkPlural
