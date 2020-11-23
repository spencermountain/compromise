const { EmbeddedActionsParser, Lexer, createToken } = require('chevrotain')

const {
  NOOP,
  MATCH_ANY,
  MATCH_TAG,
  MATCH_WORD,
  MATCH_METHOD,
  MATCH_END,
  JMP,
  SPLIT,
  GLOBAL_SAVE,
  MATCH,
  OGROUP,
  CGROUP,
  INCV,
  JMP_LT,
  SPLIT_LT,
  LOOKAHEAD,
  NEGATIVE_LOOKAHEAD,
} = require('./constants')

const StartOf = createToken({ name: 'StartOf', pattern: /\^/ })
const EndOf = createToken({ name: 'EndOf', pattern: /\$/ })
const Tag = createToken({ name: 'Tag', pattern: /#([_-\w]|\\.)+/ })
const EscapedWord = createToken({
  name: 'EscapedWord',
  pattern: /\\[#@]([_-\w]|\\.)+/,
})
const Word = createToken({ name: 'Word', pattern: /([_-\w]|\\.)+/ })
const Method = createToken({ name: 'Method', pattern: /@[_-\w]+/ })
const Question = createToken({
  name: 'Question',
  pattern: /\?/,
  longer_alt: Word,
})
const Exclamation = createToken({
  name: 'Exclamation',
  pattern: /!/,
  longer_alt: Word,
})
const Equals = createToken({ name: 'Equals', pattern: /=/, longer_alt: Word })
const Pound = createToken({ name: 'Pound', pattern: /#/, longer_alt: Tag })
const Dot = createToken({ name: 'Dot', pattern: /\./, longer_alt: Word })
const Pipe = createToken({ name: 'Pipe', pattern: /\|/ })
const Comma = createToken({ name: 'Comma', pattern: /,/, longer_alt: Word })
const Colon = createToken({ name: 'Colon', pattern: /:/, longer_alt: Word })
const Plus = createToken({ name: 'Plus', pattern: /\+/ })
const Star = createToken({ name: 'Star', pattern: /\*/ })
const Zero = createToken({ name: 'Zero', pattern: /0/, longer_alt: Word })
const PositiveInt = createToken({
  name: 'PositiveInt',
  pattern: /[1-9]\d*/,
  longer_alt: Word,
})
const LParenthesis = createToken({ name: 'LParenthesis', pattern: /\(/ })
const RParenthesis = createToken({ name: 'RParenthesis', pattern: /\)/ })
const LCurly = createToken({ name: 'LCurly', pattern: /\{/ })
const RCurly = createToken({ name: 'RCurly', pattern: /\}/ })
const NamedGroupBegin = createToken({ name: 'NamedGroupBegin', pattern: /P</ })
const NamedGroupEnd = createToken({
  name: 'NamedGroupEnd',
  pattern: />/,
  longer_alt: Word,
})
const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
})

const allTokens = [
  NamedGroupBegin,
  NamedGroupEnd,
  WhiteSpace,
  StartOf,
  EndOf,
  Zero,
  PositiveInt,
  Dot,
  EscapedWord,
  Word,
  Method,
  Tag,
  Exclamation,
  Equals,
  Pound,
  Colon,
  Question,
  Plus,
  Star,
  Comma,
  Pipe,
  LParenthesis,
  RParenthesis,
  LCurly,
  RCurly,
]

// Notes or something like it, may not be accurate.
// (a|b)
// 0. split 1, 3
// 1. char a
// 2. jmp 4
// 3. char b
// 4. match
//
// (a|b|c)
// 0. split 1, 3, 5
// 1. char a
// 2. jmp 7
// 3. char b
// 4. jmp 7
// 5. char c
// 6. match
//
// ((a|b)|c)
// 0. split 1, 6
// 1. split 2, 4
// 2. char a
// 3. jmp 7
// 4. char b
// 5. jmp 7
// 6. char c
// 7. match
//
// a{2}
// 0. noop
// 1. char a
// 2. incv i 1, def=0
// 3. jmp_lt i 2 [0]
//
// a{2, 3}
// 0. noop
// 1. char a
// 2. incv i 1, def=0
// 3. jmp_lt 0 i [2]
// 4. split_lt i 3 [0, 6]
//
// a{,3}
// 0. noop
// 1. char a
// 2. incv i 1, def=0
// 3. split_lt i 3 [0, 5]
//
// a{3,}
// 0. noop
// 1. char a
// 2. incv i 1, def=0
// 3. jmp_lt i 3
// 4. split [0, 6]
//
// a(!b)
// 0. noop
// 1. char a
// 2. nlookahead prog  // negative lookahead is a sub program
//   1. match b
//   2. match
// 2.1. if found stop, else continue at current sp
//

class MatchParser extends EmbeddedActionsParser {
  constructor() {
    super(allTokens)

    /*
     * '.'
     * '^remind #Noun$'
     * '\#Noun' -- escaped word containing #
     * '(remind|#Noun)'
     * '(remind+|#Noun)'
     * '(remind|#Noun)+'
     * '#Noun{2}'
     * '#Noun?'
     * '#Noun*'
     * '(?:remind #Noun)' -- non capturing group
     * '(?P<name>#Noun)'
     * '(?P<name>#Noun)+'
     *
     * matchStatement ([startOf] valueStatement [endOf])
     * valueStatement (value [...value])
     * rangeModifier (LCurly, ((PositiveInt|Zero) [, PositiveInt]) RCurly)
     * oneOrMore (Plus)
     * zeroOrMore (Star)
     * zeroOrOne (Question)
     * valueModifier (oneOrMore, rangeModifier, zeroOrMore, zeroOrOne)
     * value (dot, word, escapedWord, tag, Zero, PositiveInt, group)[valueModifier]
     * namedGroupBegin: token pattern /\?P</
     * namedGroupEnd: token pattern />/
     * namedGroup (namedGroupBegin, Word, namedGroupEnd)
     * nonCapturingGroup token pattern /\?:/ -- TODO: figure out how to escape these
     * negativeGroup token patter /\?!/
     * groupModifier [namedGroup|nonCapturingGroup]
     * group (LParent, [groupModifier], valueStatement|...), RParen)
     *
     */

    const $ = this
    $.RULE('matchStatement', () => {
      const matches = {
        startOf: false,
        prog: [],
        endOf: false,
      }

      $.OPTION(() => {
        $.CONSUME(StartOf)
        matches.startOf = true
      })

      // handle ^ startOf
      if (!matches.startOf) {
        // .*? at the start when not ^ / startOf, don't save the matched
        // values.
        matches.prog.push({ code: GLOBAL_SAVE, value: false })
        matches.prog.push({ code: SPLIT, locs: [4, 2] })
        matches.prog.push({ code: MATCH_ANY })
        matches.prog.push({ code: JMP, loc: 1 })
        matches.prog.push({ code: GLOBAL_SAVE, value: true })
      }

      matches.groups = []
      $.SUBRULE($.valueStatement, { ARGS: [matches.prog, matches.groups] })

      $.OPTION1(() => {
        $.CONSUME(EndOf)
        matches.endOf = true
      })

      // handle $ endOf
      $.ACTION(() => {
        if (matches.endOf) {
          matches.prog.push({ code: MATCH_END })
        }
        matches.prog.push({ code: MATCH })
      })

      return matches
    })

    $.RULE('valueStatement', (prog = [], groups = [], vars = []) => {
      const inst = []
      $.AT_LEAST_ONE({
        DEF: () => {
          $.SUBRULE($.value, { ARGS: [prog, groups, vars] })
        },
      })
      return inst
    })

    $.RULE('value', (prog = [], groups = [], vars = []) => {
      const split = { code: NOOP } // save split for modifiers
      prog.push(split)
      const start = prog.length // save start for split jmp later

      $.OR([
        {
          ALT: () => {
            $.CONSUME(Dot)
            prog.push({ code: MATCH_ANY })
          },
        },
        {
          ALT: () => {
            prog.push({ code: MATCH_WORD, value: $.CONSUME(Word).image })
          },
        },
        {
          ALT: () => {
            prog.push({
              code: MATCH_WORD,
              value: $.CONSUME(EscapedWord).image.substr(1),
            })
          },
        },
        {
          ALT: () => {
            prog.push({
              code: MATCH_TAG,
              value: $.CONSUME(Tag).image.substr(1),
            })
          },
        },
        {
          ALT: () => {
            prog.push({ code: MATCH_WORD, value: $.CONSUME(Zero).image })
          },
        },
        {
          ALT: () => {
            prog.push({
              code: MATCH_WORD,
              value: $.CONSUME(PositiveInt).image,
            })
          },
        },
        {
          ALT: () => {
            prog.push({
              code: MATCH_METHOD,
              value: $.CONSUME(Method).image.substr(1),
            })
          },
        },
        {
          ALT: () => {
            $.SUBRULE($.group, { ARGS: [prog, groups, vars] })
          },
        },
      ])

      $.OPTION(() => {
        // TODO: could probably allow relative jmps to get rid of noop
        const { type, greedy, min, max } = $.SUBRULE($.valueModifier)
        switch (type) {
          case 'ZERO_OR_ONE':
            split.code = SPLIT
            split.locs = [start, prog.length]
            break
          case 'ZERO_OR_MORE':
            prog.push({ code: JMP, loc: start - 1 })
            split.code = SPLIT
            split.locs = [start, prog.length]
            break
          case 'ONE_OR_MORE':
            prog.push({ code: SPLIT, locs: [start, prog.length + 1] })
            if (!greedy) {
              prog[prog.length - 1].locs.reverse()
            }
            break
          case 'RANGE':
            const varId = vars.length
            vars.push(varId)
            prog.push({ code: INCV, varId }) // increment first

            const minInst = {
              code: JMP_LT,
              varId,
              value: min || 0,
              loc: start,
            }
            let maxInst = null
            if (min === max) {
              // a{x}
              if (min === 0) {
                // a{0} skip matching, causes token to be ignored
                split.code = JMP
                split.loc = prog.length // next instruction
              } else {
                // a{x}
                prog.push(minInst)
              }
            } else if ((min || 0) === 0 && max !== null) {
              // a{,y} a{0,y}
              split.code = SPLIT
              split.locs = [start, prog.length + 1]

              maxInst = {
                code: SPLIT_LT,
                varId,
                value: max,
                locs: [start, prog.length + 1],
              }
              prog.push(maxInst)
            } else if (min !== null && max === null) {
              // a{x,}
              prog.push(minInst)
              maxInst = { code: SPLIT, locs: [start, prog.length + 1] }
              prog.push(maxInst)
            } else {
              // if (min !== null && max !== null) {
              // a{x,y}
              prog.push(minInst)
              maxInst = {
                code: SPLIT_LT,
                varId,
                value: max,
                locs: [start, prog.length + 1],
              }
              prog.push(maxInst)
            }

            if (!greedy && maxInst && maxInst.locs) {
              maxInst.locs.reverse() // reverse thread priority for greedy / non-greedy
            }
            //{ code: SPLIT, locs: [ ] }
            //prog.push({ code: SETV_ONCE, id: rid, value: 0 });
            //prog.push({ code: INCREMENT, id: rid, value: 1 });
            //prog.push({ code: JMP_IF_GTE, id: rid, value: 0 });
            break
        }
        if (!greedy && split.locs) {
          split.locs.reverse()
        }
      })
    })

    $.RULE('valueModifier', () => {
      let result = { type: null, greedy: true }
      $.OR([
        {
          ALT: () => {
            $.CONSUME(Question)
            result.type = 'ZERO_OR_ONE'
          },
        },
        {
          ALT: () => {
            $.CONSUME(Star)
            result.type = 'ZERO_OR_MORE'
          },
        },
        {
          ALT: () => {
            $.CONSUME(Plus)
            result.type = 'ONE_OR_MORE'
          },
        },
        {
          ALT: () => {
            const { min, max } = $.SUBRULE($.rangeModifier)
            $.ACTION(() => {
              result.type = 'RANGE'
              result.min = min
              result.max = max
            })
          },
        },
      ])
      $.OPTION(() => {
        $.CONSUME1(Question)
        $.ACTION(() => {
          result.greedy = false
        })
      })
      return result
    })

    $.RULE('rangeModifier', () => {
      const range = { min: null, max: null }
      $.CONSUME(LCurly)

      // {x}
      $.OPTION(() => {
        $.OR([
          {
            ALT: () => {
              range.min = $.CONSUME(Zero).image
            },
          },
          {
            ALT: () => {
              range.min = $.CONSUME(PositiveInt).image
            },
          },
        ])
      })

      // {x}
      range.max = range.min

      $.OPTION1(() => {
        $.CONSUME(Comma)
        // {x,}
        range.max = null
        // {,x} {x,}, {x,y}
        $.OPTION2(() => {
          range.max = $.CONSUME1(PositiveInt).image
        })
      })

      $.ACTION(() => {
        if (range.min) {
          range.min = parseInt(range.min, 10)
        }
        if (range.max) {
          range.max = parseInt(range.max, 10)
        }
        const { min, max } = range
        if (min && max && min > max) {
          throw new Error(`Range min(${min}) must be greater than max(${max}).`)
        }
        if (min === null && max === null) {
          throw new Error(`Range min or max must be defined.`)
        }
      })

      $.CONSUME(RCurly)
      return range
    })

    $.RULE('group', (prog = [], groups = [], vars = []) => {
      let modifiers = {
        capture: true,
        name: null,
        lookahead: false,
        negative: false,
      }

      $.CONSUME(LParenthesis)

      $.OPTION(() => {
        modifiers = $.SUBRULE($.groupModifier)
      })

      let oProg = null
      if (modifiers.lookahead) {
        // part 1, see finish at end
        modifiers.capture = false
        oProg = prog
        prog = []
      }

      const gId = groups.length
      if (modifiers.capture) {
        groups.push(modifiers)
        prog.push({ code: OGROUP, id: gId, name: modifiers.name })
      }

      const split = { code: SPLIT, locs: [] }
      prog.push(split)
      let jmps = []

      $.AT_LEAST_ONE_SEP({
        SEP: Pipe,
        DEF: () => {
          split.locs.push(prog.length)
          $.SUBRULE($.valueStatement, { ARGS: [prog, groups, vars] })

          const jmp = { code: JMP, loc: null }
          jmps.push(jmp)
          prog.push(jmp)
        },
      })

      // make split noop when just one in group
      if (split.locs.length === 1) {
        split.code = NOOP
        delete split.locs
      }

      // remove last jmp so it continues
      prog.pop()

      // set jmps to end
      for (const jmp of jmps) {
        jmp.loc = prog.length
      }

      // close the group if necessary as the last step
      if (modifiers.capture) {
        prog.push({ code: CGROUP, id: gId, name: modifiers.name })
      }

      if (modifiers.lookahead) {
        prog.push({ code: MATCH })
        oProg.push({
          code: modifiers.negative ? NEGATIVE_LOOKAHEAD : LOOKAHEAD,
          prog,
        })
      }

      $.CONSUME(RParenthesis)
    })

    $.RULE('namedGroup', () => {
      $.CONSUME(Question)
      $.CONSUME(NamedGroupBegin)
      const name = $.CONSUME(Word).image
      $.CONSUME(NamedGroupEnd)
      return name
    })

    $.RULE('nonCapturingGroup', () => {
      $.CONSUME(Question)
      $.CONSUME(Colon)
    })

    $.RULE('negativeLookaheadGroup', () => {
      $.CONSUME(Question)
      $.CONSUME(Exclamation)
    })

    $.RULE('positiveLookaheadGroup', () => {
      $.CONSUME(Question)
      $.CONSUME(Equals)
    })

    $.RULE('commentGroup', () => {
      $.CONSUME(Question)
      $.CONSUME(Pound)
    })

    $.RULE('groupModifier', () => {
      let result = {
        capture: true,
        name: null,
        lookahead: false,
        negative: false,
        comment: false,
      }
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.nonCapturingGroup)
            result.capture = false
          },
        },
        {
          ALT: () => {
            result.name = $.SUBRULE($.namedGroup)
          },
        },
        {
          ALT: () => {
            $.SUBRULE($.negativeLookaheadGroup)
            result.capture = false
            result.lookahead = true
            result.negative = true
          },
        },
        {
          ALT: () => {
            $.SUBRULE($.positiveLookaheadGroup)
            result.capture = false
            result.lookahead = true
            result.negative = false
          },
        },
        /*
        { ALT: () => {
          $.SUBRULE($.commentGroup);
          result.capture = false;
          result.comment = true;
        }}
        */
      ])
      return result
    })

    this.performSelfAnalysis()
  }
}

module.exports = {
  allTokens: allTokens,
  MatchParser: MatchParser,
}
