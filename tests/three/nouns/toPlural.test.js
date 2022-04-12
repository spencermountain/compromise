import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/noun-toPlural] '

test('toPlural:', function (t) {
  let arr = [
    ['snake', 'snakes'],
    ['ski', 'skis'],
    // ["Barrymore", "Barrymores"],
    ['witch', 'witches'],
    ['box', 'boxes'],
    ['gas', 'gases'],
    ['kiss', 'kisses'],
    ['index', 'indices'],
    ['appendix', 'appendices'],
    ['criterion', 'criteria'],
    ['berry', 'berries'],
    ['activity', 'activities'],
    ['daisy', 'daisies'],
    ['church', 'churches'],
    ['fox', 'foxes'],
    ['stomach', 'stomachs'],
    ['epoch', 'epochs'],
    ['knife', 'knives'],
    ['half', 'halves'],
    ['scarf', 'scarves'],
    ['chief', 'chiefs'],
    ['spoof', 'spoofs'],
    ['cafe', 'cafes'],
    ['gulf', 'gulfs'],
    ['alternative', 'alternatives'],
    ['solo', 'solos'],
    // ['zero', 'zeros'],
    ['avocado', 'avocados'],
    ['studio', 'studios'],
    ['zoo', 'zoos'],
    ['embryo', 'embryos'],
    ['hero', 'heroes'],
    ['banjo', 'banjos'],
    ['cargo', 'cargos'],
    ['flamingo', 'flamingos'],
    ['fresco', 'frescos'],
    ['ghetto', 'ghettos'],
    ['halo', 'halos'],
    ['mango', 'mangos'],
    ['memento', 'mementos'],
    ['motto', 'mottos'],
    ['tornado', 'tornados'],
    ['tuxedo', 'tuxedos'],
    ['volcano', 'volcanos'],
    ['bus', 'buses'],
    ['crisis', 'crises'],
    ['analysis', 'analyses'],
    ['neurosis', 'neuroses'],
    ['aircraft', 'aircraft'],
    ['halibut', 'halibut'],
    ['moose', 'moose'],
    ['salmon', 'salmon'],
    ['sheep', 'sheep'],
    ['spacecraft', 'spacecraft'],
    ['tuna', 'tuna'],
    ['trout', 'trout'],
    ['armadillo', 'armadillos'],
    ['auto', 'autos'],
    ['bravo', 'bravos'],
    ['bronco', 'broncos'],
    ['casino', 'casinos'],
    ['combo', 'combos'],
    ['gazebo', 'gazebos'],
    //test that plural.pluralize()==plural..
    ['snake', 'snakes'],
    ['ski', 'skis'],
    // ['mayor of chicago', 'mayors of chicago'],
    ['witch', 'witches'],
    ['box', 'boxes'],
    ['gas', 'gases'],
    ['spoof', 'spoofs'],
    ['solo', 'solos'],
    ['avocado', 'avocados'],
    ['studio', 'studios'],
    ['zoo', 'zoos'],
    ['characteristic', 'characteristics'],
    ['skeptic', 'skeptics'],
    ['fabric', 'fabrics'],
    ['menu', 'menus'],
    ['tactic', 'tactics'],
    ['cause', 'causes'],
    ['bowl', 'bowls'],
    ['purpose', 'purposes'],
    ['dose', 'doses'],
    ['the size', 'the sizes'],
    ['the prize', 'the prizes'],
    ['the promise', 'the promises'],
    ['noise', 'noises'],
    ['the raise', 'the raises'],
    ['the exercise', 'the exercises'],
    ['the bruise', 'the bruises'],
    // ['swim', 'swims'],
  ]
  arr.forEach(function (a) {
    let doc = nlp(a[0])
    doc.tag('Noun').compute('chunks')
    let str = doc.nouns().toPlural().text()
    t.equal(str, a[1], here + '[toPlural] ' + a[0])

    doc = nlp(a[1])
    doc.tag('Noun').compute('chunks')
    str = doc.nouns().toSingular().text()
    t.equal(str, a[0], here + '[toSingular] ' + a[0])

    doc = nlp(a[0])
    doc.tag('Noun').compute('chunks')
    str = doc.nouns().toSingular().text()
    t.equal(str, a[0], here + '[stay-singular] ' + a[0])

  })
  t.end()
})

test('toPlural - longer:', function (t) {
  let arr = [
    [`we commended him for his hamburger`, `we commended him for his hamburgers`],
    [`everything i say, he liked`, `everything i say, he liked`],
    [`the tornado in Barrie swept through downtown`, `the tornados in Barrie swept through downtown`],
    [`no cookie until after dinner`, `no cookies until after dinners`],
    [`my finger looked green afterwards`, `my fingers looked green afterwards`],
    // [`my finger was green afterwards`, `my fingers were green afterwards`],
  ]
  arr.forEach(function (a) {
    let doc = nlp(a[0])
    doc.compute('chunks')
    doc.nouns().toPlural()
    t.equal(doc.text(), a[1], here + '[toPlural] ' + a[0])
  })
  t.end()
})
