import { blue, dim, i } from '../../API/_color.js'
/* eslint-disable no-console */

const debug = function (view) {
  view.docs.forEach(terms => {
    console.log(blue('\n  ┌─────────'))
    terms.forEach(t => {
      let str = `  ${i(dim('│'))}  `
      const txt = t.implicit || t.text || '-'
      if (t.frozen === true) {
        str += `${blue(txt)} ❄️`
      } else {
        str += i(dim(txt))
      }
      console.log(str)
    })
  })
}
export default debug
