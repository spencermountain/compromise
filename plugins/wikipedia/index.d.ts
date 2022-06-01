import nlp from 'compromise'
type View = ReturnType<typeof nlp>

export interface WikiMethods {
  /** phrases that match wikipedia titles */
  wikipedia(): View
}

/** extended compromise lib **/
declare const nlpWiki: nlp.TypedPlugin<WikiMethods>

export default nlpWiki
