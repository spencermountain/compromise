import nlp from 'compromise'
type View = ReturnType<typeof nlp>


export interface FreezeMethods {
  /** list all repeating sub-phrases, by word-count*/
  freeze(obj?: object): View
}


interface FreezeView extends View {
   /** prevent any further destructive tagging */
   freeze(fmt: string): View
}

/** extended compromise lib **/
declare const nlpFreeze: nlp.TypedPlugin<FreezeMethods>

export default nlpFreeze
