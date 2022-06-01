import nlp from 'compromise'

export interface SpeedMethods {
  /**  */
  syllables(): String[][]

}

/** extended compromise lib **/
declare const nlpSpeed: nlp.TypedPlugin<SpeedMethods>

export default nlpSpeed
