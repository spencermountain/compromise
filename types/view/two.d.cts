// Share the ESM declarations through a type-only CommonJS entry point.
export type * from './two.d.ts' with { 'resolution-mode': 'import' }
export type { default } from './two.d.ts' with { 'resolution-mode': 'import' }
