/* compromise-export 0.0.3 MIT */
var reduceWords = function reduceWords(allWords) {
  var topWords = Object.keys(allWords).filter(function (str) {
    return allWords[str] >= 2;
  });
  topWords = topWords.sort(function (a, b) {
    if (allWords[a] > allWords[b]) {
      return -1;
    } else if (allWords[a] < allWords[b]) {
      return 1;
    }

    return 0;
  });
  var order = topWords.reduce(function (h, str, i) {
    h[str] = i;
    return h;
  }, {});
  return order;
};

var _reduceWords = reduceWords;

// remove implied tags, like 'Noun' when we have 'Plural'
var reduceTags = function reduceTags(tags, world) {
  var tagset = world.tags;
  var implied = [];
  tags.forEach(function (tag) {
    if (tagset[tag] && tagset[tag].isA) {
      implied = implied.concat(tagset[tag].isA);
    }
  });
  implied = implied.reduce(function (h, tag) {
    h[tag] = true;
    return h;
  }, {});
  tags = tags.filter(function (tag) {
    return !implied[tag];
  }); // tags

  return tags;
};

var _reduceTags = reduceTags;

// compress a list of things by frequency
var topk = function topk(list) {
  var counts = {};
  list.forEach(function (a) {
    counts[a] = counts[a] || 0;
    counts[a] += 1;
  });
  var arr = Object.keys(counts);
  arr = arr.sort(function (a, b) {
    if (counts[a] > counts[b]) {
      return -1;
    } else {
      return 1;
    }
  }); // arr = arr.filter(a => counts[a] > 1)

  return arr.map(function (a) {
    return [a, counts[a]];
  });
};

var _topk = topk;

/** store a parsed document for later use */

var exportFn = function exportFn() {
  var _this = this;

  var phraseList = this.json({
    text: false,
    trim: false,
    terms: {
      tags: true,
      whitespace: true
    }
  });
  var allTags = [];
  var allWords = {};
  phraseList = phraseList.map(function (p) {
    return p.terms.map(function (t) {
      allWords[t.text] = allWords[t.text] || 0;
      allWords[t.text] += 1;
      allWords[t.pre] = allWords[t.pre] || 0;
      allWords[t.pre] += 1;
      allWords[t.post] = allWords[t.post] || 0;
      allWords[t.post] += 1; //remove any implied tags, first

      t.tags = _reduceTags(t.tags, _this.world);
      allTags = allTags.concat(t.tags);
      return [t.pre, t.text, t.post, t.tags];
    });
  }); // compress the top tags

  allTags = _topk(allTags);
  var tagMap = {};
  allTags.forEach(function (a, i) {
    tagMap[a[0]] = i;
  }); //compress the top words

  var wordMap = _reduceWords(allWords);
  phraseList.forEach(function (arr) {
    arr.forEach(function (a) {
      // use index numbers instead of redundant tag-names
      a[3] = a[3].map(function (tag) {
        return tagMap[tag];
      }).join(','); // use index numbers instead of re-used words

      a[0] = wordMap[a[0]] !== undefined ? wordMap[a[0]] : a[0];
      a[1] = wordMap[a[1]] !== undefined ? wordMap[a[1]] : a[1];
      a[2] = wordMap[a[2]] !== undefined ? wordMap[a[2]] : a[2];
    });
  }); // pivot wordlist

  var wordList = [];
  Object.keys(wordMap).forEach(function (k) {
    wordList[wordMap[k]] = k;
  });
  return {
    tags: Object.keys(tagMap),
    words: wordList,
    list: phraseList
  };
};

var _export = exportFn;

//create json data from .export() output
var loadFromExport = function loadFromExport(json) {
  if (typeof json === 'string') {
    json = JSON.parse(json);
  } //create Phrase objects


  var phrases = json.list.map(function (termArr) {
    //unpack each term
    var terms = termArr.map(function (a) {
      //unpack tags
      var tags = a[3].split(',').map(function (str) {
        return json.tags[str];
      });
      return {
        pre: typeof a[0] === 'number' ? json.words[a[0]] : a[0],
        text: typeof a[1] === 'number' ? json.words[a[1]] : a[1],
        post: typeof a[2] === 'number' ? json.words[a[2]] : a[2],
        tags: tags.filter(function (tag) {
          return tag;
        })
      };
    });
    return {
      terms: terms
    }; //minimum phrase info
  });
  return phrases;
};

var _import = loadFromExport;

var addMethods = function addMethods(Doc, world, nlp) {
  /** create a compressed json object from this document */
  Doc.prototype["export"] = _export;
  /** create a compromise object from compressed export data */

  nlp["import"] = function (data) {
    var json = _import(data, this.world);
    return nlp.fromJSON(json);
  };

  nlp.load = nlp["import"];
};

var src = addMethods;

export default src;
