# Development
The project is a pnpm workspace
* The seven maintained packages in `plugins/*` are workspace members; 
* Each maintained plugin declares `compromise: "workspace:*"` as a peer dependency.

## Commands
* `pnpm test` - Root source tests
* `pnpm testb` - Root build tests (build first)
* `pnpm build` - Root library
* `pnpm lint` - Root source lint
* `pnpm test:plugins` - Each plugin's source tests, in its own process
* `pnpm testb:plugins` - Each plugin's source tests, in its own process
* `pnpm build:plugins` - All maintained plugins
* `pnpm test:types` - Root TypeScript declarations
* `pnpm bench --no-save` - Run benchmarks and compare against saved history without saving a result |

For one plugin, use `pnpm --filter compromise-dates test` or
`pnpm --filter compromise-dates build`.
