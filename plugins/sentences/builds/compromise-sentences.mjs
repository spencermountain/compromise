// if a clause starts with these, it's not a main clause
const subordinate = `(after|although|as|because|before|if|since|than|that|though|when|whenever|where|whereas|wherever|whether|while|why|unless|until|once)`;
const relative = `(that|which|whichever|who|whoever|whom|whose|whomever)`;

//try to remove secondary clauses
const mainClause = function(og) {
  let m = og.clone(true);
  if (m.length === 1) {
    return m
  }
  // if there's no verb?
  m = m.if('#Verb');
  if (m.length === 1) {
    return m
  }
  // this is a signal for subordinate-clauses
  m = m.ifNo(subordinate);
  m = m.ifNo('^even (if|though)');
  m = m.ifNo('^so that');
  m = m.ifNo('^rather than');
  m = m.ifNo('^provided that');
  if (m.length === 1) {
    return m
  }
  // relative clauses
  m = m.ifNo(relative);
  if (m.length === 1) {
    return m
  }

  m = m.ifNo('(despite|during|before|through|throughout)');
  if (m.length === 1) {
    return m
  }
  // did we go too far?
  if (m.length === 0) {
    m = og;
  }
  // choose the first one?
  return m.eq(0)
};
var mainClause_1 = mainClause;

const parse = function(doc) {
  let clauses = doc.clauses();
  let main = mainClause_1(clauses);
  let nouns = main.match('#Determiner? (#Noun|#Adjective)+').if('#Noun');
  let verb = main.match('#Verb+').eq(0);
  return {
    subject: nouns.eq(0),
    verb: verb,
    object: verb.lookAhead('.*'),
  }
};
var parse_1 = parse;

const addMethod = function(Doc) {
  /**  */
  class Sentences extends Doc {
    constructor(list, from, world) {
      super(list, from, world);
    }

    /** overload the original json with noun information */
    json(options) {
      let n = null;
      if (typeof options === 'number') {
        n = options;
        options = null;
      }
      options = options || { text: true, normal: true, trim: true, terms: true };
      let res = [];
      this.forEach(doc => {
        let json = doc.json(options)[0];
        let obj = parse_1(doc);
        json.subject = obj.subject.json(options)[0];
        json.verb = obj.verb.json(options)[0];
        json.object = obj.object.json(options)[0];
        res.push(json);
      });
      if (n !== null) {
        return res[n]
      }
      return res
    }

    /** the main noun of the sentence */
    subjects() {
      return this.map(doc => {
        let res = parse_1(doc);
        return res.subject
      })
    }

    toPastTense() {
      this.forEach(doc => {
        let res = parse_1(doc);
        doc.match(res.verb).replaceWith('was');
        // return doc
      });
      return this
    }
    toPresentTense() {}
    toFutureTense() {}
    toContinuous() {}

    toNegative() {}
    toPositive() {}

    isPassive() {
      return this.has('was #Adverb? #PastTense #Adverb? by') //haha
    }
    /** return sentences ending with '?' */
    isQuestion() {
      return this.filter(doc => {
        let term = doc.lastTerm().termList(0);
        return term.hasPost('?')
      })
    }
    /** return sentences ending with '!' */
    isExclamation() {
      return this.filter(doc => {
        let term = doc.lastTerm().termList(0);
        return term.hasPost('!')
      })
    }
    /** return sentences with neither a question or an exclamation */
    isStatement() {
      return this.filter(doc => {
        let term = doc.lastTerm().termList(0);
        return !term.hasPost('?') && !term.hasPost('!')
      })
    }

    /** add a word to the start of this sentence */
    prepend(str) {
      this.forEach(doc => {
        // repair the titlecase
        let firstTerms = doc.match('^.');
        firstTerms.not('#ProperNoun').toLowerCase();
        // actually add the word
        firstTerms.prepend(str);
        // add a titlecase
        firstTerms.terms(0).toTitleCase();
      });
    }

    /** add a word to the end of this sentence */
    append(str) {
      let hasEnd = /[.?!]\s*$/.test(str);
      this.forEach(doc => {
        let end = doc.match('.$');
        let lastTerm = end.termList(0);
        let punct = lastTerm.post;
        if (hasEnd === true) {
          punct = '';
        }
        // add punctuation to the end
        end.append(str + punct);
        // remove punctuation from the former last-term
        lastTerm.post = ' ';
      });
    }

    toExclamation() {}
    toQuestion() {}
    toStatement() {}
  }

  Doc.prototype.sentences = function(n) {
    let match = this.all();

    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n);
    }
    return new Sentences(match.list, this, this.world)
  };
  return Doc
};
var src = addMethod;

export default src;
