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
txt = ` Bridge joins the upper`
txt = `including our military power`
txt = `light bulb contains the seeds`
txt = `barber shop offers pints`
txt = `will help`
txt = ` New shop brings the best `
txt = ` Cardiac patients lose heart`
txt = `Nadiad civic body owes GEB Rs`

txt = `I hit him hard`
txt = `I hit her hard.`
// txt = `The liver receives a dual blood `

let doc = nlp(txt)
// let m = doc.match('(#ProperNoun && .)')
doc.debug()


