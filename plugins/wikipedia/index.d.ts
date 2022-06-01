import nlp from 'compromise'

export interface WikiMethods {
  /**  */
  wikipedia(): View

}

/** extended compromise lib **/
declare const nlpWiki: nlp.TypedPlugin<WikiMethods>

export default nlpWiki
