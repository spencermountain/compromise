import nlp = require('compromise')
import plugin = require('compromise-unist')

const extended: plugin.UnistNlp = nlp.plugin(plugin)
const tree: plugin.Root = extended('Hello world!').toAst()
extended.fromAst(tree).match('world').clone().toAst()
extended('Dogs run.').nouns().toPlural().toAst()
const point: plugin.Point = { line: 1, column: 1, offset: 0 }
const position: plugin.Position = { start: point, end: point }
const data: plugin.Data = { compromise: { tags: ['Noun'] } }
const literal: plugin.Literal<'TextNode'> = { type: 'TextNode', value: 'Hello', position }
const word: plugin.Word = { type: 'WordNode', children: [literal], data }
const sentence: plugin.Sentence = { type: 'SentenceNode', children: [word] }
const paragraph: plugin.Paragraph = { type: 'ParagraphNode', children: [sentence] }
const input: plugin.AstNode = { type: 'RootNode', children: [paragraph] }
const options: plugin.Options = { tags: true, positions: false }
const importOptions: plugin.ImportOptions = { tags: false }
const doc: plugin.UnistDocument = extended.fromAst(input, importOptions)
const methods: plugin.UnistMethods = doc
const lib: plugin.UnistLib = extended
methods.toAst(options)
lib.fromAst(input)
// @ts-expect-error No runtime methods property.
plugin.methods.toAst()
// @ts-expect-error Whitespace cannot appear directly inside a WordNode.
const invalidWord: plugin.Word = { type: 'WordNode', children: [{ type: 'WhiteSpaceNode', value: ' ' }] }
