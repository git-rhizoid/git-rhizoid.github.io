# AGENTS.md - how to work in this repository

This repo is a small versioned "database" kept as plain files. The data lives as JSON lines, its tables
declared in `tables.toml`; [tad](https://github.com/creation-guidelines/tad-engine), a released Rust tool,
checks it, keeps it canonical and renders it, and CI enforces that it stays so. **Work on the content.**

## Setup (once per session)
```
make setup    # installs tad, the data engine, from its pinned release (its checksum checked)
make verify   # exactly what CI runs
```

## Layout
| Path | What | Who writes it |
|---|---|---|
| `tables.toml` | every table declared as data - fields, types, allowed values, patterns - and the rules across tables | you, by hand (see below) |
| `data/<table>.json` | one JSON object per line (JSONL despite the extension) | `tad` only |
| `docs/*.md` | rendered pages, published to GitHub Pages | `make render` only |

## Rules
1. **Never hand-edit `data/*.json` or anything in `docs/`.** Change a row with `tad set`: it checks the whole repository and keeps nothing that breaks a rule. Then `make render`.
2. **Always finish with `make verify`**: tad must write the final bytes (`tad canon`), or CI fails on a non-canonical diff.
3. **Integrity lives in `tables.toml`**: ids unique across tables (`unique_ids`), both ends of a relation existing (`references`), everything cited (`appears_in`). `tad check` runs every rule.
4. **Commits follow Conventional Commits** and are linted on the PR; see [`CONTRIBUTING.md`](CONTRIBUTING.md) for the type/scope convention this repo uses and why it matters (it drives the automated release and changelog).
5. **New or changed factual claims need a source**, if your schema has a sources-like table (columns `title`, `url`); tad renders the citations by detecting that shape.

## Recipes
Add or change content:
```
tad set concepts --key id --set "name=Name" --set "statement=One-line statement."
tad set concepts --key example-one --set "statement=..."
make render && make verify
```
A new field: declare it in `tables.toml` (a `[[tables.<table>.fields]]` entry with its `name` and `type`, and `required`, `enum` or `pattern` if it has them), then `make canon`: every line gains the field, empty. A required field is then given a value on every row with `tad set` before `make verify` passes.

Rename a field: `mlr -I --ijsonl --ojsonl rename old,new data/<table>.json`, make the same change in `tables.toml`, then `make canon` (forgetting the declaration is caught by `make check`).

## Why it is built this way
- The data is plain text in git: one JSON object per line, so a change to one row is a one-line diff, readable without any tool.
- `tables.toml` declares the tables as data (after Frictionless Data's Table Schema): a person reads it, and [tad](https://github.com/creation-guidelines/tad-engine) checks every row and every rule across tables against it.
- The renderer is schema-agnostic: it detects shapes (a relation table, a sources table, a status grid) structurally, not by name, so a new table needs no configuration.
- tad replaced a vendored Python engine (DuckDB) on 2026-11-11, after giving the same verdicts, the same canonical bytes and the same documents on this repository and three others.
