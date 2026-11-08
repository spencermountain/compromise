import type esmPlugin from './index.d.ts' with { 'resolution-mode': 'import' }
import type * as types from './index.d.ts' with { 'resolution-mode': 'import' }

declare const plugin: typeof esmPlugin
declare namespace plugin {
  export type SubtitleMethods = types.SubtitleMethods
  export type SubtitleDoc = types.SubtitleDoc
  export type SubtitleLib = types.SubtitleLib
  export type SubtitleNlp = types.SubtitleNlp
}

export = plugin
