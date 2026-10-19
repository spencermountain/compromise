import type * as types from './index.js'

declare const plugin: typeof types.default

declare namespace plugin {
  export type Point = types.Point
  export type Position = types.Position
  export type Data = types.Data
  export type Literal<T extends types.Literal['type'] = types.Literal['type']> = types.Literal<T>
  export type Word = types.Word
  export type Sentence = types.Sentence
  export type Paragraph = types.Paragraph
  export type Root = types.Root
  export type Options = types.Options
  export type UnistMethods = types.UnistMethods
  export type AstNode = types.AstNode
  export type ImportOptions = types.ImportOptions
  export type UnistDocument = types.UnistDocument
  export type UnistLib = types.UnistLib
  export type UnistNlp = types.UnistNlp
}

export = plugin
