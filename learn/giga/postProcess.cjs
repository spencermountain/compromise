let ids = []
for (let i = 1; i <= 10; i += 1) {
  let str = String(i).padStart(4, '0')
  ids.push(str)
}
// const already = require('../../lib/switches/adj-past.js')

let results = ids.map(id => require(`./result/${id}.json`))
