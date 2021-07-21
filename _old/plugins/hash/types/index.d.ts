import nlp from 'compromise'

/**  **/
declare const nlpOutput: nlp.Plugin<
  {
    /** generate an md5 hash from the document+tags */
    hash(): string
    /** compare two documents by their hashes */
    isEqual(): Boolean
  },
  {}
>

export default nlpOutput
