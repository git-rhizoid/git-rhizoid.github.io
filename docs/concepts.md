<!-- Generated from data/ by .tad/tools/render.py. Do not edit by hand. -->

# Concepts

<a id="rhizoid-cutting"></a>
### Rhizoid-cutting (rhizcut)

Statement
: A single dependency managed by Rhizoid: a real GitHub fork of an upstream repo, owned and pinned rather than referenced remotely. Named after a horticultural cutting - a piece taken from a parent plant and rooted separately, genetically identical at the start but independent from then on.

Tags
: naming

Relations
: ← concerns: [Additive-only file structure](concepts.md#additive-file-structure) — the property that makes a rhizoid-cutting update conflict-free

Sources
: [Go Modules Reference](https://go.dev/ref/mod), [git-vendor (thejoshwolfe)](https://github.com/thejoshwolfe/git-vendor)


<a id="additive-file-structure"></a>
### Additive-only file structure

Statement
: Rhizoid-managed metadata (manifest, sync state) is added as new files alongside upstream's own, never edited in place inside upstream's existing files. This keeps a pull from upstream conflict-free for the tracked branch - not a guarantee that any patch to upstream code stays conflict-free, only that Rhizoid's own bookkeeping never collides with it.

Tags
: design

Relations
: → concerns: [Rhizoid-cutting (rhizcut)](concepts.md#rhizoid-cutting) — the property that makes a rhizoid-cutting update conflict-free
: ← pairs-with: [Tracking branch vs patch branch](concepts.md#tracking-vs-patch-branch) — together they define what "conflict-free" actually means here

Sources
: [wei/pull](https://github.com/wei/pull), [Sync a fork - REST API](https://docs.github.com/rest/branches/branches#sync-a-fork-branch-with-the-upstream-repository)


<a id="tracking-vs-patch-branch"></a>
### Tracking branch vs patch branch

Statement
: The branch that mirrors upstream is never hand-edited - only fast-forwarded via merge-upstream. All customization lives on a separate branch that merges from the tracking branch. The tracking branch never conflicts; the patch branch might, exactly once, when upstream touches a line you also patched - that is inherent to patching, not a tooling failure.

Tags
: design

Relations
: → pairs-with: [Additive-only file structure](concepts.md#additive-file-structure) — together they define what "conflict-free" actually means here
: ← concerns: [Clean patch back upstream](concepts.md#clean-patch-back) — a clean patch is only possible because the tracking branch stays pristine


<a id="clean-patch-back"></a>
### Clean patch back upstream

Statement
: Because Rhizoid's own metadata never touches upstream's files, a diff of the patch branch against the pristine tracking branch is a clean patch, submittable as a normal PR to the original repo, whether or not its owner has ever heard of Rhizoid.

Tags
: design

Relations
: → concerns: [Tracking branch vs patch branch](concepts.md#tracking-vs-patch-branch) — a clean patch is only possible because the tracking branch stays pristine

Sources
: [To Fork or Not to Fork](https://www.kusari.dev/blog/to-fork-or-not-to-fork)
