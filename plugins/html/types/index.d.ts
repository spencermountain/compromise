import type nlp from 'compromise'
import type { Plugin } from 'compromise/misc'

export interface HtmlOptions {
  /** Defaults to true; use false to parse a complete HTML document. */
  fragment?: boolean
}

/** Structural HAST input, compatible with trees from hast-util-from-html. */
export interface HtmlNode {
  type: string
  value?: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: HtmlNode[]
  /** Template contents are preserved but excluded from linguistic text. */
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
  html(): string
}

export type HtmlDocument = ReturnType<typeof nlp> & HtmlMethods

export interface HtmlLib {
  fromHtml(text: string, options?: HtmlOptions): HtmlDocument
  /** Connect directly to caller-owned HAST nodes. */
  fromHast(tree: HtmlNode): HtmlDocument
}

/** Use the result of nlp.plugin(html) as this type after registration. */
export type HtmlNlp = typeof nlp & HtmlLib

declare const html: Plugin & { version: string; lib: HtmlLib }
export default html
