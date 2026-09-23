<!-- Generated from data/ by .tad/tools/render.py. Do not edit by hand. -->

# Session Log

<a id="reflect-on-subtree-experience"></a>
### Reflected on the tad/git-subrepo work and proposed a fork-based package manager

Entry date
: 2026-09-22

Done
: After building and battle-testing the tad/git-subrepo system, proposed a different but related system: fork each dependency into an owned repo, add an additive file structure, and automate the fork/sync/patch-back loop. Researched prior art first rather than assuming it was novel.

Considered
: Continuing to extend the tad/subrepo approach itself for third-party dependencies.

Rejected
: tad/subrepo solves "distribute code we originate across our own repos" - a different problem from "own and patch code we do not originate." Kept both rather than merging them.

---


<a id="name-rejected-gita"></a>
### Rejected the name "gita" for a naming collision

Entry date
: 2026-09-22

Done
: Checked before committing to the name and found nosarthur/gita (1,600+ stars, popular, active) already exists as an unrelated multi-repo git CLI tool.

---


<a id="name-chosen-rhizoid"></a>
### Named the project Rhizoid, offshoots rhizoid-cuttings (rhizcut)

Entry date
: 2026-09-22

Done
: "Rhizoid" was picked from the Rhizome ecosystem - the literal botanical term for "resembles a rhizome, simpler," matching the stated framing of this project as a simpler offshoot of Rhizome. Checked for collisions before committing (none found). Individual managed dependencies are "rhizoid-cuttings" (rhizcut), from the horticultural cutting - a piece rooted separately from its parent, independent from then on.

---


<a id="rustnix-first-then-rhizoid"></a>
### Upgraded rustnix into a proper template before generating rhizoid from it

Entry date
: 2026-09-22

Done
: Added CI (fmt/clippy/test/doc/MSRV), release-plz + cliff.toml, PR-title linting, and a tests/ scaffold to grenudi/rustnix, mirroring argenv-opencommons/argenv's proven setup, marked it as a GitHub template, then generated git-rhizoid/rhizoid from it - same sequence as text-as-data-template before software-engineering-canon.

Considered
: Building the CI/release setup directly in the rhizoid repo instead.

Rejected
: Any other future Rust project benefits from the same upgrade to rustnix, not just this one.

---


<a id="mold-linker-bug"></a>
### Found and fixed a real CI-breaking bug: the mold linker requirement

Entry date
: 2026-09-22

Done
: .cargo/config.toml requires the mold linker, present locally only via the Nix devshell. A bare GitHub Actions runner does not have it, so every cargo build/test in CI, and release-plz's own package verification, would have failed. Fixed by installing mold explicitly in both ci.yml and release-plz.yml - found by actually running the CI steps locally with a real toolchain and by watching a real release attempt fail, not by review.

---


<a id="dependabot-msrv-pin-bug"></a>
### Found and fixed Dependabot silently defeating the MSRV job

Entry date
: 2026-09-22

Done
: Dependabot opened a real PR within minutes of rustnix going live, proposing dtolnay/rust-toolchain@1.75.0 -> @1.120.0 in the msrv job - it cannot tell a version pinned as a floor to test against from a version to keep current. Closed the PR without merging and added a Dependabot ignore rule.

---


<a id="publish-false-premature"></a>
### Removed publish = false too early, then restored it

Entry date
: 2026-09-22

Done
: Removed publish = false from rhizoid's Cargo.toml on the assumption a real project should be publishable from the start. A real release attempt then correctly tried to publish an empty v0.1.0 (src/main.rs has no real functionality yet) and failed on a missing CARGO_REGISTRY_TOKEN. Restored publish = false - crates.io has no true delete, only yank, so publishing a placeholder was the wrong call regardless of the token.

Considered
: Adding a CARGO_REGISTRY_TOKEN secret to make the failed publish succeed.

Rejected
: That would have published a genuinely empty crate under the real "rhizoid" name - the missing token was not the actual problem.

---


<a id="adopt-rfc-style"></a>
### Adopted the RFC-like minimal style from text-as-data-template

Entry date
: 2026-09-22

Done
: Pulled the definition-list render.py change via git subrepo pull (clean, no conflicts, this repo uses the stock engine renderer directly) and added the matching _config.yml, _layouts/default.html and assets/css/style.css by hand, since those are not vendored - adapted from text-as-data-template with this repo's own title and description.

Considered
: Waiting for someone to ask for it here specifically, since it was originally scoped to the template repo only.

Rejected
: The whole point of building this system was that engine improvements should be easy to bring in - proving that immediately, on real repos, mattered more than waiting.

---


<a id="research-fork-tooling-patterns"></a>
### Researched prior art before designing the v1 command surface

Entry date
: 2026-09-22

Done
: Looked specifically at how mature tools handle three things this design needed: a destination that varies per managed item rather than being hardcoded (west's manifest: a named remotes list, each project can override which one it uses - see [fork-destination-manifest](concepts.md#fork-destination-manifest)), detecting when reality has drifted from a recorded manifest (Terraform's plan / drift detection: the state file is a record of intent, not a source of truth to trust blindly - see [drift-detection](concepts.md#drift-detection)), and adopting something that already exists instead of always creating new (Terraform's import, kept as a separate command from apply precisely because the two operations have different blast radii - see [adopt-vs-create](concepts.md#adopt-vs-create)). All three map directly onto Rhizoid's stated requirements: per-project fork destination, a CLI that checks real git state rather than only the manifest, and a way to point at an existing satisfactory fork without creating a duplicate.

---


<a id="design-v1-command-surface"></a>
### Settled the v1 command surface and the fork's own metadata file

Entry date
: 2026-09-22

Done
: Seven verbs for v1 (see [rhizoid-command-surface](concepts.md#rhizoid-command-surface)): init, add, import, update, status, refresh, remove. send-upstream (clean patch back to the true upstream) is real and designed but deferred to v0.2, after the core loop is proven on real dependencies. Each managed fork carries its own .rhizoid/module.toml (see [module-metadata-file](concepts.md#module-metadata-file)), mirroring .tad/.gitrepo's pattern already proven in the tad system: a plain, readable file is the source of truth for a module's state, not something buried in commit messages or a separate database.

Considered
: A single add command with a flag choosing create-vs-adopt behavior, and folding status and a Terraform-style separate plan into one command.

Rejected
: A flag with a default is exactly the kind of thing that goes wrong quietly - kept add and import as separate verbs instead, matching Terraform's own precedent (see [adopt-vs-create](concepts.md#adopt-vs-create)). Folding plan into status was kept, though: unlike cloud infrastructure, inspecting local git state and GitHub's API is cheap and side-effect-free, so there is no real cost to always doing it - no need for a separate read-only-vs-mutating split the way Terraform needs one.

---


<a id="defer-consumption-side-again"></a>
### Kept the consumption-side manifest deferred, distinct from this plan

Entry date
: 2026-09-22

Done
: This plan covers the fork-management side only: how Rhizoid forks, tracks, and syncs dependencies into a configured org. How a third repo (something that is not Rhizoid itself) declares "I depend on this org's fork of X at version Y" and pulls it in remains a separate, undesigned problem, kept apart on purpose since the first reflection on this project.

---


<a id="decide-manifest-format-and-auth"></a>
### Decided the manifest format (TOML) and that auth goes through gh for now

Entry date
: 2026-09-22

Done
: Researched the JSON/YAML/TOML tradeoffs specifically for a hand-editable, cross-language project manifest rather than a deeply nested orchestration config (see [manifest-file-format](concepts.md#manifest-file-format)): TOML's comment support and lack of YAML's implicit-typing and indentation footguns fit a manifest people edit by hand, and its array-of-tables syntax matches "a list of modules" directly. Found and weighed the honest counter-case before committing: Cloudflare's Wrangler moved away from TOML-only specifically over its array-of-tables footgun in a heavily hand-edited config - judged as a smaller risk here because the manifest is meant to be edited through add/import/remove rather than freehand, and per-module detail lives in each fork's own .rhizoid/module.toml rather than in one large top-level file (see [distributed-state-no-lockfile](concepts.md#distributed-state-no-lockfile)). Also decided, separately and far more simply: auth goes through an already-authenticated gh for now (see [auth-via-gh](concepts.md#auth-via-gh)), rather than Rhizoid managing its own credentials.

Considered
: JSON/JSONC for the manifest, matching Wrangler's own current recommendation.

Rejected
: JSONC is not a real standard (every parser's comment-stripping behavior differs slightly) and lacks TOML's native date/array-of-tables types; the footgun that pushed Wrangler away from TOML applies less here given how the manifest is actually meant to be edited.
