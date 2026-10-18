import type esmPlugin from './index.d.ts' with { 'resolution-mode': 'import' }
import type * as types from './index.d.ts' with { 'resolution-mode': 'import' }

declare const plugin: typeof esmPlugin
declare namespace plugin {
  export type DateOptions = types.DateOptions
  export type dateOptions = types.dateOptions
  export type DateJSON = types.DateJSON
  export type TimeJSON = types.TimeJSON
  export type DurationJSON = types.DurationJSON
  export type DatesMethods = types.DatesMethods
}

export = plugin
