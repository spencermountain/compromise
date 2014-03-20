var chunker = (function() {

  //merge word-tokens based on their grammar. forms a more maturely tokenized pos tag object.
  var chunker = function(data, options) {
    //some grammatical chunking..
    for (var i in data) {
      i = parseInt(i);
      //add an implicit preposition to possessive nouns
      if (data[i].pos.tag == "NNO") {
        data = build(data.slice(0, i + 1), {
          word: "",
          pos: parts_of_speech["IN"]
        }, data.slice(i + 1, data.length));
      }
      //sticky prepositions on gerunds  - waking up in..
      if (data[i].pos.tag == "VBG" && data[i + 2]) {
        if (data[i + 1].pos.tag == "IN" && data[i + 2].pos.parent == "glue") {
          data[i].word += ' ' + data[i + 1].word;
          data[i + 1].word = null;
          continue
        }
      }
      //sticky prepositions on gerunds at end of phrase
      if (data[i].pos.tag == "VBG") {
        if (data[i + 1] && data[i + 2] == null && data[i + 1].pos.tag == "IN") {
          data[i].word += ' ' + data[i + 1].word;
          data[i + 1].word = null;
        }
      }
    }

    //make gerunds into a 'noun-gerund'
    if (options.gerund) {
      for (var i in data) {
        if (data[i].pos.tag == "VBG") {
          data[i].pos = parts_of_speech["NG"];
        }
      }
    }

    //chunk same consecutive parents
    var chunked = [data[0]];
    for (var i = 1; i <= data.length - 1; i++) {
      if (chunked[chunked.length - 1].pos.parent == data[i].pos.parent) {
        if (chunked[chunked.length - 1].word && !chunked[chunked.length - 1].word.match(/(,|")/)) { //dont chunk nouns with comma
          chunked[chunked.length - 1].word += ' ' + data[i].word;
          continue;
        }
      }
      //implicit else
      chunked.push(data[i]);
    }

    return chunked;
  }


  //make a json

    function build(before, obj, after) {
      var all = before;
      all.push(obj);
      for (var i in after) {
        all.push(after[i])
      }
      return all;
    }


    // export for AMD / RequireJS
  if (typeof define !== 'undefined' && define.amd) {
    define([], function() {
      return chunker;
    });
  }
  // export for Node.js
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = chunker;
  }

  return chunker;


})()