'use strict';
//identify urls, hashtags, @mentions, emails
const assign = require('../assign');
// 'Email': Noun,
// 'Url': Noun,
// 'AtMention': Noun,
// 'HashTag': Noun,

const is_email = function(str) {
  if (str.match(/^\w+@\w+\.[a-z]{2,3}$/)) { //not fancy
    return true;
  }
  return false;
};

const is_hashtag = function(str) {
  if (str.match(/^#[a-z0-9_]{2,}$/)) {
    return true;
  }
  return false;
};

const is_atmention = function(str) {
  if (str.match(/^@\w{2,}$/)) {
    return true;
  }
  return false;
};

const is_url = function(str) {
  //with http/www
  if (str.match(/^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/)) { //not fancy
    return true;
  }
  // 'boo.com'
  //http://mostpopularwebsites.net/top-level-domain
  if (str.match(/^[\w\.\/]+\.(com|net|gov|org|ly|edu|info|biz|ru|jp|de|in|uk|br)/)) {
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
    if (is_atmention(str)) {
      terms[i] = assign(terms[i], 'AtMention', 'web_pass');
    }
    if (is_url(str)) {
      terms[i] = assign(terms[i], 'Url', 'web_pass');
    }
  }
  return terms;
};

module.exports = web_pass;
