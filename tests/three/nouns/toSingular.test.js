import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/noun-toSingular] '

test('toSingular:', function (t) {
  let arr = [
    // ["Joneses", "Jones"],
    ['children', 'child'],
    ['women', 'woman'],
    ['men', 'man'],
    ['people', 'person'],
    ['geese', 'goose'],
    ['mice', 'mouse'],
    ['barracks', 'barracks'],
    ['deer', 'deer'],
    ['nuclei', 'nucleus'],
    ['syllabi', 'syllabus'],
    ['fungi', 'fungus'],
    ['cacti', 'cactus'],
    ['theses', 'thesis'],
    ['crises', 'crisis'],
    ['phenomena', 'phenomenon'],
    ['embryos', 'embryo'],
    ['frescos', 'fresco'],
    ['ghettos', 'ghetto'],
    ['halos', 'halo'],
    ['mangos', 'mango'],
    ['mementos', 'memento'],
    ['mottos', 'motto'],
    ['tornados', 'tornado'],
    ['tuxedos', 'tuxedo'],
    ['volcanos', 'volcano'],
    ['crises', 'crisis'],
    ['analyses', 'analysis'],
    ['aircraft', 'aircraft'],
    ['bass', 'bass'],
    ['bison', 'bison'],
    ['fish', 'fish'],
    ['fowl', 'fowl'],
    ['kilos', 'kilo'],
    ['kimonos', 'kimono'],
    ['logos', 'logo'],
    ['memos', 'memo'],
    ['ponchos', 'poncho'],
    ['photos', 'photo'],
    ['pimentos', 'pimento'],
    ['pros', 'pro'],
    ['sombreros', 'sombrero'],
    ['tacos', 'taco'],
    ['memos', 'memo'],
    ['torsos', 'torso'],
    ['xylophones', 'xylophone'],
    ['quintuplets', 'quintuplet'],
    ['worrywarts', 'worrywart'],
    ['nerds', 'nerd'],
    ['lollipops', 'lollipop'],
    ['eyebrows', 'eyebrow'],
    // ['mayors of chicago', 'mayor of chicago'],
    //test that sungular.singularize()==singular..
    ['mango', 'mango'],
    ['memento', 'memento'],
    ['motto', 'motto'],
    ['tornado', 'tornado'],
    ['person', 'person'],
    ['goose', 'goose'],
    ['mouse', 'mouse'],
    ['calves', 'calf'],
    ['olives', 'olive'],
    ['loaves', 'loaf'],
    ['oafs', 'oaf'],
    ['wives', 'wife'],
    ['roofs', 'roof'],
    ['hooves', 'hoof'],
    ['buses', 'bus'],
    ['tosses', 'toss'],
    ['wishes', 'wish'],
    ['geniouses', 'genious'],
    ['prognoses', 'prognosis'],
    ['analyses', 'analysis'],
    ['synopses', 'synopsis'],
    ['parentheses', 'parenthesis'],
    ['theses', 'thesis'],
    ['bases', 'base'],

    ['bonuses', 'bonus'],
    ['buses', 'bus'],
    ['campuses', 'campus'],
    ['causes', 'cause'],
    ['clauses', 'clause'],
    ['his excuses', 'his excuse'],
    ['focuses', 'focus'],
    ['houses', 'house'],
    ['spouses', 'spouse'],
    ['surpluses', 'surplus'],
    ['uses', 'use'],
    ['viruses', 'virus'],
    // ['Isley Brothers members', 'Isley Brothers member'],
  ]
  arr.forEach(function (a) {
    let doc = nlp(a[0])
    doc.tag('Noun').compute('chunks')
    let str = doc.nouns().toSingular().text()
    t.equal(str, a[1], here + '[toSingular] ' + a[0])


    doc = nlp(a[1])
    doc.tag('Noun').compute('chunks')
    str = doc.nouns().toPlural().text()
    t.equal(str, a[0], here + '[toPlural] ' + a[0])

    doc = nlp(a[0])
    doc.tag('Noun').compute('chunks')
    str = doc.nouns().toPlural().text()
    t.equal(str, a[0], here + '[stay-plural] ' + a[0])

  })
  t.end()
})
