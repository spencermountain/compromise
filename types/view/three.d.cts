// Share the ESM declarations through a type-only CommonJS entry point.
export type * from './three.d.ts' with { 'resolution-mode': 'import' }
export type { default } from './three.d.ts' with { 'resolution-mode': 'import' }
