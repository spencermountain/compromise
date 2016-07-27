'use strict';
//supported Sentence.return() methods
module.exports = {
  /** return a pixel-perfect reproduction of the input, with whitespace preserved */
  text: (s) => {
    return s.terms.reduce((str, t) => {
        str += t.as('text');
        return str;
      }, '') + s.terminator;
  },
  /** return a string with normalized punctuation, trimmed whitespace, and lowercased */
  normal: (s) => {
    let normal = s.terms.reduce((str, t) => {
      str += ' ' + t.as('normal');
      return str;
    }, '');
    normal = normal.trim();
    //add terminator
    let form = s.get('sentenceType');
    const mapping = {
      'Exclamation': '!',
      'Statement': '.',
      'Question': '?'
    };
    if (mapping[form]) {
      normal = normal += mapping[form];
    }
    return normal;
  },

  /** a '& encoded', sanitized html representation of the text*/
  html: (s) => {
    let html = s.terms.reduce((str, t) => {
      return str + '\n  ' + t.render('html')
    }, '')
    html += s.terminator
    let classes = ['nlpSentence', s.info('SentenceType')]
    return '<span class="' + classes.join(' ') + '">' + html + '\n</span>'
  },

  /** a simplified response for Part-of-Speech tagging*/
  tags: (s) => {
    return s.terms.map((t) => {
      return {
        text: t.text,
        normal: t.as('normal'),
        tags: Object.keys(t.pos)
      }
    })
  }

};
