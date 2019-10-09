const htm = require('htm')
const vhtml = require('vhtml')

const toHtml = function(doc, options) {
  let h = htm.bind(vhtml)
  if (options.bind) {
    h = htm.bind(options.bind)
  }
  let html = []
  doc.list.forEach(p => {
    let text = ''
    p.terms().forEach(t => {
      text += t.pre + t.text + t.post
    })
    html.push(h`<span>${text}</span>`)
  })
  return h`<div>${html}</div>`
}
module.exports = toHtml
