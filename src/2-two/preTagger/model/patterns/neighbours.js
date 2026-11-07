import tags from '../../tagSet/aliases.js'
import { Adj, Poss, Det, Adv, Pron, Val, Ord, Mod, Sup, Pers, Cop, Past, Conj } from '../../tagSet/_lib.js'

const { V: vb, NN: nn } = tags

// first matching key wins
export default {
  // looking at the previous word's tags:
  leftTags: {
    [Adj]: nn,
    [Poss]: nn,
    [Det]: nn,
    [Adv]: vb,
    [Pron]: vb,
    [Val]: nn,
    [Ord]: nn,
    [Mod]: vb,
    [Sup]: nn,
    Demonym: nn,
    Honorific: Pers, //dr. Smith
  },
  // looking at the previous word:
  leftWords: {
    i: vb,
    first: nn,
    it: vb,
    there: vb,
    not: vb,
    because: nn,
    if: nn,
    but: nn,
    who: vb,
    this: nn,
    his: nn,
    when: nn,
    you: vb,
    very: Adj,
    old: nn,
    never: vb,
    before: nn,
    a: nn,
    the: nn,
    been: vb,
  },

  // looking at the next word's tags:
  rightTags: {
    [Cop]: nn,
    [Past]: nn,
    [Conj]: nn,
    [Mod]: nn,
  },
  // looking at the next word:
  rightWords: {
    there: vb,
    me: vb,
    man: Adj,
    // only: vb,
    him: vb,
    it: vb, //relaunch it
    were: nn,
    took: nn,
    himself: vb,
    went: nn,
    who: nn,
    jr: Pers,
  },
}
