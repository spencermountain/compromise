import nlp from 'compromise'
type View = ReturnType<typeof nlp>

type Payload = { match: View, val: any }

export interface PayloadMethods {
  /** return any data on our given matches */
  getPayloads(): Payload[]
  /** add data about our current matches */
  addPayload(input:any): View
  /** remove all payloads in match */
  clearPayloads(): View
}

/** extended compromise lib **/
declare const nlpPayload: nlp.TypedPlugin<PayloadMethods>

export default nlpPayload
