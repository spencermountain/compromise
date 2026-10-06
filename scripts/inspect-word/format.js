import { b, cyan, green, yellow, dim, red } from '../../src/API/_color.js'

const wrap = values => {
  const lines = ['']
  values.forEach(value => {
    const last = lines.length - 1
    if (lines[last] && lines[last].length + value.length + 2 > 72) {
      lines.push(value)
    } else {
      lines[last] += (lines[last] ? ', ' : '') + value
    }
  })
  return lines
}

const format = (report, color = true) => {
  const lines = []
  const width = Math.max(18, ...report.related.map(item => item.word.length))
  const paint = (style, text) => color ? style(text) : text
  const show = value => Array.isArray(value) ? value.join(', ') : String(value ?? '—')
  const heading = title => lines.push('', paint(b, title))
  const row = (label, value, style = cyan) => lines.push(`  ${paint(dim, label.padEnd(width))} ${paint(style, show(value))}`)
  const entries = (items, render) => {
    if (!items.length) {
      lines.push(`    ${paint(dim, 'none')}`)
    } else {
      items.forEach(render)
    }
  }
  lines.push(paint(b, report.word))
  row('default', report.tags)
  row('switch', report.switch, yellow)
  row('frozen', report.frozen || 'no')
  heading('Source candidates')
  entries(report.sourceCandidates, hit => {
    lines.push(`  ${paint(dim, `${hit.file}:${hit.line}`)}`)
    lines.push(`    ${hit.text}`)
  })
  heading('Related forms · morphology suggestions')
  entries(report.related, item => {
    let text = show(item.tags)
    if (item.switch) {
      text += `  %${item.switch}%`
    }
    if (item.frozen) {
      text += '  [frozen]'
    }
    row(item.word, text)
  })
  heading('Switch clues · runtime table')
  if (report.clues) {
    row('table', report.clueSource, dim)
    row('precedence', 'right word → left word → left tag → right tag', dim)
    const order = [['afterWords', 'right word'], ['beforeWords', 'left word'], ['beforeTags', 'left tag'], ['afterTags', 'right tag']]
    order.forEach(([key, label]) => {
      lines.push(`  ${paint(b, label)}`)
      const groups = new Map()
      Object.entries(report.clues[key] || {}).forEach(([clue, tag]) => {
        if (!groups.has(tag)) {
          groups.set(tag, [])
        }
        groups.get(tag).push(clue)
      })
      groups.forEach((clues, tag) => {
        wrap(clues).forEach((text, index) => {
          const labelText = index === 0 ? tag || '(disabled)' : ''
          lines.push(`    ${paint(tag ? green : dim, labelText.padEnd(18))} ← ${text}`)
        })
      })
    })
    row('ad-hoc override', report.adHoc ? 'yes · src/2-two/preTagger/compute/tagger/3rd-pass/_adhoc.js' : 'none', yellow)
    row('resolver', 'src/2-two/preTagger/compute/tagger/3rd-pass/06-switches.js', dim)
  } else {
    lines.push(`    ${paint(dim, 'none')}`)
  }
  heading('Indexed rule candidates')
  Object.entries(report.rules).forEach(([bucket, rules]) => {
    lines.push(`  ${paint(b, bucket)}`)
    entries(rules, item => lines.push(`    ${paint(dim, item.key.padEnd(20))} ${item.rule}`))
  })
  if (report.context) {
    heading('Context')
    row('sentence', report.context.sentence)
    const reasonWidth = Math.max(36, ...report.context.events.map(event => event.reason.length))
    report.context.events.forEach(event => {
      const added = event.added.map(tag => `+#${tag}`).join(' ')
      const removed = event.removed.map(tag => `-#${tag}`).join(' ')
      const position = `[${event.index?.join(':') || '?'}]`.padEnd(10)
      const changes = [removed && paint(red, removed), added && paint(green, added)].filter(Boolean).join(' ')
      lines.push(`  ${paint(dim, position)} ${paint(dim, event.reason.padEnd(reasonWidth))} ${changes}`)
    })
    entries(report.context.occurrences, term => row(`final [${term.index.join(':')}]`, term.tags, green))
  }
  heading('Scope')
  report.notes.forEach(note => lines.push(`  ${paint(dim, note)}`))
  return lines.join('\n')
}

export default format
