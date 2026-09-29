import type * as esmPlugin from './index.d.ts' with { 'resolution-mode': 'import' }
import type * as types from './index.d.ts' with { 'resolution-mode': 'import' }

declare const plugin: typeof esmPlugin
declare namespace plugin {
  export type StreamFileOptions = types.StreamFileOptions
  export type KeyPressOptions = types.KeyPressOptions
  export type SpeedMethods = types.SpeedMethods
  export type SpeedNlp = types.SpeedNlp
  export type SpeedPlugin<Methods extends object = SpeedMethods> = types.SpeedPlugin<Methods>
}

export = plugin
