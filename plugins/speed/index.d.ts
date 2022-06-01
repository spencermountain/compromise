import nlp from 'compromise'
type View = ReturnType<typeof nlp>

export interface SpeedMethods {
  /** parse sentences of a text in parallel */
  workerPool(text: string, match: any): View
  /** parse text without loading in memory */
  streamFile(file: string, filter: () => {}): Promise<View>;
  /** cache pre-parsed text */
  keyPress(text: string): View
}

/** extended compromise lib **/
declare const nlpSpeed: nlp.TypedPlugin<SpeedMethods>

export default nlpSpeed

