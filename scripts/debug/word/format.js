import { b, cyan, green, yellow, dim, red } from '../../../src/API/_color.js'

const format = (report, color = true) => {
  const lines = []
  const rules = Object.values(report.rules).flat()
  const width = Math.max(12, ...report.related.map(item => item.word.length), ...rules.map(item => item.key.length))
  const paint = (style, text) => color ? style(text) : text
  const show = value => Array.isArray(value) ? value.join(', ') : String(value ?? '—')
  const heading = title => lines.push('', paint(b, title))
  const row = (label, value, style = cyan) => lines.push(`  ${paint(dim, label.padEnd(width))} ${paint(style, show(value))}`)
  lines.push(paint(b, report.word))
  row('default', report.tags)
  if (report.switch) {
    row('switch', report.switch, yellow)
  }
  if (report.frozen) {
    row('frozen', report.frozen)
  }
  if (report.sourceCandidates.length) {
    heading('Source candidates')
    report.sourceCandidates.forEach(hit => lines.push(`  ${paint(dim, `${hit.file}:${hit.line}`)}`))
  }
  if (report.related.length) {
    heading('Related forms')
    report.related.forEach(item => {
      let text = show(item.tags)
      if (item.switch) {
        text += `  %${item.switch}%`
      }
      if (item.frozen) {
        text += '  [frozen]'
      }
      row(item.word, text)
    })
  }
  if (report.patterns.length) {
    heading('Pattern candidates · untagged words')
    report.patterns.forEach(item => {
      row(item.kind, `${item.pattern} → ${show(item.tag)}`)
      lines.push(`  ${paint(dim, item.source)}`)
    })
  }
  if (report.clues) {
    heading('Switch clues · in priority order')
    const order = [['afterWords', 'right word'], ['beforeWords', 'left word'], ['beforeTags', 'left tag'], ['afterTags', 'right tag']]
    order.forEach(([key, label]) => {
      const count = Object.values(report.clues[key] || {}).filter(Boolean).length
      if (count) {
        row(label, `${count} clues`, dim)
      }
    })
    if (report.adHoc) {
      row('override', 'ad-hoc', yellow)
    }
    lines.push(`  ${paint(dim, report.clueSource)}`)
  }
  if (rules.length) {
    heading('Rule candidates')
    rules.forEach(item => row(item.key, item.rule))
  }
  if (report.context) {
    heading('Context')
    lines.push(`  ${report.context.sentence}`)
    const reasonWidth = Math.max(0, ...report.context.events.map(event => event.reason.length))
    report.context.events.forEach(event => {
      const added = event.added.map(tag => `+#${tag}`).join(' ')
      const removed = event.removed.map(tag => `-#${tag}`).join(' ')
      const position = `[${event.index?.join(':') || '?'}]`.padEnd(10)
      const changes = [removed && paint(red, removed), added && paint(green, added)].filter(Boolean).join(' ')
      lines.push(`  ${paint(dim, position)} ${paint(dim, event.reason.padEnd(reasonWidth))} ${changes}`)
    })
    report.context.occurrences.forEach(term => row(`final [${term.index.join(':')}]`, term.tags, green))
    if (!report.context.occurrences.length) {
      row('final', 'no matching term', dim)
    }
  }
  lines.push('', paint(dim, 'Use --json for full clues, source excerpts, and scope notes.'))
  return lines.join('\n')
}

export default format
