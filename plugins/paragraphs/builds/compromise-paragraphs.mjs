const addMethods = function(Paragraphs, Doc) {
  const methods = {
    // return back to a regular Doc object
    sentences: function(n) {
      let list = [];
      this.paragraphs.forEach(docs => {
        docs.forEach(doc => {
          list = list.concat(doc.list);
        });
      });
      let doc = new Doc(list, this.parent, this.world);
      if (typeof n === 'number') {
        return doc.eq(n)
      }
      return doc
    },

    // grab every term in the paragraph
    terms: function(n) {
      let list = [];
      this.paragraphs.forEach(docs => {
        docs.forEach(doc => {
          list = list.concat(doc.terms().list);
        });
      });
      let doc = new Doc(list, this.parent, this.world);
      if (typeof n === 'number') {
        return doc.eq(n)
      }
      return doc
    },

    /** return metadata for each paragraph */
    json: function(options = {}) {
      return this.paragraphs.map(docs => {
        let text = docs.map(d => d.text()).join('');
        let obj = {
          text: text,
          sentences: docs.map(d => d.json(options)),
        };
        if (options.normal) {
          obj.normal = docs.map(d => d.text('normal')).join('');
        }
        return obj
      })
    },

    /** print out the text of each paragraph */
    text: function(options) {
      let text = '';
      this.paragraphs.forEach(docs => {
        docs.forEach(doc => {
          text += doc.text(options);
        });
      });
      return text
    },

    // accessor method wrappers
    eq: function(n) {
      let list = [this.paragraphs[n]];
      list = list.filter(l => l);
      return new Paragraphs(list, this, this.world)
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      let len = this.length;
      return this.eq(len - 1)
    },
    debug: function() {
      this.paragraphs.forEach(docs => {
        console.log('\n=-=-=-=-');
        docs.forEach(doc => {
          doc.debug();
        });
      });
    },

    // match methods

    // returns doc objects, not paragraph objects
    match: function(str) {
      let list = [];
      this.paragraphs.forEach(docs => {
        docs.forEach(doc => {
          let m = doc.match(str);
          if (m.found) {
            list = list.concat(m.list);
          }
        });
      });
      return new Doc(list, this.parent, this.world)
    },
    // returns doc objects
    not: function(str) {
      let list = [];
      this.paragraphs.forEach(docs => {
        docs.forEach(doc => {
          let m = doc.not(str);
          if (m.found) {
            list = list.concat(m.list);
          }
        });
      });
      return new Doc(list, this.parent, this.world)
    },
    // returns paragraph objects
    if: function(str) {
      let list = this.paragraphs.filter(docs => {
        return docs.some(doc => doc.has(str))
      });
      return new Paragraphs(list, this, this.world)
    },
    ifNo: function(str) {
      let list = this.paragraphs.filter(docs => {
        return docs.some(doc => doc.has(str) === false)
      });
      return new Paragraphs(list, this, this.world)
    },
    // returns boolean
    has: function(str) {
      return this.paragraphs.some(docs => {
        for (let i = 0; i < docs.length; i++) {
          return docs[i].has(str)
        }
      })
    },

    //loops
    forEach: function(fn) {
      this.paragraphs.forEach(docs => {
        let p = new Paragraphs([docs], this, this.world);
        fn(p);
      });
      return this
    },
    map: function(fn) {
      let paragraphs = this.paragraphs.map(docs => {
        let p = new Paragraphs([docs], this, this.world);
        return fn(p)
      });
      new Paragraphs(paragraphs, this, this.world);
    },

    //each paragraph must have atleast one sentence that matches
    filter: function(fn) {
      this.paragraphs = this.paragraphs.filter(docs => {
        return docs.some(fn)
      });
      return this
    },
  };
  // aliases
  methods.get = methods.eq;

  Object.keys(methods).forEach(k => {
    Paragraphs.prototype[k] = methods[k];
  });
};
var methods = addMethods;

const hasTwoNewline = /\n\n/;


const addMethods$1 = function(Doc) {
  /** an abstraction on top of Doc */
  class Paragraphs {
    constructor(paragraphs, parent, world) {
      Object.defineProperty(this, 'paragraphs', {
        enumerable: false,
        writable: true,
        value: paragraphs,
      });
      this.parent = parent;
      this.world = world;
      //'found' getter
      Object.defineProperty(this, 'found', {
        get: () => this.paragraphs.length > 0,
      });
      //'length' getter
      Object.defineProperty(this, 'length', {
        get: () => this.paragraphs.length,
      });
    }
  }
  // add our wrapper methods for Doc
  methods(Paragraphs, Doc);

  // finder method creates the sentence groups
  Doc.prototype.paragraphs = function(n) {
    let match = this.all();
    let results = [];
    let carry = [];
    match.forEach(s => {
      carry.push(s);
      if (hasTwoNewline.test(s.post()[0])) {
        results.push(carry);
        carry = [];
      }
    });
    if (carry.length > 0) {
      results.push(carry);
    }
    if (typeof n === 'number') {
      if (results[n]) {
        results = [results[n]];
      } else {
        results = [];
      }
    }
    return new Paragraphs(results, this, this.world)
  };
};

var src = addMethods$1;

export default src;
