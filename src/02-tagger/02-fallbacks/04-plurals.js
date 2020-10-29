//these tags don't have plurals
const noPlurals = ['Uncountable', 'Pronoun', 'Place', 'Value', 'Person', 'Month', 'WeekDay', 'Holiday']
const rules = require('./data/isPlural')
const notPlural = [/ss$/, /sis$/, /[^aeiou][uo]s$/, /'s$/]
const notSingular = [/i$/, /ae$/]

/** turn nouns into singular/plural */
const checkPlural = function (t, world) {
  if (t.tags.Noun && !t.tags.Acronym) {
    let str = t.clean
    //skip existing tags, fast
    if (t.tags.Singular || t.tags.Plural) {
      return
    }
    //too short
    if (str.length <= 3) {
      t.tag('Singular', 'short-singular', world)
      return
    }
    //is it impossible to be plural?
    if (noPlurals.find(tag => t.tags[tag])) {
      return
    }
    // isPlural suffix rules
    if (rules.isPlural.find(reg => reg.test(str))) {
      t.tag('Plural', 'plural-rules', world)
      return
    }
    // isSingular suffix rules
    if (rules.isSingular.find(reg => reg.test(str))) {
      t.tag('Singular', 'singular-rules', world)
      return
    }

    // finally, fallback 'looks plural' rules..
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
