import nlp from 'compromise'
type View = ReturnType<typeof nlp>

interface ParagraphView extends View {
}

export interface ParagraphMethods {
  /**  */
  paragraphs(): ParagraphView
}

/** extended compromise lib **/
declare const nlpParagraphs: nlp.TypedPlugin<ParagraphMethods>

export default nlpParagraphs
