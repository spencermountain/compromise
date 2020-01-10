//from https://www.regextester.com/106421
const emojiReg = /^(\u00a9|\u00ae|[\u2319-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/
const emoticon = require('./data/emoticons')
//for us, there's three types -
// * ;) - emoticons
// * 🌵 - unicode emoji
// * :smiling_face: - asci-represented emoji

//test for forms like ':woman_tone2:‍:ear_of_rice:'
//https://github.com/Kikobeats/emojis-keywords/blob/master/index.js
const isCommaEmoji = raw => {
  if (raw.charAt(0) === ':') {
    //end comma can be last or second-last ':haircut_tone3:‍♀️'
    if (raw.match(/:.?$/) === null) {
      return false
    }
    //ensure no spaces
    if (raw.match(' ')) {
      return false
    }
    //reasonably sized
    if (raw.length > 35) {
      return false
    }
    return true
  }
  return false
}

//check against emoticon whitelist
const isEmoticon = str => {
  str = str.replace(/^[:;]/, ':') //normalize the 'eyes'
  return emoticon.hasOwnProperty(str)
}

const tagEmoji = (term, world) => {
  let raw = term.pre + term.text + term.post
  raw = raw.trim()
  //dont double-up on ending periods
  raw = raw.replace(/[.!?,]$/, '')
  //test for :keyword: emojis
  if (isCommaEmoji(raw) === true) {
    term.tag('Emoji', 'comma-emoji', world)
    term.text = raw
    term.pre = term.pre.replace(':', '')
    term.post = term.post.replace(':', '')
  }
  //test for unicode emojis
  if (term.text.match(emojiReg)) {
    term.tag('Emoji', 'unicode-emoji', world)
    term.text = raw
  }
  //test for emoticon ':)' emojis
  if (isEmoticon(raw) === true) {
    term.tag('Emoticon', 'emoticon-emoji', world)
    term.text = raw
  }
}

module.exports = tagEmoji
