module.exports = {
  //
  mappedContractions: (document = [], model) => {
    document.forEach(sentence => {
      sentence.forEach(t => {
        if (model.contractionMapping.hasOwnProperty(t.normal) === true) {
          // insert a contraction here
          console.log(model.contractionMapping[t.normal])
        }
      })
    })
  },
  //
  patternContractions: (document, model) => {},
}
