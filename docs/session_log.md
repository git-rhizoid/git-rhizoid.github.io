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


<a id="name-rejected-gita"></a>
### Rejected the name "gita" for a naming collision

Entry date
: 2026-09-22

Done
: Checked before committing to the name and found nosarthur/gita (1,600+ stars, popular, active) already exists as an unrelated multi-repo git CLI tool.


<a id="name-chosen-rhizoid"></a>
### Named the project Rhizoid, offshoots rhizoid-cuttings (rhizcut)

Entry date
: 2026-09-22

Done
: "Rhizoid" was picked from the Rhizome ecosystem - the literal botanical term for "resembles a rhizome, simpler," matching the stated framing of this project as a simpler offshoot of Rhizome. Checked for collisions before committing (none found). Individual managed dependencies are "rhizoid-cuttings" (rhizcut), from the horticultural cutting - a piece rooted separately from its parent, independent from then on.


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


<a id="mold-linker-bug"></a>
### Found and fixed a real CI-breaking bug: the mold linker requirement

Entry date
: 2026-09-22

Done
: .cargo/config.toml requires the mold linker, present locally only via the Nix devshell. A bare GitHub Actions runner does not have it, so every cargo build/test in CI, and release-plz's own package verification, would have failed. Fixed by installing mold explicitly in both ci.yml and release-plz.yml - found by actually running the CI steps locally with a real toolchain and by watching a real release attempt fail, not by review.


<a id="dependabot-msrv-pin-bug"></a>
### Found and fixed Dependabot silently defeating the MSRV job

Entry date
: 2026-09-22

Done
: Dependabot opened a real PR within minutes of rustnix going live, proposing dtolnay/rust-toolchain@1.75.0 -> @1.120.0 in the msrv job - it cannot tell a version pinned as a floor to test against from a version to keep current. Closed the PR without merging and added a Dependabot ignore rule.


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
