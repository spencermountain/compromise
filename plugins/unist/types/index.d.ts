import nlp from 'compromise'

type Point = { line: number; column: number; offset: number }
type Position = { start: Point; end: Point }
type Options = { tags?: boolean; positions?: boolean }
type ImportOptions = { tags?: boolean }
// Structural input also accepts trees from other NLCST producers.
type AstNode = { type: string; children?: AstNode[]; value?: string; data?: object; position?: object }
type Data = { compromise: { tags: string[] } }
type LiteralType = 'TextNode' | 'WhiteSpaceNode' | 'PunctuationNode' | 'SymbolNode' | 'SourceNode'
type Literal<T extends LiteralType = LiteralType> = { type: T; value: string; position?: Position }
type Word = {
  type: 'WordNode'
  children: Literal<Exclude<LiteralType, 'WhiteSpaceNode'>>[]
  data?: Data
  position?: Position
}
type Sentence = {
  type: 'SentenceNode'
  children: (Word | Literal<Exclude<LiteralType, 'TextNode'>>)[]
  position?: Position
}
type Paragraph = {
  type: 'ParagraphNode'
  children: (Sentence | Literal<'WhiteSpaceNode' | 'SourceNode'>)[]
  position?: Position
}
type Root = { type: 'RootNode'; children: Paragraph[]; position?: Position }

interface UnistMethods {
  toAst(options?: Options): Root
}

type UnistDocument = ReturnType<typeof nlp> & UnistMethods
interface UnistLib {
  fromAst(tree: AstNode, options?: ImportOptions): UnistDocument
}
type UnistNlp = typeof nlp & UnistLib

declare const plugin: nlp.TypedPlugin<UnistMethods> & { version: string; lib: UnistLib }

export {
  Point,
  Position,
  Options,
  ImportOptions,
  AstNode,
  Data,
  Literal,
  Word,
  Sentence,
  Paragraph,
  Root,
  UnistMethods,
  UnistDocument,
  UnistLib,
  UnistNlp,
}
export default plugin
