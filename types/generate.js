const docs = require('./doc.json')
docs.docs.forEach(doc => {
  console.log('* **' + doc.name + '**  -  ' + doc.description)
})
