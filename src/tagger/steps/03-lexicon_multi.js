//do these two arrays prefix-match?
const isPrefix = function(have, want) {
  if (want.length > have.length) {
    return false;
  }
  for(let i = 0; i < want.length; i += 1) {
    if (want[i] !== have[i]) {
      return false;
    }
  }
  return true;
};

//find terms in the lexicon longer than one word (like 'hong kong')
const findMultiWords = function(ts, i, world) {
  let start = ts.terms[i].normal;
  let list = world.firstWords[start];
  let nextTerms = ts.terms.slice(i + 1, 4).map((t) => t.normal);
  for(let l = 0; l < list.length; l += 1) {
    if (isPrefix(nextTerms, list[l])) {
      let str = start + ' ' + list.join(' ');
      let tag = world.words[str];
      ts.slice(i, i + list[i].length + 1).tag(tag, 'multi-lexicon-' + str);
      return list[l].length;
    }
  }
  return 0;
};

//try multiple-word matches in the lexicon (users and default)
const lexiconMulti = ts => {
  let firstWords = ts.world.firstWords || {};
  for (let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //try multi words from user-lexicon
    if (firstWords.hasOwnProperty(t.normal) === true) {
      let jump = findMultiWords(ts, i, ts.world);
      // console.log(ts.slice(i, jump + 1).debug().out('text'));
      i += jump;
      continue;
    }
  }
  return ts;
};
module.exports = lexiconMulti;
