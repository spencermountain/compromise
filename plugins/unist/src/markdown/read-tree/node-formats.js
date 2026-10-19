import defaults from './defaults.js'

// Public options describe collections; AST node types remain singular.
const optionNames = {
  text: 'texts',
  root: 'roots',
  paragraph: 'paragraphs',
  heading: 'headings',
  strong: 'strongs',
  emphasis: 'emphases',
  delete: 'deletions',
  link: 'links',
  linkReference: 'links',
  blockquote: 'blockquotes',
  list: 'lists',
  listItem: 'listItems',
  table: 'tables',
  tableRow: 'tableRows',
  tableCell: 'tableCells',
  footnoteDefinition: 'footnoteDefinitions',
  code: 'codeBlocks',
  inlineCode: 'inlineCodes',
  html: 'htmlBlocks',
  image: 'images',
  imageReference: 'images',
  definition: 'definitions',
  thematicBreak: 'thematicBreaks',
  break: 'breaks',
  footnoteReference: 'footnoteReferences',
  yaml: 'yamlBlocks',
  toml: 'tomlBlocks',
}

const modeFor = (type, options, inherited) => {
  const name = optionNames[type]
  let mode = options[name] ?? options[type] ?? inherited ?? defaults[name] ?? 'inline'
  if (mode === true) {
    mode = 'keep'
  } else if (mode === false) {
    mode = 'skip'
  }
  if (!['skip', 'keep', 'inline'].includes(mode)) {
    throw new Error(`Unknown Markdown format for ${type}: ${mode}`)
  }
  return mode
}

// Formatting adds syntax around original children, without changing their AST values.
const block = () => ({ block: true })
const wrap = (prefix, suffix) => (_node, mode) => {
  if (mode === 'keep') {
    return { prefix, suffix }
  }
  return {}
}
const link = (node, mode) => {
  if (mode !== 'keep') {
    return {}
  }
  let suffix = `](${node.url})`
  if (node.type === 'linkReference') {
    suffix = `][${node.label || node.identifier}]`
  } else if (node.title) {
    suffix = `](${node.url} "${node.title}")`
  }
  return { prefix: '[', suffix }
}
const literal = () => ({ text: true, block: true })
const image = (node, mode) => {
  if (mode === 'inline') {
    return { generated: node.alt || '' }
  }
  if (node.type === 'imageReference') {
    return { generated: `![${node.alt || ''}][${node.label || node.identifier}]` }
  }
  return { generated: `![${node.alt || ''}](${node.url})` }
}

const fmtNode = {
  text: () => ({ text: true }),
  strong: wrap('**', '**'),
  emphasis: wrap('*', '*'),
  delete: wrap('~~', '~~'),
  link,
  linkReference: link,
  root: block,
  paragraph: block,
  heading: (node, mode) => {
    let prefix = ''
    if (mode === 'keep') {
      prefix = '#'.repeat(node.depth) + ' '
    }
    return { block: true, prefix }
  },
  blockquote: (_node, mode) => ({ block: true, prefix: mode === 'keep' ? '> ' : '' }),
  list: (_node, mode) => ({ block: true, childMode: mode }),
  listItem: (_node, mode) => ({ block: true, prefix: mode === 'keep' ? '- ' : '' }),
  table: (_node, mode) => ({ block: true, childMode: mode }),
  tableRow: (_node, mode) => ({ block: true, childMode: mode, prefix: mode === 'keep' ? '| ' : '' }),
  tableCell: (_node, mode) => ({ block: mode !== 'keep', suffix: mode === 'keep' ? ' | ' : '' }),
  footnoteDefinition: block,
  code: (node, mode) => ({
    text: true, block: true,
    prefix: mode === 'keep' ? '```' + (node.lang || '') + '\n' : '',
    suffix: mode === 'keep' ? '\n```' : '',
  }),
  inlineCode: (_node, mode) => ({ text: true, ...wrap('`', '`')(null, mode) }),
  html: literal,
  image,
  imageReference: image,
  definition: (node, mode) => ({ block: true, generated: mode === 'keep' ? `[${node.identifier}]: ${node.url}` : node.url }),
  thematicBreak: (_node, mode) => ({ block: true, generated: mode === 'keep' ? '---' : '' }),
  break: () => ({ generated: '\n' }),
  footnoteReference: (node, mode) => ({ generated: mode === 'keep' ? `[^${node.identifier}]` : node.identifier }),
  yaml: literal,
  toml: literal,
}

export { modeFor }
export default fmtNode
