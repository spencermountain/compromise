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
  const paint = (code, text) => (color ? `\x1b[${code}m${text}\x1b[0m` : text)
  const width = 90
  const header = `${'Match'.padEnd(width)}  ${'Requires matching'.padStart(18)}  ${'Tag edits'.padStart(12)}  ${'Tag rate'.padStart(10)}`
  const divider = '─'.repeat(header.length)
  const lines = [paint('1', header), paint('2', divider)]
  rows.forEach(row => {
    lines.push(
      paint('36', row.reason.slice(0, width).padEnd(width)) +
        '  ' +
        paint('33', row.attempts.toLocaleString('en-US').padStart(18)) +
        '  ' +
        paint('32', row.changedTerms.toLocaleString('en-US').padStart(12)) +
        '  ' +
        paint('32', (tagRate(row) ?? '—').padStart(10))
    )
    for (let i = width; i < row.match.length; i += width) {
      lines.push(paint('36', row.match.slice(i, i + width)))
    }
  })
  lines.push(paint('2', divider))
  return lines.join('\n')
}

export { formatYaml, formatTable }
