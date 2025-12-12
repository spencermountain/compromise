/* eslint-disable */
import nlp from '../../../src/three.js'
import plg from './src/plugin.js'
nlp.plugin(plg)

let md = `is this [working](http://noitsnot.com) *again*? nope.

## oh yeah

and this is too
--
and **this** will be another section. i guess. \`inline stuff\` 

\`\`\`
block stuff
\`\`\`
afterwards

> Alpha bravo charlie.

and then a cool:
* list 1
* list 2
* list 3

hello ![alpha](https://example.com/favicon.ico "bravo") world

`



md = `| cool | also | here  |   |   |
|------|------|-------|---|---|
| one  | two  | three |   |   |
| four | five |       |   |   |
|      |      |       |   |   |`

md = `ok **cool** after.

below`
const doc = nlp.fromMarkdown(md)
console.log(doc)