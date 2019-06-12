declare class Doc {
    /** run part-of-speech tagger on all results
     */
    tagger(): void;
    /** pool is stored on phrase objects
     */
    pool(): void;
    /** return the previous result
     */
    parent(): void;
    /**  return a list of all previous results
     */
    parents(): void;
    /** return the root, first document
     */
    all(): void;
    /** create a new Document object
     */
    buildFrom(): void;
}

/** POS-tag all terms in this document
 */
declare function tagger(): void;

declare class Pool {
    /** throw a new term object in
     */
    add(): void;
    /** find a term by it's id
     */
    get(): void;
    /** helper method
     */
    stats(): void;
    /** make a deep-copy of all terms
     */
    clone(): void;
}

/** turn a string into an array of Phrase objects
 */
declare function build(): void;

declare class World {
    /** more logs for debugging
     */
    verbose(): void;
    /** augment our lingustic data with new data
     */
    plugin(): void;
    /** helper method for logging + debugging
     */
    stats(): void;
    /** produce a deep-copy of all lingustic data
     */
    clone(): void;
}

