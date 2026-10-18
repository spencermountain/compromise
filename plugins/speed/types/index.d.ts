/// <reference types="node" />

import type nlp from 'compromise'
import type { Lexicon, Net, ParsedMatch } from 'compromise/misc'
import type BaseView from 'compromise/view/one'
import type { createReadStream, PathLike } from 'node:fs'
import type { SpeedMethods as BrowserMethods } from './browser.js'

export type { KeyPressOptions } from './browser.js'

type View = ReturnType<typeof nlp>

type ReadStreamOptions = Exclude<Parameters<typeof createReadStream>[1], string | undefined>

/** File options, with optional suppression of collected matches. */
export type StreamFileOptions = BufferEncoding | (ReadStreamOptions & { collect?: boolean })

export interface WorkerPoolOptions {
  /** Maximum workers in this pool; defaults to at most four available CPUs. */
  workers?: number
  /** Local parsing threshold; defaults to 500000 cold, 64000 with a live pool. */
  minLength?: number
  /** Target characters per batch; complete sentences are never split. */
  batchSize?: number
}

type StreamResult = BaseView | void | null | false

/** Methods added to the nlp library, not to document Views. */
export interface SpeedMethods extends BrowserMethods {
  /** Read complete sentence batches and optionally collect filtered Views. */
  streamFile(
    path: PathLike,
    filter: (doc: View) => StreamResult | Promise<StreamResult>,
    options?: StreamFileOptions
  ): Promise<View>
  /** Yield parsed sentence batches with backpressure and no result collection. */
  streamFileIterator(path: PathLike, options?: StreamFileOptions): AsyncIterableIterator<View>
  /** Parse sentences in parallel and collect matches. */
  workerPool(text: string, match: string | Net | ParsedMatch, options?: WorkerPoolOptions): Promise<View>
  /** Terminate this library's pools and reject unfinished jobs. */
  closeWorkerPool(): Promise<void>
}

/** The callable compromise library after installing the complete speed plugin. */
export type SpeedNlp = Omit<typeof nlp, keyof SpeedMethods> & SpeedMethods & {
  <PluginTypes = {}>(text: string, lexicon?: Lexicon): View & PluginTypes
}

/** A speed plugin exposes methods through its lib property. */
export interface SpeedPlugin<Methods extends object = SpeedMethods> {
  lib: Methods
}

export const streamFile: SpeedPlugin<Pick<SpeedMethods, 'streamFile' | 'streamFileIterator'>>
export const workerPool: SpeedPlugin<Pick<SpeedMethods, 'workerPool' | 'closeWorkerPool'>>
export const keyPress: SpeedPlugin<Pick<SpeedMethods, 'keyPress'>>
/** Installs nlp.lazy(). */
export const lazyParse: SpeedPlugin<Pick<SpeedMethods, 'lazy'>>

declare const nlpSpeed: SpeedPlugin & { version: string }
export default nlpSpeed
