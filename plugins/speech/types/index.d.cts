import type esmPlugin from './index' with { 'resolution-mode': 'import' }
import type * as types from './index' with { 'resolution-mode': 'import' }

declare const plugin: typeof esmPlugin
declare namespace plugin {
  export type SpeechMethods = types.SpeechMethods
}

export = plugin
