const keys = ['beforeTags', 'afterTags', 'beforeWords', 'afterWords']

// combine clue sets left-to-right, later entries override earlier ones
const merge = (...clues) => {
  const res = {}
  keys.forEach(k => {
    res[k] = Object.assign({}, ...clues.map(c => c[k]))
  })
  return res
}

export default merge
