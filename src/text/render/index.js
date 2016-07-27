'use strict';
const chalk = require('chalk')
const fns = require('../../log/fns');

const PosColor = (tag) => {
  const known = {
    Noun: (s) => chalk.green(s),
    Person: (s) => chalk.bgGreen(s),
    Verb: (s) => chalk.red(s),
    Adjective: (s) => chalk.cyan(s),
    Adverb: (s) => chalk.yellow(s),
    Determiner: (s) => chalk.grey(s)
  }
  if (known[tag]) {
    return known[tag](tag)
  }
  return tag
}

//supported Sentence.return() methods
module.exports = {
  text: (t) => {
    return t.sentences.reduce((str, s) => {
      str += s.as('text');
      return str;
    }, '');
  },
  normal: (t) => {
    return t.sentences.reduce((str, s) => {
      str += s.as('normal') + ' ';
      return str;
    }, '');
  },
  tags: (t) => {
    return t.sentences.map((s) => {
      return s.as('tags');
    });
  },
  html: (t) => {
    return t.sentences.reduce((str, s) => {
      return str + s.render('html') + '\n'
    }, '')
  },
  prettyprint: (t) => {
    console.log('\n\n')
    t.sentences.forEach((s) => {
      s.terms.forEach((term) => {
        let niceTags = Object.keys(term.pos).map((tag) => PosColor(tag)).join(', ');
        niceTags = fns.rightPad(niceTags, 40)
        let title = '\'' + term.text + '\'';
        let silent = '';
        if (term.silent_term) {
          silent = '  [' + term.silent_term + ']';
        }
        silent = fns.rightPad(silent, 6);
        let reason = chalk.green('  - ' + (term.context.reason || ''))
        console.log(fns.rightPad('   ' + title, 20) + silent + '  ' + niceTags + reason);
      });
      console.log('   ' + chalk.bgCyan('-----------'));
    });
  }
};
