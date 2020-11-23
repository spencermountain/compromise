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

const termContainsTag = (term, name) =>
  Object.entries(term.tags || {})
    .filter(([_k, v]) => v) //eslint-disable-line
    .map((entry) => entry[0].toLowerCase())
    .includes(name.toLowerCase())

/**
 * Helper function, create a thread
 * Copies saved and groups.saved so that each thread contains its own
 * independent saved values.
 *
 * Note: Using the { saved, groups } allows passing a thread which will cause
 * its saved to be cloned.
 *
 * @param {int} pc - position of instance code to execute
 * @param {*[]} saved - matched objects that were saved
 * @param {object} groups - capture groups key of group id
 * @returns {object} thread
 */
const thread = (pc, { save = true, saved = [], groups = {}, vars = {} } = {}) => {
  const ngroups = Object.values(groups).reduce((ng, g) => {
    ng[g.id] = Object.assign({}, g)
    ng[g.id].saved = g.saved.slice()
    return ng
  }, {})

  return {
    pc,
    save,
    saved: [...saved],
    // clone groups.saved
    groups: ngroups,
    vars: Object.assign({}, vars),
  }
}

const addthread = (prog, list, th) => {
  const inst = prog[th.pc]
  //console.log("addthread:", th.pc);
  //console.log("  inst:", inst);
  switch (inst.code) {
    case GLOBAL_SAVE:
      th.save = inst.value
      addthread(prog, list, thread(th.pc + 1, th))
      break
    case NOOP:
      addthread(prog, list, thread(th.pc + 1, th))
      break
    case JMP:
      addthread(prog, list, thread(inst.loc, th))
      break
    case SPLIT:
      for (const loc of inst.locs) {
        addthread(prog, list, thread(loc, th))
      }
      break
    case OGROUP:
      // again (see below comment in pikevm match), can modify thread
      // because it ends here
      th.groups[inst.id] = {
        id: inst.id,
        name: inst.name,
        saved: [],
        open: true,
      }
      addthread(prog, list, thread(th.pc + 1, th))
      break
    case CGROUP:
      th.groups[inst.id].open = false
      addthread(prog, list, thread(th.pc + 1, th))
      break
    case INCV:
      th.vars[inst.varId] = (th.vars[inst.varId] || 0) + 1
      addthread(prog, list, thread(th.pc + 1, th))
      break
    case JMP_LT:
      if (th.vars[inst.varId] < inst.value) {
        // jump!
        addthread(prog, list, thread(inst.loc, th))
      } else {
        // continue
        addthread(prog, list, thread(th.pc + 1, th))
      }
      break
    case SPLIT_LT:
      if (th.vars[inst.varId] < inst.value) {
        // split!
        for (const loc of inst.locs) {
          addthread(prog, list, thread(loc, th))
        }
      } else {
        // continue
        addthread(prog, list, thread(th.pc + 1, th))
      }
      break
    default:
      list.push(th)
      break
  }
}

/**
 * Save a match to a thread.
 * Handles saving to open groups too
 * @param {object} th - the thread
 * @param {*] sp - the matched value to add
 * @return {object} the thread th
 */
const saveMatch = (th, sp) => {
  if (!th.save) {
    return th
  }
  // get the `saved` from the open buckets
  let tmp = Object.values(th.groups)
    .filter((g) => g.open)
    .map((g) => g.saved)

  const buckets = [th.saved].concat(tmp)
  for (const saved of buckets) {
    saved.push(sp)
  }
  return th
}

/**
 * Simulate pike's vm, see https://swtch.com/~rsc/regexp/regexp2.html
 * @param {object[]} inst - instructions to execute
 * @param {object[]} input - input word w/ terms
 * @returns true or false for match and saved matches
 */
const pikevm = (prog, input) => {
  let clist = []
  let nlist = []
  let found = false
  let groups = {}
  let saved = []

  // helps with match end and also matches that end at exactly the end so that
  // the match function gets a chance to run.
  const END = Symbol('END')
  input = input.concat(END)

  addthread(prog, clist, thread(0)) // and so we begin...
  for (let i = 0; i < input.length; i++) {
    if (clist.length === 0) {
      break
    }

    const sp = input[i]

    for (let j = 0; j < clist.length; j++) {
      // can probably convert to clist.shift as optimization
      const th = clist[j]
      const inst = prog[th.pc]
      //console.log("exec:", inst);
      //console.log(`  stack(${i}):`, clist);
      let gotoNextWord = false
      switch (inst.code) {
        case MATCH_ANY:
          // Note: can call save match like this without worrying about other
          // threads because this thread ends here and another will be created
          // in its place
          if (sp !== END) {
            addthread(prog, nlist, thread(th.pc + 1, saveMatch(th, sp)))
          }
          break
        case MATCH_WORD:
          if (sp.text && sp.text.toLowerCase() === inst.value.toLowerCase()) {
            // continue on next word
            addthread(prog, nlist, thread(th.pc + 1, saveMatch(th, sp)))
          }
          break
        case MATCH_TAG:
          if (termContainsTag(sp, inst.value)) {
            addthread(prog, nlist, thread(th.pc + 1, saveMatch(th, sp)))
          }
          break
        case MATCH_METHOD:
          // call method using null coalescing on term, if it returns true continue
          if (sp[inst.value]()) {
            addthread(prog, nlist, thread(th.pc + 1, saveMatch(th, sp)))
          }
          break
        case MATCH_END:
          if (sp === END) {
            // continue
            addthread(prog, clist, thread(th.pc + 1, th))
          }
          break
        case LOOKAHEAD:
          const mla = pikevm(inst.prog, input.slice(i))
          if (mla.found) {
            addthread(prog, clist, thread(th.pc + 1, th))
          }
          break
        case NEGATIVE_LOOKAHEAD:
          const mnla = pikevm(inst.prog, input.slice(i))
          if (!mnla.found) {
            // continue at current position
            // NOTE: this would be in addthread but we require access to input
            addthread(prog, clist, thread(th.pc + 1, th))
          }
          break
        case MATCH:
          saved = th.saved
          groups = th.groups
          found = true
          // Go to the next word which causes all pending threads in the
          // current list (stack) to be cleared so we don't go down those
          // paths. This allows for greedy and non-greedy matches to work.
          gotoNextWord = true
          break
        default:
          throw new Error(`Unsuppored Op code: ${inst.code}`)
      }
      if (gotoNextWord) {
        break // continue next iteration
      }
    }
    clist = nlist
    nlist = []
  }
  if (found) {
    return { found, saved, groups }
  }
  return { found }
}

module.exports = {
  termContainsTag: termContainsTag,
  pikevm: pikevm,
}
