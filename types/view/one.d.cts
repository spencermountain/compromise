// Share the ESM declarations through a type-only CommonJS entry point.
export type * from './one.d.ts' with { 'resolution-mode': 'import' }
export type { default } from './one.d.ts' with { 'resolution-mode': 'import' }
