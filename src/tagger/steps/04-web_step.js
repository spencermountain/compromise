'use strict';
//identify urls, hashtags, @mentions, emails
//regs
const email = /^\w+@\w+\.[a-z]{2,3}$/; //not fancy
const hashTag = /^#[a-z0-9_]{2,}$/;
const atMention = /^@\w{2,}$/;
const urlA = /^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/; //with http/www
const urlB = /^[\w\.\/]+\.(com|net|gov|org|ly|edu|info|biz|ru|jp|de|in|uk|br)/; //http://mostpopularwebsites.net/top-level-domain

const web_pass = function(terms) {
  for (let i = 0; i < terms.length; i++) {
    let t = terms.get(i);
    let str = t.text.trim().toLowerCase();
    if (email.test(str) === true) {
      t.tag('Email', 'web_pass');
    }
    if (hashTag.test(str) === true) {
      t.tag('HashTag', 'web_pass');
    }
    if (atMention.test(str) === true) {
      t.tag('AtMention', 'web_pass');
    }
    if (urlA.test(str) === true || urlB.test(str) === true) {
      t.tag('Url', 'web_pass');
    }
  }
  return terms;
};

module.exports = web_pass;
