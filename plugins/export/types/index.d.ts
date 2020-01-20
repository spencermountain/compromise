import nlp from 'compromise'

/**  **/
declare const nlpExport: nlp.Plugin<
  {
    /** serialize and compress a document */
    export(options?: any): any

    /** re-create a document object from the results of .export() */
    import(options?: any): any
  },
  {}
>

export default nlpExport
