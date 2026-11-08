import type esmPlugin from './index.d.ts' with { 'resolution-mode': 'import' }
import type * as types from './index.d.ts' with { 'resolution-mode': 'import' }

declare const plugin: typeof esmPlugin
declare namespace plugin {
  export type MarkdownMode = types.MarkdownMode
  export type MarkdownOptions = types.MarkdownOptions
  export type MarkdownNode = types.MarkdownNode
  export type MarkdownMethods = types.MarkdownMethods
  export type MarkdownDocument = types.MarkdownDocument
  export type MarkdownLib = types.MarkdownLib
  export type MarkdownNlp = types.MarkdownNlp
}

export = plugin
