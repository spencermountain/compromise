import type nlp from 'compromise'
import type { Plugin } from 'compromise/misc'

export type MarkdownMode = 'skip' | 'keep' | 'inline' | boolean

export interface MarkdownOptions {
  texts?: MarkdownMode
  roots?: MarkdownMode
  paragraphs?: MarkdownMode
  headings?: MarkdownMode
  strongs?: MarkdownMode
  emphases?: MarkdownMode
  deletions?: MarkdownMode
  links?: MarkdownMode
  /** Overrides links for autolinks identified by parser positions. */
  autolinks?: MarkdownMode
  blockquotes?: MarkdownMode
  lists?: MarkdownMode
  listItems?: MarkdownMode
  /** Overrides the item mode for checked and unchecked tasks. */
  taskLists?: MarkdownMode
  tables?: MarkdownMode
  tableRows?: MarkdownMode
  tableCells?: MarkdownMode
  codeBlocks?: MarkdownMode
  inlineCode?: MarkdownMode
  htmlBlocks?: MarkdownMode
  images?: MarkdownMode
  definitions?: MarkdownMode
  thematicBreaks?: MarkdownMode
  breaks?: MarkdownMode
  /** Fallback for both footnote options below. */
  footnotes?: MarkdownMode
  footnoteDefinitions?: MarkdownMode
  footnoteReferences?: MarkdownMode
  /** Fallback for YAML and TOML modes. */
  frontmatter?: MarkdownMode
  yamlBlocks?: MarkdownMode
  tomlBlocks?: MarkdownMode
}

/** Structural mdast input; unsupported node types are rejected at runtime. */
export interface MarkdownNode {
  type: string
  value?: string
  children?: MarkdownNode[]
  depth?: number
  url?: string
  title?: string | null
  alt?: string | null
  identifier?: string
  label?: string | null
  checked?: boolean | null
  ordered?: boolean | null
  start?: number | null
  spread?: boolean | null
  referenceType?: 'shortcut' | 'collapsed' | 'full'
  lang?: string | null
  meta?: string | null
  align?: Array<'left' | 'right' | 'center' | null> | null
  data?: object
  position?: {
    start: { line: number; column: number; offset?: number }
    end: { line: number; column: number; offset?: number }
  }
}

export interface MarkdownMethods {
  /** Apply supported edits atomically; throws when ownership is ambiguous. */
  updateTree(): this
  /** Serialize the last successfully updated tree, including skipped content. */
  markdown(): string
}

export type MarkdownDocument = ReturnType<typeof nlp> & MarkdownMethods

export interface MarkdownLib {
  fromMarkdown(text: string, options?: MarkdownOptions): MarkdownDocument
  /** Connect to caller-owned mdast nodes. No custom parser is invoked. */
  fromAst(tree: MarkdownNode, options?: MarkdownOptions): MarkdownDocument
}

/** Use the result of nlp.plugin(markdown) as this type after registration. */
export type MarkdownNlp = typeof nlp & MarkdownLib

declare const markdown: Plugin & { version: string; lib: MarkdownLib }
export default markdown
