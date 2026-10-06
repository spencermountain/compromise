import { b, dim, cyan, yellow, green } from '../../../src/API/_color.js'

const tagRate = row => {
  if (!row.attempts) {
    return null
  }
  return `${((100 * row.changedTerms) / row.attempts).toFixed(2)}%`
}

const formatYaml = report => {
  const patterns = new Map()
  report.rules.forEach(row => {
    if (!patterns.has(row.match)) {
      patterns.set(row.match, [])
    }
    patterns.get(row.match).push(row)
  })
  const lines = []
  patterns.forEach((rows, pattern) => {
    lines.push(`${JSON.stringify(pattern)}:`)
    rows.forEach(row => {
      // Duplicate patterns retain their separate rule actions.
      const prefix = rows.length > 1 ? '  - ' : '  '
      const indent = rows.length > 1 ? '    ' : '  '
      lines.push(`${prefix}rule_name: ${JSON.stringify(row.reason || row.id)}`)
      lines.push(`${indent}requires_matching: ${row.attempts}`)
      lines.push(`${indent}tag_edits: ${row.changedTerms}`)
      lines.push(`${indent}tag_rate: ${JSON.stringify(tagRate(row))}`)
    })
    lines.push('')
  })
  return lines.join('\n')
}

const formatTable = (rows, { color = false } = {}) => {
  const paint = (style, text) => (color ? style(text) : text)
  const width = 90
  const header = `${'Match'.padEnd(width)}  ${'Requires matching'.padStart(18)}  ${'Tag edits'.padStart(12)}  ${'Tag rate'.padStart(10)}`
  const divider = '─'.repeat(header.length)
  const lines = [paint(b, header), paint(dim, divider)]
  rows.forEach(row => {
    lines.push(
      paint(cyan, row.reason.slice(0, width).padEnd(width)) +
        '  ' +
        paint(yellow, row.attempts.toLocaleString('en-US').padStart(18)) +
        '  ' +
        paint(green, row.changedTerms.toLocaleString('en-US').padStart(12)) +
        '  ' +
        paint(green, (tagRate(row) ?? '—').padStart(10))
    )
    for (let i = width; i < row.match.length; i += width) {
      lines.push(paint(cyan, row.match.slice(i, i + width)))
    }
  })
  lines.push(paint(dim, divider))
  return lines.join('\n')
}

export { formatYaml, formatTable }
