import nlp from 'compromise'

/**  **/
declare const nlpExport: nlp.Plugin<
  {
    /** serialize and compress the document */
    export(options?: any): any
  },
  {}
>

export default nlpExport
