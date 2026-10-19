import type * as types from './index.js'

declare const plugin: typeof types.default

declare namespace plugin {
  export type Root = types.Root
  export type Options = types.Options
  export type UnistMethods = types.UnistMethods
}

export = plugin
