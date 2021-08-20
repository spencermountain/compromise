/* eslint-disable no-console */
import cli from './_color.js'

const tagString = function (tags, model) {
  if (model.two.tagSet) {
    tags = tags.map(tag => {
      if (!model.two.tagSet.hasOwnProperty(tag)) {
        return tag
      }
      const c = model.two.tagSet[tag].color || 'blue'
      return cli[c](tag)
    })
  }
  return tags.join(', ')
}

const showTags = function (view) {
  let { docs, model } = view
  console.log(cli.blue('====='))
  docs.forEach(terms => {
    console.log(cli.blue('  -----'))
    terms.forEach(t => {
      let tags = [...(t.tags || [])]
      let text = t.text || '-'
      if (t.implicit) {
        text = '[' + t.implicit + ']'
      }
      if (typeof module !== undefined) {
        text = cli.yellow(text)
      }
      let word = "'" + text + "'"
      word = word.padEnd(18)
      let str = cli.blue('  ｜ ') + word + '  - ' + tagString(tags, model)
      console.log(str)
    })
  })
}
export default showTags
