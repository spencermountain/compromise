import nlp from 'compromise'
import plugin, { type UnistNlp, type Root, type Word, type Literal } from 'compromise-unist'
import { ParseEnglish } from 'parse-english'
import { toString } from 'nlcst-to-string'

const extended: UnistNlp = nlp.plugin(plugin)
const tree: Root = extended('Hello world!').toAst()
extended('Dogs run.').match('#Noun').clone().toAst({ tags: false })
extended('Dogs run.').nouns().toPlural().toAst()
extended('Dogs run.').verbs().toPastTense().toAst()
extended('Hello world!').forEach(view => view.match('hello').toAst())
extended('Hello world!').find(view => view.has('hello'))?.toAst()
extended.tokenize('Hello').toAst()
extended.fromAst(tree).match('hello').terms().toAst()
extended.fromAst(new ParseEnglish().parse('Hello')).toAst()
toString(tree)
const literal: Literal<'TextNode'> = { type: 'TextNode', value: 'Hello' }
const word: Word = { type: 'WordNode', children: [literal] }
toString(word)

// @ts-expect-error Plugin has no runtime methods property.
plugin.methods.toAst()
// @ts-expect-error Tags options must be boolean.
extended('Hello').toAst({ tags: 'yes' })
// @ts-expect-error Import options do not include positions.
extended.fromAst(tree, { positions: false })
// @ts-expect-error Text output is still a string, not a document.
extended('Hello').text().toAst()
// @ts-expect-error Match still requires a valid argument type.
extended('Hello').match(42)
