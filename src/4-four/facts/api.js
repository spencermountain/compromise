import getFacts from './parse/index.js'

/*
Instruction

Statement
Statement/Action - she walked home, i could have seen
Statement/Definition - Tootsie is a movie
Statement/Description - he is tall

Question
Question/Time
Question/Amount
Question/YesNo - did she sleep with him?, are crabs edible?


*/

const green = str => '\x1b[32m' + str + '\x1b[0m'
const blue = str => '\x1b[34m' + str + '\x1b[0m'
const cyan = str => '\x1b[36m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'


const api = function (View) {

  class Facts {
    constructor(facts, doc) {
      // this.facts = facts || []
      this.doc = doc
      this.viewType = 'Facts'
      Object.defineProperty(this, 'facts', {
        value: facts,
        writable: true,
      })
    }
    // chunk-friendly debug
    debug() {
      let lastSentence = null
      this.facts.forEach(fact => {
        let subj = ''
        let verb = ''
        let obj = ''
        let mod = ''
        let txt = this.doc.update([fact.ptr]).text()
        if (fact.subj) {
          subj = fact.subj.root
        }
        if (fact.verb) {
          verb = fact.verb.root
        }
        if (fact.obj) {
          obj = fact.obj.root
          if (fact.obj.mod) {
            Object.keys(fact.obj.mod).forEach(k => {
              mod += `[${k}] ${fact.obj.mod[k].root}`
            })
          }
        }
        if (txt !== lastSentence) {
          console.log(`\n'${dim(txt)}'`)
          lastSentence = txt
        }
        //eslint-disable-next-line
        console.log(`${blue(subj.padEnd(10))} | ${green(verb.padEnd(10))}  | ${cyan(obj.padEnd(10))}`)
        if (mod) {
          console.log(''.padEnd(15) + `+${dim(mod)}`)
        }
      })
      return this
    }

  }
  /** */
  View.prototype.facts = function () {
    let facts = []
    this.sentences().forEach(s => {
      facts = facts.concat(getFacts(s))
    })
    return new Facts(facts, this)
  }
}
export default api
