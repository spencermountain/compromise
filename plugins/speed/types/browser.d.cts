import type * as esmPlugin from './browser.d.ts' with { 'resolution-mode': 'import' }
import type * as types from './browser.d.ts' with { 'resolution-mode': 'import' }

declare const plugin: typeof esmPlugin
declare namespace plugin {
  export type KeyPressOptions = types.KeyPressOptions
  export type SpeedMethods = types.SpeedMethods
  export type SpeedNlp = types.SpeedNlp
  export type SpeedPlugin<Methods extends object = SpeedMethods> = types.SpeedPlugin<Methods>
}

export = plugin
