import type esmPlugin from './index.d.ts' with { 'resolution-mode': 'import' }
import type * as types from './index.d.ts' with { 'resolution-mode': 'import' }

declare const plugin: typeof esmPlugin
declare namespace plugin {
  export type HtmlOptions = types.HtmlOptions
  export type HtmlNode = types.HtmlNode
  export type HtmlMethods = types.HtmlMethods
  export type HtmlDocument = types.HtmlDocument
  export type HtmlLib = types.HtmlLib
  export type HtmlNlp = types.HtmlNlp
}

export = plugin
