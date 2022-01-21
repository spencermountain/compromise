/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
import plg from './plugins/dates/src/plugin.js'
nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
// nlp.verbose('tagger')


// console.log(nlp.model().one.tagSet.Month)
let txt = ''

// jan 11
// txt = `SQL code by IBM.`
// txt = `auto mechanics that work for`
// txt = `Good place to be`
// txt = `energy and finance `
// txt = `leaders and delegates abandoned Gandhi`
// txt = `are some of the brands you [can find]`

// txt = `They both had pools`
// txt = `cramped his style`
// txt = `darwin said`
// txt = `victoria learned`
// txt = `He split 2 1980 title fights with Roberto Duran`
// txt = `continue as state chief`
// txt = `there were the walks`
// txt = `Favorite place in Tampa`

txt = `Pursuing a successful career, along with the usual social and financial advantages, will be easier this year`
txt = `all the days since december were awful`
txt = `there were the walks`
txt = `one day after next`

txt = `exercise four to five days per week.`
// txt = `for 8 years now`
// txt = `took 76 years to finish`
// txt = `I've literally spent nearly 4 years or more`
// txt = `strike in three days or face action`
// txt = ` hold it in for ten seconds or so.`
// txt = `At some point, possibly years from the initial`
// txt = `begin a year-long stay `

txt = `a priest walked into the bars`
let doc = nlp(txt)
doc.compute('root')
console.log(doc.match('{walk}').text('root'))
// console.log(doc.json()[0])
// doc.chunks().debug('chunks')
// doc.verbs().subjects().debug()

// let doc = nlp('it was 0 dollars')
// let doc = nlp('$7.003')
// let doc = nlp('eight dollars and five cents')
// let doc = nlp('i paid $5.32 for a pizza slice')
// doc.money().add(1)
// doc.debug(0)

// let doc = nlp('i paid $5.32 for a pizza slice')
// doc.money().add(1)
// console.log(doc.text())