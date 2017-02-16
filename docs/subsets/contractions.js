module.exports = {
  data: {
    desc: 'return a handy array of meta-data for this subset',
    example: `nlp().contractions().data()`,
    returns: 'array'
  },
  expand: {
    desc: 'turn `didn\'t` into `did not`, etc',
    returns: 'Text',
    example: `nlp('He’s the greatest guy in history').contractions().expand().out('')\n//He is`
  },
  contract: {
    desc: 'turn did not into didn\'t, etc.',
    returns: 'Text',
    example: `nlp('He is about to hit a chestnut tree').contractions().contract().out('')\n//He's`
  },
  contracted: {
    desc: 'show only the contractions that are currently contracted -eg. `i\'ll` but not `i will`',
    returns: 'Text',
    example: `nlp('Lisa, I’d like to buy your rock.').contractions().contracted().out('')\n//I'd`
  },
  expanded: {
    desc: 'show only the contractions that are currently not contracted -eg. `he would` but not `he\'d`',
    returns: 'Text',
    example: `nlp('Lisa, I would like to buy your rock.').contractions().expanded().out('')\n//I would`
  }
};
