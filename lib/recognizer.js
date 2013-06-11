var recognizer = (function() {

  //takes a pos tagged object and grabs the nouns for named-entity spotting
  var recognizer = function(tags, options) {

    if (!options) {
      options = {};
    }
    if (options.verbose) {
      options.gerund = true;
      options.stick_adjectives = true;
      options.stick_prepositions = true;
      options.stick_the = true;
      options.subnouns = true;
      options.match_whole = true;
    }

    //collect noun chunks
    var nouns = _.filter(tags, function(tag) {
      return tag.pos.parent == "noun";
    });

    // optionally treat 'ing' verbs as nouns
    if (options.gerund) {
      for (var i in tags) {
        if (tags[i].pos.tag == "VBG") {
          //    nouns.push({word:tags[i].word, pos:parts_of_speech["NN"], rule:"gerund"});
        }
      }
    }

    //'obama health care' break noun-phrase into chunks
    if (options.subnouns) {
      for (var i in nouns) {
        if (nouns[i].word.match(' ')) {
          var ngrams = ngram(nouns[i].word.replace(/^(the|an?|dr\.|mrs?\.|sir) /i, '').split(' '), 1, 4);
          for (var n in ngrams) {
            nouns.push({
              word: ngrams[n],
              pos: parts_of_speech["NN"],
              rule: "subnoun"
            });
          }
        }
      }
    }

    // optionally treat 'the' as part of a noun
    if (options.stick_the) {
      for (var i in tags) {
        i = parseInt(i);
        if (tags[i].word == "the" && tags[i + 1] && tags[i + 1].pos.parent == "noun" && isplural(tags[i + 1].word)) {
          nouns.push({
            word: tags[i].word + ' ' + tags[i + 1].word,
            pos: parts_of_speech["NN"],
            rule: "sticky_the"
          });
        }
      }
    }

    //add sticky adjectives to results - black swan
    if (options.stick_adjectives) {
      //adjective - noun
      for (var i in tags) {
        i = parseInt(i);
        if (!tags[i].word) {
          continue;
        }
        if (tags[i + 1] && tags[i].pos.parent == "adjective" && tags[i + 1].pos.parent == "noun") {
          var word = tags[i].word + ' ' + tags[i + 1].word;
          nouns.push({
            word: word,
            pos: parts_of_speech["NN"],
            rule: "sticky_adj"
          });
        }
      }
      //noun - adjective
      for (var i in tags) {
        i = parseInt(i);
        if (!tags[i].word) {
          continue;
        }
        if (tags[i + 1] && tags[i].pos.parent == "noun" && tags[i + 1].pos.parent == "adjective") {
          var word = tags[i].word + ' ' + tags[i + 1].word;
          nouns.push({
            word: word,
            pos: parts_of_speech["NN"],
            rule: "sticky_after_adj"
          });
        }
      }
    }

    //add [noun phrase] and [noun phrase] - marks and spencers
    if (options.stick_prepositions) {
      var words = _.pluck(tags, "word")
      for (var i in tags) {
        i = parseInt(i);
        if (!tags[i].word) {
          continue;
        }
        if (tags[i - 1] && tags[i + 1] && (tags[i].pos.tag == "CC" || tags[i].pos.tag == "IN")) { //&& tags[i-1].pos.parent=="noun"
          for (var o = i; o < tags.length; o++) {
            if (tags[o].pos.parent == "verb" || tags[o].word.match(/\W/)) {
              break
            }
            if (tags[o].pos.parent == "noun") {
              var word = words.slice(i - 1, parseInt(o) + 1).join(" ");
              nouns.push({
                word: word,
                pos: parts_of_speech["NN"],
                rule: "group_prep"
              });
            }
          }
        }
      }
    }

    //search the whole string
    if (options.match_whole) {
      var text = _.pluck(tags, 'word').join(' ');
      nouns.push({
        word: text,
        pos: parts_of_speech["NN"],
        rule: "whole"
      });
    }

    //remove number tokes
    if (options.kill_numbers) {
      nouns = _.filter(nouns, function(noun) {
        return !noun.word.match(/([0-9]| \- )/)
      })
    }

    return nouns;
  }

    function isplural(word) {
      if (word.match(/.{3}(s|ice|eece)$/)) {
        return true;
      } //hack but its ok
      return false;
    }


    //list all inline combinations for array element joins

    function ngram(arr, minwords, maxwords) {
      var keys = [, ];
      var results = [];
      maxwords++; //for human logic, we start counting at 1 instead of 0
      for (var i = 1; i <= maxwords; i++) {
        keys.push({});
      }
      for (var i = 0, arrlen = arr.length, s; i < arrlen; i++) {
        s = arr[i];
        keys[1][s] = (keys[1][s] || 0) + 1;
        for (var j = 2; j <= maxwords; j++) {
          if (i + j <= arrlen) {
            s += " " + arr[i + j - 1];
            keys[j][s] = (keys[j][s] || 0) + 1;
          } else break;
        }
      }
      //collect results
      for (var k = 0; k < maxwords; k++) {
        var key = keys[k];
        for (var i in key) {
          if (key[i] >= minwords) results.push(i);
        }
      }
      return results
    }


    // export for AMD / RequireJS
  if (typeof define !== 'undefined' && define.amd) {
    define([], function() {
      return recognizer;
    });
  }
  // export for Node.js
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = recognizer;
  }

  return recognizer;


})()