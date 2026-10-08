const iso = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2})?$/
const validIso = value => {
  if (typeof value !== 'string' || !iso.test(value)) {
    return false
  }
  let timestamp = value
  if (value.length === 10) {
    timestamp += 'T00:00:00'
  }
  const instant = new Date(`${timestamp}Z`)
  return !Number.isNaN(instant.getTime()) && instant.toISOString().slice(0, value.length) === value
}

const normalize = (value, expected) => {
  if (typeof value !== 'string' || expected === null) {
    return value
  }
  const instant = new Date(value)
  if (Number.isNaN(instant.getTime())) {
    return value
  }
  return instant.toISOString().slice(0, expected.length)
}

const checkDate = (t, nlp, context, row) => {
  const label = JSON.stringify(row)
  if (!Array.isArray(row) || row.length < 2 || row.length > 3 || typeof row[0] !== 'string') {
    t.fail(`Invalid fixture: ${label}`)
    return
  }
  const [text, start, end] = row
  let valid = validIso(start) && (end === undefined || end === null || validIso(end))
  if (start === null) {
    valid = end === undefined
  }
  if (!valid) {
    t.fail(`Invalid expectation: ${label}`)
    return
  }
  // One failure must not prevent the rest of this exploratory corpus from running.
  try {
    const selection = nlp(text).dates(context)
    if (start === null) {
      t.deepEqual(selection.length, 0, text)
      return
    }
    const expected = [[start]]
    if (end !== undefined) {
      expected[0].push(end)
    }
    const actual = selection.get().map(result => {
      const values = [normalize(result?.start, start)]
      if (end !== undefined) {
        values.push(normalize(result?.end, end))
      }
      return values
    })
    t.deepEqual(actual, expected, text)
  } catch (error) {
    t.fail(`${text}: ${error.message}`)
  }
}

export default checkDate
