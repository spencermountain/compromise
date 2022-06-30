/* eslint-disable no-console, no-unused-vars */
import nlp from './src/two.js'
// import plg from './plugins/speed/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
let doc
// doc = nlp('33 kilos').debug()
// doc = doc.match('33 km').debug()

// doc = nlp('he sweetly sang').debug()
// doc.match('{sweet}').debug()
// console.log(nlp.parseMatch('{sweet/adj}'))


doc = nlp.tokenize('one two three. four five six. seven eight nine.')
doc.compute('tagger')
doc.debug()


// doc = nlp('one two three. four five').cache()
// let m = doc.remove('four')
// console.log(m._cache)

// nlp.lazy('the sweeter the sugar', '{sweet}').debug()
// console.log(doc.numbers().json())




// apostrophe
// let lex = {
//   'queen anne\'s lace': 'Flower'
// }
// let doc = nlp(`Queen Anne's lace`, lex)
// doc.match(`#Flower`).debug()
// console.log(doc.docs[0])