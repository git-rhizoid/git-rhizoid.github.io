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
: in-progress

Note
: Boundary layer implemented: manifest infra, 7 argenv-typed commands, 39 tests, real CI including MSRV all green (see implement-boundary-layer). init and remove fully work; add/import/update/status/refresh are typed and tested but stubbed, waiting on the GitHubPort adapter. Parked 2026-11-11: tad's duties move into ocoeco; this returns there, or with the first cutting. Reshaped 2026-11-18 (docs research base-graph-measured, base-graph-world; decision 2026-11-18-device-layer-from-docs; upstream item rhizoid-scope-every-edge (linux-phone-oco/docs)): rhizoid's scope is the follow tool for every edge (slice, tool pin, cutting), built in order status-over-every-edge, follow-by-conformance, send-back, cuttings; each replaces shell only once it passes the shell's tests. Unparking implement-cli waits on the author's word. Unparked 2026-11-18, the author said: 'yes, if its the best we came up with, grounded in our extensive research and consideration, which it seems it did, so yes' (through the Top Coordinator, 2026-11-18; docs session-log 2026-11-18-author-yes-device-layer-and-rhizoid): git-rhizoid has the research's scope and order - status-over-every-edge, follow-by-conformance, send-back-writes-the-upstream-item, then cuttings - each replacing shell only once it passes the shell's tests. Owner: git-rhizoid-builder. This item is the umbrella; its first step is status-over-every-edge.

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

Rank
: 6


<a id="slice-consumption"></a>
### Consumption mode for a slice: take a named list of files from a pinned release of a repository into one that has its own files

Status
: open

Note
: Found 2026-11-17 by grenudi/ideal-knowledge-base (research chain-follow-world, decision 2026-11-17-chain-follow-by-slice). Its chain - idealkb to device-template to device bases - lays a slice, not a repository: a source names what it gives (a generic list, files whole or the part between two marker lines), a follower pins a release and names its own files, and the verdict says whether the follower changed a generic file (idealkb's bin/follow.sh ends 3). rhizoid today takes a whole fork (a cutting); this is the consumption side design-consumption-side leaves open. follow.sh and update-pins.sh are the prototype; when rhizoid has it, idealkb can hand its chain over. Also lacking for that chain: the pin read from the follower's own file, a release gate (every follower answers before a release is tagged), and sending a changed generic file back as a patch. Also 2026-11-17: the tools home (linux-phone-oco/lab-tools) has the same slice case for the device-template files that go with a tool - the [boot] manifest skeleton, hook examples, an initramfs skeleton - beside the tool's own version pin (see cutting-as-cargo-dependency, followers-one-pin-bump). Reshaped 2026-11-18 (docs research base-graph-measured, base-graph-world; decision 2026-11-18-device-layer-from-docs; upstream item rhizoid-scope-every-edge (linux-phone-oco/docs)): rhizoid's scope is the follow tool for every edge (slice, tool pin, cutting), built in order status-over-every-edge, follow-by-conformance, send-back, cuttings; each replaces shell only once it passes the shell's tests. Unparking implement-cli waits on the author's word.

Opened
: 2026-11-17

Rank
: 3


<a id="cutting-as-cargo-dependency"></a>
### A cutting consumed by a language manager: the patched fork of a Rust tool as a cargo git dependency at a pinned tag, written and bumped by rhizoid

Status
: open

Note
: Found 2026-11-17 by linux-phone-oco/docs (research bringup-home-follow-and-rhizoid, decision 2026-11-17-bringup-in-lab-tools). A device repository uses lab-tools' bringup as a pinned binary or cargo git dependency; when it must patch the tool itself before upstream takes the change, the true case is a cutting of lab-tools (tracking branch pristine, patch branch merged from it, clean patch back). What rhizoid lacks is the consumption side for it: the follower declares this tool, this cutting, this tag, and rhizoid writes the pin where the language manager reads it (Cargo.toml git tag or [patch] entry; a rust-script file's cargo header; a version line in a manifest) and bumps it when the tracking branch has a new release - the open item design-consumption-side, for a case that now has a user. Until then: a plain fork and a [patch] line by hand, recorded as a problem.

Opened
: 2026-11-17

Rank
: 7


<a id="followers-one-pin-bump"></a>
### Many followers, one pin and one verdict: a slice, a cutting and a tool version bumped by the same weekly job

Status
: open

Note
: Found 2026-11-17 by linux-phone-oco/docs (same research). A device repository follows three sources - idealkb (a slice), device-template (a slice) and lab-tools (a tool version, maybe a cutting) - each with its own pin line, and today an updater (idealkb's update-pins.sh) only for the slices. Lacking: one pin file the follower owns (source, kind slice|cutting|tool, release), one command that bumps every pin to the newest release and opens a pull request per source, and one verdict (up to date, behind, own change to a generic file) that CI can gate on. update-pins.sh and follow.sh's exit 3 are the prototype; slice-consumption is the first kind. Reshaped 2026-11-18 (docs research base-graph-measured, base-graph-world; decision 2026-11-18-device-layer-from-docs; upstream item rhizoid-scope-every-edge (linux-phone-oco/docs)): rhizoid's scope is the follow tool for every edge (slice, tool pin, cutting), built in order status-over-every-edge, follow-by-conformance, send-back, cuttings; each replaces shell only once it passes the shell's tests. Unparking implement-cli waits on the author's word.

Opened
: 2026-11-17

Rank
: 4


<a id="send-back-writes-the-upstream-item"></a>
### Sending a change back: a patch to the source as a pull request, and the follower's own record of it

Status
: open

Note
: Found 2026-11-17 by linux-phone-oco/docs (same research). clean-patch-back says a diff of the patch branch against the pristine tracking branch is a clean patch; the CLI that makes it and opens the pull request is stubbed. The follower's bases keep an upstream item per change (idealkb: ikb upstream-item, form patch, draft, ready on the person's word, sent with the PR address, landed when released). Lacking: a rhizoid verb that, for a changed generic file or a patch branch, writes the patch, opens the pull request only after the person says ready, and returns the PR address and later the release that carried it, in a form the follower's record command takes - without rhizoid knowing that base's tables. It never sends in the person's name by itself. Reshaped 2026-11-18 (docs research base-graph-measured, base-graph-world; decision 2026-11-18-device-layer-from-docs; upstream item rhizoid-scope-every-edge (linux-phone-oco/docs)): rhizoid's scope is the follow tool for every edge (slice, tool pin, cutting), built in order status-over-every-edge, follow-by-conformance, send-back, cuttings; each replaces shell only once it passes the shell's tests. Unparking implement-cli waits on the author's word.

Opened
: 2026-11-17

Rank
: 5


<a id="status-over-every-edge"></a>
### rhizoid status: one read-only report over every edge a repository has - a slice (pin vs source release, followed files equal, own files on their way up), a tool pin (vs latest tag), a cutting (tracking vs upstream head) - exit 1 on drift

Status
: in-progress

Note
: Found 2026-11-18 by linux-phone-oco (docs research base-graph-measured, base-graph-world; decision 2026-11-18-device-layer-from-docs; upstream item rhizoid-scope-every-edge (linux-phone-oco/docs)). The first command to build: no risk, it replaces docs' graph-drift.sh (36 FAIL today) and passes it line for line. Edges are read from the pin files followers already own (idealkb.toml, devicebase.toml, lab.toml [tools], a fork's .rhizoid/module.toml), so the follower lists derive from the pins. Rust with argenv, the CLI's status command. Unparked 2026-11-18 (see implement-cli): first in the author's order. Built in rhizoid-cli: status reads a graph file of the edges and each follower's own pin files at origin/main, reports every edge current, behind or moved by hand, exits 1 on drift, and is proven by graph-drift.sh's cases as fixtures and by agreeing with graph-drift.sh run on the real graph.

Opened
: 2026-11-18

Rank
: 1


<a id="follow-by-conformance"></a>
### rhizoid follow lays a slice exactly as idealkb's bin/follow.sh does, proven by its fixtures, before update-pins calls it

Status
: open

Note
: Found 2026-11-18 by linux-phone-oco (docs research base-graph-measured, base-graph-world; decision 2026-11-18-device-layer-from-docs; upstream item rhizoid-scope-every-edge (linux-phone-oco/docs)). Passes grenudi/ideal-knowledge-base bin/test-follow.sh byte for byte and keeps three things its owner names: the pin names its source, one owner per file (check-one-owner), the followers' gate before a release (followers-answer.sh). Adds #! from = DIR/ and own needing an upstream item (idealkb items idealkb-slice-from-prefix, idealkb-own-needs-item) only after idealkb has them. Until it passes, the shell is the tool. Blocked by status-over-every-edge.

Opened
: 2026-11-18

Rank
: 2
