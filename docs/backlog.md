<!-- Generated from data/ by tad. Do not edit by hand. -->

# Backlog

<a id="design-consumption-side"></a>
### Design the consumption-side manifest

Status
: open

Note
: How a repo declares "I depend on this org's fork of X at version Y" and pulls it in - deliberately not designed yet, kept separate from the fork-management side.

Opened
: 2026-09-22


<a id="implement-cli"></a>
### Implement the actual rhizoid CLI

Status
: open

Note
: Boundary layer implemented: manifest infra, 7 argenv-typed commands, 39 tests, real CI including MSRV all green (see implement-boundary-layer). init and remove fully work; add/import/update/status/refresh are typed and tested but stubbed, waiting on the GitHubPort adapter. Parked 2026-11-11: tad's duties move into ocoeco; this returns there, or with the first cutting.

Opened
: 2026-09-22


<a id="verify-pages-root"></a>
### Verify Pages serves at the org root

Status
: done

Note
: git-rhizoid.github.io should serve at https://git-rhizoid.github.io/ once Pages is enabled here, since the repo name matches the org.github.io convention - not yet confirmed live.

Opened
: 2026-09-22


<a id="decide-dot-github-repo"></a>
### Decide whether a separate git-rhizoid/.github repo is worth adding

Status
: open

Note
: For org-wide issue/PR template defaults - a different, smaller thing than this repo, and not yet built.

Opened
: 2026-09-22


<a id="dc-check-blocks-empty-recovery"></a>
### dc.py check() blocks recovering from an all-empty table

Status
: done

Note
: Gone with the switch to tad in Rust (2026-11-11): tad has no rule that every field must appear on some line, so an empty table checks out and canon keeps it - tried on a copy.

Opened
: 2026-09-22


<a id="tui-for-rhizoid"></a>
### Add a TUI for Rhizoid

Status
: open

Note
: Explicitly a later phase, after the CLI (init/add/import/update/status/refresh/remove) is working - not designed at all yet.

Opened
: 2026-09-22


<a id="rhizcut"></a>
### rhizcut: the tool that takes a cutting

Status
: open

Note
: Named by the milestone rhizoid-carries-ocoeco's criteria but never recorded: found 2026-11-12 when ocoeco check followed every link. The milestone is right to depend on it.

Opened
: 2026-11-12
