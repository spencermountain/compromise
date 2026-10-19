import type nlp from 'compromise'
import type { Plugin } from 'compromise/misc'

export interface HtmlOptions {
  /** Tag names include (true) or skip (false) their subtree; omitted tags use defaults. */
  [tagName: string]: boolean | undefined
  /** Defaults to true; use false to parse a complete HTML document. */
  fragment?: boolean
  /** Include alt attributes as separate prose blocks. Defaults to false. */
  altText?: boolean
  /** Include title attributes as separate prose blocks. Defaults to false. */
  titleAttribute?: boolean
  /** Include aria-label attributes as separate prose blocks. Defaults to false. */
  ariaLabel?: boolean
  /** Include placeholder attributes as separate prose blocks. Defaults to false. */
  placeholder?: boolean
  /** Include comments as separate prose blocks. Defaults to false. */
  comments?: boolean
}

export interface HtmlOutputOptions {
  /** Format a copy of the tree for output. Defaults to false. */
  format?: boolean
}

/** Structural HAST input, compatible with trees from hast-util-from-html. */
export interface HtmlNode {
  type: string
  value?: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: HtmlNode[]
  /** Template contents are preserved and excluded from linguistic text by default. */
  content?: HtmlNode
  data?: object
  position?: {
    start: { line: number; column: number; offset?: number }
    end: { line: number; column: number; offset?: number }
  }
}

export interface HtmlMethods {
  /** Apply supported edits atomically; throws when ownership is ambiguous. */
  updateHast(): this
  /** Serialize the last successfully updated tree, including skipped content. */
  toHtml(options?: HtmlOutputOptions): string
}

export type HtmlDocument = Omit<ReturnType<typeof nlp>, keyof HtmlMethods> & HtmlMethods

export interface HtmlLib {
  fromHtml(text: string, options?: HtmlOptions): HtmlDocument
  /** Connect directly to caller-owned HAST nodes. */
  fromHast(tree: HtmlNode, options?: HtmlOptions): HtmlDocument
}

/** Use the result of nlp.plugin(html) as this type after registration. */
export type HtmlNlp = typeof nlp & HtmlLib

declare const html: Plugin & { version: string; lib: HtmlLib }
export default html
