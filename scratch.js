/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
nlp.verbose('tagger')

let txt = ''
txt = `New barber shop offers pints`
txt = `patients lose heart `
txt = `civic body owes GEB`
txt = `The liver receives a dual blood supply`
txt = `The Mackinac Bridge joins the upper & lower`
txt = `In Iraq and Syria, American leadership -- including our military power -- is stopping ISIL's advance.`
txt = `None: The light bulb contains.`

// jan 11
// txt = `In Iraq and Syria, American leadership -- including our military power -- is stopping ISIL's advance.`
// txt = `The Bridge joins the upper `
// txt = `this U.S. state`
// txt = `Cardiac patients lose heart as Aspirin disappears`
txt = `is available by phone.`
txt = `With the price caps gone, the general`
txt = `the newly written SQL code by IBM.`
txt = `Imagine the tension melting away`
txt = `Visit message boards`
txt = ` almost out of thin air.`
txt = `the cheapest surgeon to perform an operation.`
// txt = `Both are equal light`
// txt = ` the Christmas holidays.`
// txt = `it completely lacked flavor.`
// txt = `auto mechanics that work for`
// txt = `he uploaded`
// txt = `he bloated`
txt = `process`
let doc = nlp(txt)
// let m = doc.match('(#ProperNoun && .)')
doc.debug()


