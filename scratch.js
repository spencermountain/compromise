/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
// nlp.verbose('tagger')


// console.log(nlp.model().one.tagSet.Month)
nlp.addTags({
  Foo: {
    is: 'FirstName'
  }
})
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


let doc = nlp('this june').debug()



// let doc = nlp('john is nice').sentences()
// doc.toFutureTense()
// doc.debug()