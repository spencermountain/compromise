var nlp = require('./src/index')

// nlp.extend(Doc => {
//   class House extends Doc {
//     door() {
//       console.log('hi')
//       return this
//     }
//   }

//   Doc.prototype.houses = function() {
//     return new House(this.list, this, this.world)
//   }
// })

let doc = nlp(`spencer is/was going crazy. He walks quickly.`)
let doc2 = nlp(`oh yeah, baby. yeee haw.`)

// doc.concat('hell yeah').debug()
doc.concat(doc2.list[0]).debug()
