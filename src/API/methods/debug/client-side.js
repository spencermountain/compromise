// some nice colors for client-side debug
const css = {
  green: '#7f9c6c',
  red: '#914045',
  blue: '#6699cc',
  magenta: '#6D5685',
  cyan: '#2D85A8',
  yellow: '#e6d7b3',
  black: '#303b50',
}
const logClientSide = function (view) {
  let tagset = view.world.tags
  view.forEach(terms => {
    terms.forEach(t => {
      let tags = Array.from(t.tags)
      let text = t.text || '-'
      if (t.implicit) {
        text = '[' + t.implicit + ']'
      }
      let word = "'" + text + "'"
      word = word.padEnd(8)
      let found = tags.find(tag => tagset[tag] && tagset[tag].color)
      let color = 'steelblue'
      if (tagset[found]) {
        color = tagset[found].color
        color = css[color]
      }
      console.log(`   ${word}  -  %c${tags.join(', ')}`, `color: ${color || 'steelblue'};`) // eslint-disable-line
    })
  })
}
export default logClientSide
