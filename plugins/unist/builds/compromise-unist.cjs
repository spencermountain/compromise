(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseUnist = factory());
})(this, (function () { 'use strict';

  var version = '0.2.0';

  // Track UTF-16 coordinates, including CRLF split across text fragments.
  const positions = enabled => {
    const point = { line: 1, column: 1, offset: 0 };
    let carriage = false;
    const advance = value => {
      for (let i = 0; i < value.length; i += 1) {
        const ch = value[i];
        point.offset += 1;
        if (ch === '\r' || (ch === '\n' && !carriage)) {
          point.line += 1;
          point.column = 1;
        } else if (ch !== '\n') {
          point.column += 1;
        }
        carriage = ch === '\r';
      }
    };
    const literal = (type, value) => {
      const start = { ...point };
      advance(value);
      const node = { type, value };
      if (enabled) {
        node.position = { start, end: { ...point } };
      }
      return node
    };
    const parent = (type, children) => {
      const node = { type, children };
      if (enabled) {
        node.position = {
          start: { ...(children[0]?.position.start || point) },
          end: { ...(children.at(-1)?.position.end || point) },
        };
      }
      return node
    };
    return { literal, parent }
  };

  const pieces = /\s+|[\p{L}\p{N}\p{M}]+|\p{P}+|[^\s\p{L}\p{N}\p{M}\p{P}]+/gu;
  const letters = /[\p{L}\p{N}]/u;
  const punctuation = /^\p{P}/u;
  const whitespace = /^\s/u;
  const source = /^(?:https?:\/\/|www\.)\S+$/i;

  const split = (text, make) => (text.match(pieces) || []).map(value => {
    let type = 'SymbolNode';
    if (whitespace.test(value)) {
      type = 'WhiteSpaceNode';
    } else if (punctuation.test(value)) {
      type = 'PunctuationNode';
    } else if (letters.test(value)) {
      type = 'TextNode';
    }
    return make.literal(type, value)
  });

  const terms = (sentence, make, tags) => {
    const nodes = [];
    const append = text => {
      split(text, make).forEach(node => {
        if (node.type === 'TextNode') {
          nodes.push(make.parent('WordNode', [node]));
        } else {
          nodes.push(node);
        }
      });
    };
    sentence.forEach(term => {
      append(term.pre);
      // Implicit contraction terms have no written text, but can own whitespace.
      if (term.text) {
        if (source.test(term.text)) {
          nodes.push(make.literal('SourceNode', term.text));
        } else {
          const children = split(term.text, make);
          let run = [];
          const flush = () => {
            if (run.length === 0) {
              return
            }
            if (run.some(n => n.type === 'TextNode')) {
              const word = make.parent('WordNode', run);
              if (tags) {
                word.data = { compromise: { tags: Array.from(term.tags) } };
              }
              nodes.push(word);
            } else {
              nodes.push(...run);
            }
            run = [];
          };
          children.forEach(node => {
            if (node.type === 'WhiteSpaceNode') {
              flush();
              nodes.push(node);
            } else {
              run.push(node);
            }
          });
          flush();
        }
      }
      append(term.post);
    });
    return nodes
  };

  const blankLine = /\n[\t ]*\n/;

  const toAst = (view, options = {}) => {
    const make = positions(options.positions !== false);
    const paragraphs = [];
    let paragraph = [];
    const flushParagraph = () => {
      if (paragraph.length) {
        paragraphs.push(make.parent('ParagraphNode', paragraph));
        paragraph = [];
      }
    };
    view.docs.forEach(sentence => {
      let run = [];
      const flushSentence = () => {
        if (run.length) {
          paragraph.push(make.parent('SentenceNode', run));
          run = [];
        }
      };
      terms(sentence, make, options.tags !== false).forEach(node => {
        if (node.type === 'WhiteSpaceNode' && blankLine.test(node.value.replace(/\r\n?/g, '\n'))) {
          flushSentence();
          paragraph.push(node);
          flushParagraph();
        } else {
          run.push(node);
        }
      });
      flushSentence();
    });
    flushParagraph();
    return make.parent('RootNode', paragraphs)
  };

  const api = View => {
    View.prototype.toAst = function (options) {
      return toAst(this, options)
    };
  };

  var plugin = {
    version,
    api,
  };

  return plugin;

}));
