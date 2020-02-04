import nlp from 'compromise'

/**  **/
declare const nlpScan: nlp.Plugin<
  {
    /** */
    buildTrie(options?: any): any
    /** */
    scan(index?: number): any
  },
  {}
>

export default nlpScan
