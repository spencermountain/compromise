import nlp from 'compromise'

/**  **/
declare const nlpOutput: nlp.Plugin<
  {
    /** generate sanitized html from the document */
    html(segments?: any, options?: any): string
  },
  {}
>

export default nlpOutput
