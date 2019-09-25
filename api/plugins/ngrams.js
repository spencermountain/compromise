module.exports = {
  startGrams: {
    data: {
      desc: 'return an array of subsequences beginning at the start of each sentence or match',
      example:
        "nlp('Who controls the British crown? Who keeps the metric system down?').startGrams().data()\n//[{normal:'who', size:1, count:2}...]",
      returns: 'array',
    },
  },
  endGrams: {
    data: {
      desc: 'return an array of subsequences ending at the end of each sentence or match',
      example:
        "nlp('you think that’s a knife? I’ll show you a knife.').endGrams().data()\n//[{normal:'knife', count:2, size:1}...]",
      returns: 'array',
    },
  },
}
