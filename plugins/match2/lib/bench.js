const Benchmark = require("benchmark")

const nlp = require("compromise")
const { default: compromise_match2 } = require("../dist/compromise-match2.js")

nlp.extend(compromise_match2)

const suite = new Benchmark.Suite()

let text =
  "Improved own provided blessing may peculiar domestic. Sight house has sex never. No visited raising gravity outward subject my cottage mr be. Hold do at tore in park feet near my case. Invitation at understood occasional sentiments insipidity inhabiting in. Off melancholy alteration principles old. Is do speedily kindness properly oh. Respect article painted cottage he is offices parlors."
text = text.replace(".", "")
const tofind = "sentiments insipidity inhabiting"
const regex = nlp.compileRegex(tofind)

suite
  .add("nlp match", () => {
    nlp(text).match(tofind)
  })
  .add("match2", () => {
    nlp(text).match2(tofind)
  })
  .add("compiled match2", () => {
    nlp(text).match2(regex)
  })
  .on("cycle", function (event) {
    console.log(String(event.target))
  })
  .on("complete", function (event) {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  .run()
