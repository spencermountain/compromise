//a section is a block of text, with an arbitrary number of sentences
//these methods are just wrappers around the ones in sentence.js
var Section = function(sentences) {
  var the = this
  the.sentences = sentences || [];

  the.text = function() {
    return the.sentences.map(function(s) {
      return s.text()
    }).join(' ')
  }

  the.tense = function() {
    return the.sentences.map(function(s) {
      return s.tense()
    })
  }

  //pluck out wanted data from sentences
  the.nouns = function() {
    return the.sentences.map(function(s) {
      return s.nouns()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.entities = function(options) {
    return the.sentences.map(function(s) {
      return s.entities(options)
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.people = function() {
    return the.sentences.map(function(s) {
      return s.people()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.adjectives = function() {
    return the.sentences.map(function(s) {
      return s.adjectives()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.verbs = function() {
    return the.sentences.map(function(s) {
      return s.verbs()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.adverbs = function() {
    return the.sentences.map(function(s) {
      return s.adverbs()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.values = function() {
    return the.sentences.map(function(s) {
      return s.values()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.tags = function() {
    return the.sentences.map(function(s) {
      return s.tags()
    })
  }

  //transform the sentences
  the.negate = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.negate()
    })
    return the
  }
  the.to_past = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.to_past()
    })
    return the
  }
  the.to_present = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.to_present()
    })
    return the
  }
  the.to_future = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.to_future()
    })
    return the
  }

}
module.exports = Section;
