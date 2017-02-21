'use strict';
const fns = require('../paths').fns;
const emojiReg = require('./data/emoji_regex');
const emoticon = require('./data/emoticon_list');
//test for forms like ':woman_tone2:‍:ear_of_rice:'
//https://github.com/Kikobeats/emojis-keywords/blob/master/index.js
const isCommaEmoji = (t) => {
  if (fns.startsWith(t.text, ':')) {
    //end comma can be last or second-last ':haircut_tone3:‍♀️'
    if (!t.text.match(/:.?$/)) {
      return false;
    }
    //ensure no spaces
    if (t.text.match(' ')) {
      return false;
    }
    //reasonably sized
    if (t.text.length > 35) {
      return false;
    }
    return true
  }
  return false;
};

//check against emoticon whitelist
const isEmoticon = (t) => {
  //normalize the 'eyes'
  let str = t.text.replace(/^[:;]/, ':')
  str = str.replace(/[:;]$/, ':')
  return emoticon[str]
}

//
const emojiStep = (ts) => {
  for (let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //test for :keyword: emojis
    if (isCommaEmoji(t)) {
      t.tagAs('Emoji', 'comma-emoji');
    }
    //test for unicode emojis
    if (t.text.match(emojiReg)) {
      t.tagAs('Emoji', 'unicode-emoji');
    }
    //test for emoticon ':)' emojis
    if (isEmoticon(t)) {
      t.tagAs('Emoji', 'emoticon-emoji');
    }
  }
  return ts;
};
module.exports = emojiStep;
