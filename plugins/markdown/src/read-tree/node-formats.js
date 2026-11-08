import defaults from './defaults.js'
import isAutolink from './_lib.js'

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
  inlineCode: 'inlineCode',
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

const modeFor = (node, options, inherited) => {
  const { type } = node
  const name = optionNames[type]
  let group
  let fallback = defaults[name]
  if (type === 'footnoteDefinition' || type === 'footnoteReference') {
    group = options.footnotes
    fallback = defaults.footnotes ?? fallback
  } else if (type === 'yaml' || type === 'toml') {
    group = options.frontmatter
    fallback = defaults.frontmatter ?? fallback
  }
  let specific = options[name] ?? options[type]
  if (type === 'listItem' && typeof node.checked === 'boolean') {
    specific = options.taskLists ?? specific
    fallback = defaults.taskLists ?? fallback
  } else if (isAutolink(node)) {
    specific = options.autolinks ?? specific
    fallback = defaults.autolinks ?? fallback
  }
  let mode = specific ?? group ?? inherited ?? fallback ?? 'inline'
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
  listItem: (node, mode) => {
    let prefix = ''
    if (mode === 'keep') {
      prefix = '- '
      if (typeof node.checked === 'boolean') {
        prefix += node.checked ? '[x] ' : '[ ] '
      }
    }
    return { block: true, prefix }
  },
  table: (_node, mode) => ({ block: true, childMode: mode }),
  tableRow: (_node, mode) => ({ block: true, childMode: mode, prefix: mode === 'keep' ? '| ' : '' }),
  tableCell: (_node, mode) => ({ block: mode !== 'keep', suffix: mode === 'keep' ? ' | ' : '' }),
  footnoteDefinition: (node, mode) => ({ block: true, prefix: mode === 'keep' ? `[^${node.identifier}]: ` : '' }),
  code: (node, mode) => ({
    text: true,
    block: true,
    prefix: mode === 'keep' ? '```' + (node.lang || '') + '\n' : '',
    suffix: mode === 'keep' ? '\n```' : '',
  }),
  inlineCode: (_node, mode) => ({ text: true, ...wrap('`', '`')(null, mode) }),
  html: literal,
  image,
  imageReference: image,
  definition: (node, mode) => ({
    block: true,
    generated: mode === 'keep' ? `[${node.identifier}]: ${node.url}` : node.url,
  }),
  thematicBreak: (_node, mode) => ({ block: true, generated: mode === 'keep' ? '---' : '' }),
  break: () => ({ generated: '\n' }),
  footnoteReference: (node, mode) => ({ generated: mode === 'keep' ? `[^${node.identifier}]` : node.identifier }),
  yaml: (_node, mode) => ({ text: true, block: true, ...wrap('---\n', '\n---')(null, mode) }),
  toml: (_node, mode) => ({ text: true, block: true, ...wrap('+++\n', '\n+++')(null, mode) }),
}

export { modeFor }
export default fmtNode
