const defaults = { min: 1, max: 4 }

const getRange = (list, options) => {
  const min = options.size ?? options.min ?? defaults.min
  const max = options.size ?? options.max ?? defaults.max
  if (!Number.isSafeInteger(min) || min < 1 || !Number.isSafeInteger(max) || max < 1) {
    throw new RangeError('N-gram sizes must be positive safe integers')
  }
  const longest = list.reduce((length, terms) => Math.max(length, terms.length), 0)
  return { min, max: Math.min(max, longest) }
}

const countGram = (grams, terms, start, size) => {
  const normal = terms.slice(start, start + size).join(' ')
  if (Object.hasOwn(grams, normal)) {
    grams[normal].count += 1
  } else {
    grams[normal] = { size, count: 1, normal }
  }
}

export { getRange, countGram }
