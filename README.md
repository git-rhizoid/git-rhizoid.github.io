# git-rhizoid.github.io

The design log and progress record for [Rhizoid](https://github.com/git-rhizoid/rhizoid): fork,
own, and sync git dependencies instead of relying on a package manager. Kept the same way as its
own content, not as prose notes - concepts, decisions, and open items are rows, rendered to a
Markdown site, published here at the org's own root URL.

- **Read it:** https://git-rhizoid.github.io/
- **The project itself:** [git-rhizoid/rhizoid](https://github.com/git-rhizoid/rhizoid)
- **Working on this repo:** read [`AGENTS.md`](AGENTS.md), run `make setup`, then `make verify`.

## What's here
- [`docs/concepts.md`](docs/concepts.md) - the core ideas (rhizoid-cutting, the additive-file-structure
  guarantee, the tracking/patch branch split, clean patches back upstream).
- [`docs/session_log.md`](docs/session_log.md) - one entry per significant decision: what was done,
  what was considered, what was rejected and why.
- [`docs/backlog.md`](docs/backlog.md) - open items, tracked as data rather than as issues or prose.
- [`docs/sources.md`](docs/sources.md) - what was actually researched before any of this was built.

The data is kept as plain JSON lines in `data/`, its tables declared in `tables.toml`, and checked, kept
canonical and rendered by [tad](https://github.com/creation-guidelines/tad-engine), a released Rust tool.

## Status
No license has been chosen.
