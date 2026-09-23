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
: ← concerns: [Adopt an existing fork vs create a new one](concepts.md#adopt-vs-create) — both add and import produce a rhizoid-cutting; they differ in whether a new fork is created

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
: ← concerns: [Status detects drift, not just reports the manifest](concepts.md#drift-detection) — drift detection is what notices when the additive structure itself has been touched or is missing

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


<a id="drift-detection"></a>
### Status detects drift, not just reports the manifest

Statement
: rhizoid status inspects the real state of every managed fork (does it exist, what commit is the tracking branch actually at, is there uncommitted or unmanifested structure) and diffs that against the manifest's record, the way terraform plan diffs real infrastructure against Terraform state. The manifest is a record of intent, not a source of truth Rhizoid trusts blindly - reality always wins the comparison.

Tags
: design

Relations
: → concerns: [Additive-only file structure](concepts.md#additive-file-structure) — drift detection is what notices when the additive structure itself has been touched or is missing
: ← pairs-with: [No central lockfile - state is distributed into each fork](concepts.md#distributed-state-no-lockfile) — status/refresh read the distributed state directly instead of a lockfile

Sources
: [Manage Resource Drift](https://developer.hashicorp.com/terraform/tutorials/state/resource-drift)


<a id="adopt-vs-create"></a>
### Adopt an existing fork vs create a new one

Statement
: Two different, deliberately separate operations: rhizoid add forks a new copy of upstream; rhizoid import points at a fork that already exists (with or without the rhizoid wrapper already on it) and adopts it into the manifest without creating anything. Kept as two verbs rather than one flag with a default, the way terraform keeps import separate from apply - the two operations have different blast radii and a wrong default in either direction is a real mistake (an unwanted duplicate fork, or silently overwriting someone's existing, satisfactory fork).

Tags
: design

Relations
: → concerns: [Rhizoid-cutting (rhizcut)](concepts.md#rhizoid-cutting) — both add and import produce a rhizoid-cutting; they differ in whether a new fork is created
: ← concerns: [The v1 command surface: init, add, import, update, status, refresh, remove](concepts.md#rhizoid-command-surface) — add and import are two of its seven verbs

Sources
: [Manage Resource Drift](https://developer.hashicorp.com/terraform/tutorials/state/resource-drift)


<a id="fork-destination-manifest"></a>
### Fork destination is a manifest setting, not hardcoded

Statement
: Where a new fork lands (which org or account) is configured per manifest, with a default and a per-module override - the same shape as west's remotes list (a named set of url-bases) plus each project's optional remote: override. Nothing about Rhizoid assumes forks live in one specific org.

Tags
: design

Relations
: ← concerns: [The v1 command surface: init, add, import, update, status, refresh, remove](concepts.md#rhizoid-command-surface) — add reads the destination org from here

Sources
: [West Manifests](https://docs.zephyrproject.org/latest/develop/west/manifest.html)


<a id="rhizoid-command-surface"></a>
### The v1 command surface: init, add, import, update, status, refresh, remove

Statement
: init sets up a manifest. add forks a new module into the configured org and starts tracking it. import adopts an existing fork without creating one. update pulls upstream into a module's tracking branch (GitHub's merge-upstream). status reports drift between the manifest and real git/GitHub state. refresh reconciles the manifest to match observed reality without changing anything (mirrors terraform apply -refresh-only) - this is how a by-hand change gets folded back in rather than flagged as drift forever. remove drops a module from the manifest. send-upstream (clean patch back to the true upstream) is real but deferred to v0.2, after the core loop is proven.

Tags
: design

Relations
: → concerns: [Each fork carries its own .rhizoid/module.toml](concepts.md#module-metadata-file) — status/refresh/update all read and write this file
: → concerns: [Fork destination is a manifest setting, not hardcoded](concepts.md#fork-destination-manifest) — add reads the destination org from here
: → concerns: [Adopt an existing fork vs create a new one](concepts.md#adopt-vs-create) — add and import are two of its seven verbs


<a id="module-metadata-file"></a>
### Each fork carries its own .rhizoid/module.toml

Statement
: The additive metadata that makes a fork "attached" lives in a new .rhizoid/module.toml file at the fork's own root: origin URL, tracked ref, pinned commit, whether it was added or imported, when. Mirrors .tad/.gitrepo's pattern from the tad system - a plain, readable file is the source of truth for state, not something buried in commit messages or a separate database.

Tags
: design

Relations
: ← concerns: [The v1 command surface: init, add, import, update, status, refresh, remove](concepts.md#rhizoid-command-surface) — status/refresh/update all read and write this file
: ← pairs-with: [The manifest is TOML, with the footgun that argues against it named up front](concepts.md#manifest-file-format) — the top-level manifest and each fork's own metadata file are both TOML, for the same reasons
: ← concerns: [No central lockfile - state is distributed into each fork](concepts.md#distributed-state-no-lockfile) — this is what makes a central lockfile unnecessary
: ← pairs-with: [Two crates: rhizoid-core and rhizoid-cli](concepts.md#rhizoid-crate-shape) — rhizoid-core owns both the top-level manifest type and the per-fork metadata type


<a id="manifest-file-format"></a>
### The manifest is TOML, with the footgun that argues against it named up front

Statement
: TOML: native comments (unlike JSON), no implicit type coercion or indentation sensitivity (unlike YAML - see [the YAML document from hell](sources.md#yaml-document-from-hell)), and its array-of-tables syntax is a direct fit for "a list of modules, each a flat record". Cross-ecosystem adoption for exactly this kind of file (a hand-editable project/tool manifest, not a deeply-nested orchestration config) is real and independent of any one language: Cargo.toml, pyproject.toml, Hugo, Netlify. The honest counter-case: Cloudflare's Wrangler shipped TOML-only for years, then added JSONC and now recommends it for new projects, naming TOML's array-of-tables syntax as a real footgun in practice - a misplaced or missing [[table]] header silently puts a value in the wrong entry (see [the future of Wrangler configuration](sources.md#wrangler-toml-to-jsonc)). That risk is highest when a file is mostly hand-typed from scratch, which is not the common case here: the manifest is meant to be edited through add/import/remove, not freehand, and each module's own detailed state lives in its own .rhizoid/module.toml rather than piling many [[module]] entries into one large hand-edited file - closer to Cargo.toml's [dependencies] table (mostly tool-written) than to a large hand-maintained Wrangler config.

Tags
: design

Relations
: → pairs-with: [Each fork carries its own .rhizoid/module.toml](concepts.md#module-metadata-file) — the top-level manifest and each fork's own metadata file are both TOML, for the same reasons
: ← pairs-with: [Two crates: rhizoid-core and rhizoid-cli](concepts.md#rhizoid-crate-shape) — rhizoid-core is where the TOML/schema decision actually gets implemented

Sources
: [TOML: Tom's Obvious, Minimal Language](https://toml.io/en/), [The YAML Document From Hell](https://ruudvanasseldonk.com/2023/01/11/the-yaml-document-from-hell), [The future of Wrangler configuration](https://github.com/cloudflare/workers-sdk/discussions/1951)


<a id="distributed-state-no-lockfile"></a>
### No central lockfile - state is distributed into each fork

Statement
: Cargo, npm, Poetry and Nix all pair a human-edited manifest with a separate, machine-written lockfile recording exact resolved state. Rhizoid does not need a top-level lockfile: each managed fork is already a real git repository with its own history, and its own .rhizoid/module.toml already carries that module's exact recorded state (see [module-metadata-file](concepts.md#module-metadata-file)). A central lockfile would just be a second, independently-driftable copy of information git already holds per-repo.

Tags
: design

Relations
: → concerns: [Each fork carries its own .rhizoid/module.toml](concepts.md#module-metadata-file) — this is what makes a central lockfile unnecessary
: → pairs-with: [Status detects drift, not just reports the manifest](concepts.md#drift-detection) — status/refresh read the distributed state directly instead of a lockfile


<a id="auth-via-gh"></a>
### Auth: shell out to gh, for now

Statement
: Rhizoid calls the GitHub CLI (gh) for anything needing authentication - forking, merge-upstream, reading repo state - rather than managing its own token or OAuth flow. Whoever already has gh authenticated can use Rhizoid immediately; the tool has no credentials of its own to store, rotate, or leak. Revisit if a use case needs something gh cannot do (a non-GitHub git host, for one).

Tags
: design


<a id="argenv-is-flags-and-env-only"></a>
### argenv declares flags and env vars - not subcommands or positionals

Statement
: Read argenv's own source and README before designing against it: it is explicitly "a declared, typed contract for a program's invocation surface - argv and envp", and every Input it declares binds to a --flag/env-var pair, never a bare positional value. Confirmed by reading argenv-cli's own main.rs (the author's own reference CLI): subcommand dispatch is a plain match on args.first(), not anything argenv provides. Rhizoid's CLI follows the same shape: a thin hand-written dispatcher picks the verb and reads each command's one primary positional (a repo spec, a URL, a module name) directly; argenv declares only the named flags for each verb.

Tags
: design

Relations
: ← concerns: [Two crates: rhizoid-core and rhizoid-cli](concepts.md#rhizoid-crate-shape) — the cli crate is where argenvs actual scope applies

Sources
: [argenv](https://github.com/argenv-opencommons/argenv)


<a id="rhizoid-crate-shape"></a>
### Two crates: rhizoid-core and rhizoid-cli

Statement
: Mirrors argenv's own workspace shape (crates/argenv + crates/argenv-cli). rhizoid-core holds the Manifest and Module types, their JSON Schema (via schemars, the same crate argenv itself already uses for its own contract feature), and the GitPort/GitHubPort traits the real fork/sync logic will implement later. rhizoid-cli holds argv dispatch and the per-command argenv Models. Splitting now, before there is much code, avoids a disruptive later refactor once the planned TUI needs to depend on the same core logic without the CLI.

Tags
: design

Relations
: → concerns: [argenv declares flags and env vars - not subcommands or positionals](concepts.md#argenv-is-flags-and-env-only) — the cli crate is where argenvs actual scope applies
: → pairs-with: [Each fork carries its own .rhizoid/module.toml](concepts.md#module-metadata-file) — rhizoid-core owns both the top-level manifest type and the per-fork metadata type
: → pairs-with: [The manifest is TOML, with the footgun that argues against it named up front](concepts.md#manifest-file-format) — rhizoid-core is where the TOML/schema decision actually gets implemented
