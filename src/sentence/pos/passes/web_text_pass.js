'use strict';
//identify urls, hashtags, @mentions, emails
const assign = require('../assign');
// 'Email': Noun,
// 'Url': Noun,
// 'AtMention': Noun,
// 'HashTag': Noun,

const is_email = function(str) {
  if (str.match(/\w+@\w+\.[a-z]{2,3}/)) { //not fancy
    return true;
  }
  return false;
};

const is_hashtag = function(str) {
  if (str.match(/#\w{2}/)) {
    return true;
  }
  return false;
};

const web_pass = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    let str = terms[i].text.trim().toLowerCase();
    if (is_email(str)) {
      terms[i] = assign(terms[i], 'Email', 'web_pass');
    }
    if (is_hashtag(str)) {
      terms[i] = assign(terms[i], 'HashTag', 'web_pass');
    }
  }
  return terms;
};

module.exports = web_pass;
