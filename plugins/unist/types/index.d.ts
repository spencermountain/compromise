import nlp from 'compromise'

type Point = { line: number, column: number, offset: number }
type Position = { start: Point, end: Point }
type Options = { tags?: boolean, positions?: boolean }
type Data = { compromise: { tags: string[] } }
type LiteralType = 'TextNode' | 'WhiteSpaceNode' | 'PunctuationNode' | 'SymbolNode' | 'SourceNode'
type Literal<T extends LiteralType = LiteralType> = { type: T, value: string, position?: Position }
type Word = { type: 'WordNode', children: Literal<Exclude<LiteralType, 'WhiteSpaceNode'>>[], data?: Data, position?: Position }
type Sentence = { type: 'SentenceNode', children: (Word | Literal<Exclude<LiteralType, 'TextNode'>>)[], position?: Position }
type Paragraph = { type: 'ParagraphNode', children: (Sentence | Literal<'WhiteSpaceNode' | 'SourceNode'>)[], position?: Position }
type Root = { type: 'RootNode', children: Paragraph[], position?: Position }

interface UnistMethods {
  toAst(options?: Options): Root
}

declare const plugin: nlp.TypedPlugin<UnistMethods> & { version: string }

export { Point, Position, Options, Data, Literal, Word, Sentence, Paragraph, Root, UnistMethods }
export default plugin
