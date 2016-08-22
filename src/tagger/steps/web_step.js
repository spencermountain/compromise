'use strict';
//identify urls, hashtags, @mentions, emails
const log = require('../paths').log;
const path = 'tagger/web_step';
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
  log.here(path);
  for (let i = 0; i < terms.length; i++) {
    let t = terms[i];
    let str = t.text.trim().toLowerCase();
    if (is_email(str)) {
      t.tagAs('Email', 'web_pass');
    }
    if (is_hashtag(str)) {
      t.tagAs('HashTag', 'web_pass');
    }
    if (is_atmention(str)) {
      t.tagAs('AtMention', 'web_pass');
    }
    if (is_url(str)) {
      t.tagAs('Url', 'web_pass');
    }
  }
  return terms;
};

module.exports = web_pass;
