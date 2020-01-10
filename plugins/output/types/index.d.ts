import nlp from 'compromise'

/**  **/
declare const nlpOutput: nlp.Plugin<
  {
    /** generate an md5 hash from the document+tags */
    hash(): any
    /** generate sanitized html from the document */
    html(segments?: any, options?: any): string
  },
  {}
>

export default nlpOutput
