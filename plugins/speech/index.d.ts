import nlp from 'compromise'

export interface SpeechMethods {
  /** estimate spoken phenomes */
  syllables(): String[][]
  /** estimate pronounciation information */
  soundsLike(): String[][]
}

/** extended compromise lib **/
declare const nlpSpeech: nlp.TypedPlugin<SpeechMethods>

export default nlpSpeech
