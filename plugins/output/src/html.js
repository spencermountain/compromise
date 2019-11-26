const htm = require('htm')
const vhtml = require('vhtml')

const toHtml = function(doc, segments, options) {
  let h = htm.bind(vhtml)
  if (options.bind) {
    h = htm.bind(options.bind)
  }
  let html = []
  let arr = doc.segment(segments)
  arr.forEach(o => {
    let str = h`<span class=${o.segment}>${o.text}</span>`
    html.push(str)
  })
  return h`<pre>${html}</pre>`
}
module.exports = toHtml
