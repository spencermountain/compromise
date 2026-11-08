/* eslint-disable no-console */
import * as cli from '../../../../API/_color.js'

const tagString = function (tags, model) {
  if (model.one.tagSet) {
    tags = tags.map(tag => {
      if (!Object.hasOwn(model.one.tagSet, tag)) {
        return tag
      }
      const c = model.one.tagSet[tag].color || 'blue'
      return cli[c](tag)
    })
  }
  return tags.join(', ')
}

// browser consoles get a collapsible table per sentence
const showClient = function (view) {
  console.log('%c -=-=- ', 'background-color:#6699cc;')
  view.forEach(m => {
    console.groupCollapsed(m.text())
    const out = m.docs[0].map(t => {
      const text = t.implicit ? '[' + t.implicit + ']' : t.text || '-'
      return { text, tags: '[' + Array.from(t.tags).join(', ') + ']' }
    })
    console.table(out, ['text', 'tags'])
    console.groupEnd()
  })
}

const showTags = function (view) {
  if (typeof window !== 'undefined' && window.document) {
    showClient(view)
    return
  }
  const { docs, model } = view
  if (docs.length === 0) {
    console.log(cli.blue('\n     ──────'))
  }
  docs.forEach(terms => {
    console.log(cli.blue('\n  ╭─────────'))
    terms.forEach(t => {
      const tags = [...(t.tags || [])]
      let text = t.text || '-'
      if (t.sense) {
        text = `{${t.normal}/${t.sense}}`
      }
      if (t.implicit) {
        text = '[' + t.implicit + ']'
      }
      text = cli.yellow(text)
      let word = "'" + text + "'"
      if (t.frozen === true) {
        word += ' ❄️'
      }
      if (t.reference) {
        const str = view.update([t.reference]).text('normal')
        word += ` - ${cli.dim(cli.i('[' + str + ']'))}`
      }
      word = word.padEnd(18)
      const str = cli.blue('  │ ') + cli.i(word) + '  - ' + tagString(tags, model)
      console.log(str)
    })
  })
  console.log('\n')
}
export default showTags
