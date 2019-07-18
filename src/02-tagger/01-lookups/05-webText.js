const email = /^\w+@\w+\.[a-z]{2,3}$/i //not fancy
const hashTag = /^#[a-z0-9_]{2,}$/i
const atMention = /^@\w{2,}$/
const urlA = /^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/i //with http/www
const urlB = /^[\w\.\/]+\.(com|net|gov|org|ly|edu|info|biz|ru|jp|de|in|uk|br)/i //http://mostpopularwebsites.net/top-level-domain

const webText = function(term, world) {
  let str = term.text
  //joe@hotmail.com
  if (email.test(str) === true) {
    term.tag('Email', 'web_pass', world)
  }
  // #fun #cool
  if (hashTag.test(str) === true) {
    term.tag('HashTag', 'web_pass', world)
  }
  // @johnsmith
  if (atMention.test(str) === true) {
    term.tag('AtMention', 'web_pass', world)
  }
  // www.cool.net
  if (urlA.test(str) === true || urlB.test(str) === true) {
    term.tag('Url', 'web_pass', world)
  }
}
module.exports = webText
