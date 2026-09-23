<!-- Generated from data/ by .tad/tools/render.py. Do not edit by hand. -->

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
: Command surface and manifest shape are now designed (see session_log: design-v1-command-surface, and concepts: rhizoid-command-surface, module-metadata-file). Nothing is implemented in git-rhizoid/rhizoid yet - src/main.rs is still a placeholder.

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
: open

Note
: check() validates the on-disk state before new SQL runs, so wiping every row in a table (to clear example content, say) leaves no way back through dc.py sql alone - the empty state always fails column-has-no-data ahead of the very INSERT that would fix it. Worked around once by seeding directly via DuckDB; the real fix is probably running check() after the SQL too, or making it tolerant of a table that is empty on both sides.

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
