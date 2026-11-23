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
: done

Note
: Named by the milestone rhizoid-carries-ocoeco's criteria but never recorded: found 2026-11-12 when ocoeco check followed every link. The milestone is right to depend on it. Design 2026-11-23 (git-rhizoid-builder, for the rhizoid lane coordinator; building waits for its read, the first real fork for the author's go): rhizcut is rhizoid's reserved verbs add, import, update, refresh and remove, built on concepts rhizoid-cutting, tracking-vs-patch-branch, clean-patch-back, fork-destination-manifest, module-metadata-file and auth-via-gh. (1) GitHub only behind GitHubPort (fork, merge_upstream, repo_exists, plus default_branch and open_pr when needed): one adapter, GhCli, drives gh (gh repo fork --org ORG --clone=false; gh api -X POST repos/FORK/merge-upstream -f branch=B; gh repo view --json), never a token of rhizoid's own; the core is tested with a fake port, the CLI with a fake gh on PATH and local bare repositories - no test touches GitHub. (2) A cutting has two branches: tracking (the upstream's branch, named in the manifest, default its default branch) moved only by merge-upstream, fast-forward, never committed to by hand; patch (rhizoid/patch, or the manifest's name) where every change lives, merged from tracking. .rhizoid/module.toml (origin, tracked_ref, last_synced_commit, added_as, attached_on) lives on the patch branch only, so tracking stays fast-forwardable and diff tracking...patch minus .rhizoid/ is the clean patch back. (3) Verbs, each listing what it would do and changing nothing unless given now (practice 8): add SOURCE now forks SOURCE into the org (manifest default or --org), makes the patch branch with module.toml from tracking, pushes it, records [[module]] in rhizoid.toml; import FORK now adopts an existing fork the same way (its upstream read from GitHub's parent); update [MODULE] now runs merge-upstream on tracking, then merges tracking into patch in a fresh worktree (a conflict stops it, names the paths, keeps nothing) and pushes; refresh [MODULE] reads what each fork is and says where the manifest and the forks differ, changing nothing; remove MODULE drops the manifest entry and never deletes a fork (deleting a GitHub repository stays a person's act). (4) Every outward step - a fork created, a branch pushed, merge-upstream - is printed before it is taken and only with now; the first real add waits for the author's go through the coordinator. (5) What follows rhizcut, not in it: status's fork-track already reads tracking against upstream; send-back of the clean patch as an upstream pull request reuses send-back; consuming a cutting as a cargo dependency is cutting-as-cargo-dependency (rank 9), whose pin is a bump [[tool]] key. Rejected: rhizoid's own GitHub token or API client (auth-via-gh: no credentials to keep); module.toml on the tracking branch (merge-upstream could no longer fast-forward); deleting forks in remove (irreversible, outward); a cutting without a patch branch (changes on tracking would conflict with upstream forever). Done 2026-11-23: rhizoid v0.3.0 (git-rhizoid/rhizoid PR #29, release PR #30), with the coordinator's three changes: the graph is the record (decision 2026-11-23-cuttings-live-in-the-graph; rhizoid.toml and init retired); patches = integration for a kernel's topics (no patch branch, nothing pushed); every GitHub-writing verb's first real use per module waits for the author's go through the coordinator. A programmer review's seven points fixed: the fork is the clone's remote by URL (the real sxmo-utils clone's origin is its upstream), merge-upstream checked to be a fast-forward first, add finishes in one run, a failed push's branch adopted, record conflicts block the plan, the graph edit keeps CRLF, quotes and comments. Tests use a fake gh and local bare repositories only.

Opened
: 2026-11-12

Rank
: 8


<a id="slice-consumption"></a>
### Consumption mode for a slice: take a named list of files from a pinned release of a repository into one that has its own files

Status
: done

Note
: Found 2026-11-17 by grenudi/ideal-knowledge-base (research chain-follow-world, decision 2026-11-17-chain-follow-by-slice). Its chain - idealkb to device-template to device bases - lays a slice, not a repository: a source names what it gives (a generic list, files whole or the part between two marker lines), a follower pins a release and names its own files, and the verdict says whether the follower changed a generic file (idealkb's bin/follow.sh ends 3). rhizoid today takes a whole fork (a cutting); this is the consumption side design-consumption-side leaves open. follow.sh and update-pins.sh are the prototype; when rhizoid has it, idealkb can hand its chain over. Also lacking for that chain: the pin read from the follower's own file, a release gate (every follower answers before a release is tagged), and sending a changed generic file back as a patch. Also 2026-11-17: the tools home (linux-phone-oco/lab-tools) has the same slice case for the device-template files that go with a tool - the [boot] manifest skeleton, hook examples, an initramfs skeleton - beside the tool's own version pin (see cutting-as-cargo-dependency, followers-one-pin-bump). Reshaped 2026-11-18 (docs research base-graph-measured, base-graph-world; decision 2026-11-18-device-layer-from-docs; upstream item rhizoid-scope-every-edge (linux-phone-oco/docs)): rhizoid's scope is the follow tool for every edge (slice, tool pin, cutting), built in order status-over-every-edge, follow-by-conformance, send-back, cuttings; each replaces shell only once it passes the shell's tests. Unparking implement-cli waits on the author's word. What is left, written 2026-11-23 against what follow (rank 6) does: laying a slice and reading the pin from the follower's own file are done by rhizoid follow; (a) a slice pin moved on a branch, gated like a tool, is bump now (built here); (b) one pin file the follower owns for every kind is not built - decision 2026-11-23-pins-stay-with-their-readers; the release gate stays idealkb's followers-answer.sh (it asks idealkb's queries); sending a changed generic file back as a patch is its own row, generic-file-back.

Opened
: 2026-11-17

Rank
: 7


<a id="cutting-as-cargo-dependency"></a>
### A cutting consumed by a language manager: the patched fork of a Rust tool as a cargo git dependency at a pinned tag, written and bumped by rhizoid

Status
: done

Note
: Found 2026-11-17 by linux-phone-oco/docs (research bringup-home-follow-and-rhizoid, decision 2026-11-17-bringup-in-lab-tools). A device repository uses lab-tools' bringup as a pinned binary or cargo git dependency; when it must patch the tool itself before upstream takes the change, the true case is a cutting of lab-tools (tracking branch pristine, patch branch merged from it, clean patch back). What rhizoid lacks is the consumption side for it: the follower declares this tool, this cutting, this tag, and rhizoid writes the pin where the language manager reads it (Cargo.toml git tag or [patch] entry; a rust-script file's cargo header; a version line in a manifest) and bumps it when the tracking branch has a new release - the open item design-consumption-side, for a case that now has a user. Until then: a plain fork and a [patch] line by hand, recorded as a problem. What is left, written 2026-11-23 (git-rhizoid-builder) against v0.3.1: the pin itself is a bump [[tool]] key - the Cargo git tag (value = "PREFIX{version}SUFFIX"), or the tag in a [patch."https://github.com/OWNER/REPO"] entry (quoted key parts, built in PR #33); the gate is cargo check and also = [Cargo.lock] (v0.2.4); a rust-script header or a manifest version line is a [[tool]] line. Left to decide: where a cutting's own releases come from, the tags bump moves a pin to. Proposed: (1) rhizoid update ... now, for a one-branch cutting whose tracking moved to a new upstream release, merges it into the patch branch (as now) and then tags the patch tip RELEASE-cut.N (lpoco-v0.43.0-cut.1; N counts this cutting's tags on that release) and pushes the tag - outward, behind now, first use behind the author's go; (2) a [[tool]] may say tag_suffix = "-cut.N", so bump reads the newest of those tags (release first, then N) as the release to pin. Rejected so far: tags made by hand (every bump would wait on a person tagging the fork); the upstream's own tag names on the fork (they would collide with the upstream's tags the fork carries); a branch pin in Cargo (cargo git branch pins move under the follower without a bump and cannot be reproduced). Done 2026-11-23: rhizoid v0.3.2 (git-rhizoid/rhizoid PR #35 with PR #33, release PR #34), as the coordinator agreed: a one-branch cutting may say cut_tags = "PREFIX"; update ... now tags the patch tip RELEASE-cut.N and pushes the tag (outward, behind now, first use per module behind the author's go), only when the patch tip differs from the newest cut tag's commit; a [[tool]] says tag_suffix = "-cut.N" and bump pins the newest cut, never a plain upstream tag the fork carries; cuts ordered by release then N, never semver (said in the README); the upstream's releases and the fork's cuts are read in rhizoid's own refs (refs/rhizoid/...), so the clone's tags are never written. A programmer review's five points fixed.

Opened
: 2026-11-17

Rank
: 9


<a id="followers-one-pin-bump"></a>
### Many followers, one pin and one verdict: a slice, a cutting and a tool version bumped by the same weekly job

Status
: done

Note
: Found 2026-11-17 by linux-phone-oco/docs (same research). A device repository follows three sources - idealkb (a slice), device-template (a slice) and lab-tools (a tool version, maybe a cutting) - each with its own pin line, and today an updater (idealkb's update-pins.sh) only for the slices. Lacking: one pin file the follower owns (source, kind slice|cutting|tool, release), one command that bumps every pin to the newest release and opens a pull request per source, and one verdict (up to date, behind, own change to a generic file) that CI can gate on. update-pins.sh and follow.sh's exit 3 are the prototype; slice-consumption is the first kind. Reshaped 2026-11-18 (docs research base-graph-measured, base-graph-world; decision 2026-11-18-device-layer-from-docs; upstream item rhizoid-scope-every-edge (linux-phone-oco/docs)): rhizoid's scope is the follow tool for every edge (slice, tool pin, cutting), built in order status-over-every-edge, follow-by-conformance, send-back, cuttings; each replaces shell only once it passes the shell's tests. Unparking implement-cli waits on the author's word. Reshaped 2026-11-23 (decisions 2026-11-23-rhizoid-carries-the-structure-git-flows, 2026-11-23-structure-flows-ranked-first; linux-phone-oco/docs decision 2026-11-23-structure-git-flows-run-on-rhizoid): every pin's status in one place (lab.toml lpoco, idealkb.toml, device-template slices, procedures' lpoco-attended pins); repo-only bumps as pull requests; a gated bump (--gate CMD, e.g. lpoco-attended check) for attended pins; lab.toml lpoco: rhizoid bumps the pin, lpoco-host follow installs. Not Renovate. Done 2026-11-23: rhizoid v0.2.3 (git-rhizoid/rhizoid PR #22, release PR #21). rhizoid bump lists every tool and slice pin of a graph in one place with its newest release (changing nothing); rhizoid bump now bumps each tool pin behind on a branch rhizoid/bump/TOOL-VERSION of the follower's clone from the graph's revision, in a fresh worktree, the pin alone edited and proven (the file parses as the original with that one key set), a tool's gate (an attended pin's check, e.g. lpoco-attended check) passed before the commit; --push pushes, --pr opens the pull request with gh; --fetch first. A [[tool]] key may carry more than the version (value = "lpoco-attended-v{version}", a Cargo git tag). Slices stay follow's (rank 6). lpoco-host follow installs what lab.toml pins. Not Renovate. Since PR #20 every release carries the x86_64 Linux binary and its sha256 (assets.yml), which lab-tools' kernel assemble installs.

Opened
: 2026-11-17

Rank
: 5


<a id="send-back-writes-the-upstream-item"></a>
### Sending a change back: a patch to the source as a pull request, and the follower's own record of it

Status
: done

Note
: Found 2026-11-17 by linux-phone-oco/docs (same research). clean-patch-back says a diff of the patch branch against the pristine tracking branch is a clean patch; the CLI that makes it and opens the pull request is stubbed. The follower's bases keep an upstream item per change (idealkb: ikb upstream-item, form patch, draft, ready on the person's word, sent with the PR address, landed when released). Lacking: a rhizoid verb that, for a changed generic file or a patch branch, writes the patch, opens the pull request only after the person says ready, and returns the PR address and later the release that carried it, in a form the follower's record command takes - without rhizoid knowing that base's tables. It never sends in the person's name by itself. Reshaped 2026-11-18 (docs research base-graph-measured, base-graph-world; decision 2026-11-18-device-layer-from-docs; upstream item rhizoid-scope-every-edge (linux-phone-oco/docs)): rhizoid's scope is the follow tool for every edge (slice, tool pin, cutting), built in order status-over-every-edge, follow-by-conformance, send-back, cuttings; each replaces shell only once it passes the shell's tests. Unparking implement-cli waits on the author's word. Reshaped 2026-11-23 (decisions 2026-11-23-rhizoid-carries-the-structure-git-flows, 2026-11-23-structure-flows-ranked-first; linux-phone-oco/docs decision 2026-11-23-structure-git-flows-run-on-rhizoid): rebase topic/ITEM onto the target tree onto send/ITEM/vN (stop naming the commit at a conflict); format-patch --cover-letter -vN --base into the folder given (upstream/LIST/ITEM/vN-draft/); range-diff vs topic/ITEM/vN-1; a changelog skeleton from it; --base and the tested commit (passed in, never guessed) for SEND-NOTES; get_maintainer.pl recipients; checkpatch --strict stops it (a missing SoB and an unresolvable Fixes listed, not hidden); W=1 / dt-check as a check command by exit code. Out: signing, re-authoring, send-email, pushing, lore, b4, claims in the cover letter. Record fields, settled by ikb 2026-11-23 (relayed by the Top Coordinator): send-back prints exactly ikb upstream-item's option names as key=value - version=vN, carried-in=FORK/topic/ITEM (FORK the fork's upstreams id, from the graph), local-ref=topic/ITEM/vN, file=upstream/DEST/ITEM/ (it must start with upstream/); never sent-on or forwarded. Base, base_sha and the tested commit are printed as they are; the caller puts them in the item's note. Done 2026-11-23: rhizoid v0.2.1 (git-rhizoid/rhizoid PR #15, release PR #16), general under decision 2026-11-23-rhizoid-stays-general. rhizoid send-back BRANCH --onto REF --out DIR [--config FILE] [--tested SHA] [--fork ID]: rebase onto the target in a fresh worktree (authorship kept, nothing signed, no other branch moved; a conflict names the commit and keeps nothing); format-patch --cover-letter -vN --base into --out with --range-diff against the previous version's tag and a changelog skeleton; the checks and the recipients command are argv in rhizoid's config [send] (the Linux kernel's checkpatch --strict, W=1, dt_binding_check and get_maintainer.pl are examples/kernel-send.toml; exceptions are the check's own arguments); SEND-NOTES with the base, the tested commit and every check's output; the version tag and send branch made only when every check passes. Prints ikb's keys version, carried-in, local-ref, file. Out: signing, re-authoring, send-email, pushing, lore, b4, claims in the cover letter. Reshaped in v0.2.2 (2026-11-23, PR #19), after the recorded flow (docs decision 2026-11-23-structure-kernel-topics-and-integration: topic/ITEM/vN is the author's signed, sent tip) and the upstreams lane: send-back makes drafts - numbered one past the versions sent ({branch}/v{n}, tagged by the author: the one manual step, git tag topic/ITEM/vN <signed tip>), tagged {branch}/v{n}-draft; a re-run for the same N is cut beside the earlier draft and replaces it only when ready (replaced=yes), never a branch, tag or folder that is not this draft's; range-diff against the version last sent; a shallow history that cannot hold the base or the version last sent is refused before writing; local-ref is the branch, draft=vN and draft_tag replace version=; a step with fails = false is reported only (the draft's expected checkpatch findings, as data in examples/kernel-send.toml); the cover letter's testing line is a marked blank.

Opened
: 2026-11-17

Rank
: 4


<a id="status-over-every-edge"></a>
### rhizoid status: one read-only report over every edge a repository has - a slice (pin vs source release, followed files equal, own files on their way up), a tool pin (vs latest tag), a cutting (tracking vs upstream head) - exit 1 on drift

Status
: done

Note
: Found 2026-11-18 by linux-phone-oco (docs research base-graph-measured, base-graph-world; decision 2026-11-18-device-layer-from-docs; upstream item rhizoid-scope-every-edge (linux-phone-oco/docs)). The first command to build: no risk, it replaces docs' graph-drift.sh (36 FAIL today) and passes it line for line. Edges are read from the pin files followers already own (idealkb.toml, devicebase.toml, lab.toml [tools], a fork's .rhizoid/module.toml), so the follower lists derive from the pins. Rust with argenv, the CLI's status command. Unparked 2026-11-18 (see implement-cli): first in the author's order. Built in rhizoid-cli: status reads a graph file of the edges and each follower's own pin files at origin/main, reports every edge current, behind or moved by hand, exits 1 on drift, and is proven by graph-drift.sh's cases as fixtures and by agreeing with graph-drift.sh run on the real graph. Released 2026-11-18 as git-rhizoid/rhizoid v0.1.0 (PRs 7, 8, 9): rhizoid status over a graph file (examples/linux-phone-oco.graph.toml: slice, device layer, tool pin, fork), agreeing with graph-drift.sh edge by edge on the real graph (tests/agree-with-graph-drift.sh). The graph file exists because idealkb.toml names no source: when pins name theirs (follow-by-conformance, rule one), the follower lists derive from the pins and the file shrinks to what pins cannot say. The graph file for the real graph belongs in linux-phone-oco/docs, whose owner keeps graph-drift.sh. Next: follow-by-conformance.

Opened
: 2026-11-18

Rank
: 1


<a id="follow-by-conformance"></a>
### rhizoid follow lays a slice exactly as idealkb's bin/follow.sh does, proven by its fixtures, before update-pins calls it

Status
: done

Note
: Found 2026-11-18 by linux-phone-oco (docs research base-graph-measured, base-graph-world; decision 2026-11-18-device-layer-from-docs; upstream item rhizoid-scope-every-edge (linux-phone-oco/docs)). Passes grenudi/ideal-knowledge-base bin/test-follow.sh byte for byte and keeps three things its owner names: the pin names its source, one owner per file (check-one-owner), the followers' gate before a release (followers-answer.sh). Adds #! from = DIR/ and own needing an upstream item (idealkb items idealkb-slice-from-prefix, idealkb-own-needs-item) only after idealkb has them. Until it passes, the shell is the tool. Blocked by status-over-every-edge. Done 2026-11-23: rhizoid v0.2.5 (git-rhizoid/rhizoid PR #25, release PR #26). rhizoid follow --source DIR BASE VERSION prints, writes and ends as idealkb's bin/follow.sh does: tests/follow_agrees.rs lays 13 scenarios with both and compares stdout, stderr, exit and tree byte for byte, and runs idealkb's own bin/test-follow.sh with its follow.sh handing over to rhizoid - all pass, in CI on every change against idealkb's main. A programmer review probed eleven more inputs where they differed (CRLF, own lists, a pin that is a generic file, deleted own files, remote URL forms, NULs, links); all are matched now. Parts on purpose, in rhizoid's README: a regex marker is refused, a failed write says rhizoid's words, bash's NUL warning is not printed. check-one-owner, slice-changed and followers-answer stay idealkb's (followers-answer calls follow.sh, so it keeps working whichever lays the files). Handing over - follow.sh exec-ing rhizoid, update-pins calling it - is idealkb's change, for its owner.

Opened
: 2026-11-18

Rank
: 6


<a id="assemble-from-list"></a>
### rhizoid assemble: a named list of branches merged onto a fresh base in a worktree, rerere shared, stopped at a conflict naming both, tagged int/DEVICE/LIST/BASE/N

Status
: done

Note
: List format owned by rhizoid (TOML; named lists [lists.NAME]; base a tag or a fork commit; entries in order, each a topic/ITEM or backport/ITEM/BASE branch with for and state = known-good (test_run, tested_commit) or trying); a fresh worktree each time in the home, git merge with rerere.enabled + autoUpdate; at a conflict it stops and names the entry and the earlier entry that touched the same paths; an annotated tag with the base and every sha; --reproduces COMMIT compares TAG^{tree} with the commit's tree (surya: 29d92793b); several assembled worktrees alive at once, locked while wanted (walleye); output key=value and --json for the caller's record command (fields: ikb's answer pending). Proof: a fixture repository - two topics assemble to a tag holding both; a conflict stops naming both; reproduces says equal and says which paths differ; a worktree outside the home is refused. Decisions 2026-11-23-rhizoid-carries-the-structure-git-flows, 2026-11-23-standard-tools-drive-cut-or-write; linux-phone-oco/docs decision 2026-11-23-structure-git-flows-run-on-rhizoid. Done 2026-11-23: rhizoid v0.1.1 (git-rhizoid/rhizoid PR #12, release PR #10), proven by crates/rhizoid-cli/tests/assemble.rs on a fixture repository - both topics in the tag, a conflict naming both, reproduces equal and the differing paths, a worktree outside the home refused, N+1 on a second run, rerere replaying a resolution made by hand. Each entry's report says merged, rerere-resolved or already-in. The clone's config gains rerere.enabled only. A local branch wins over origin's. The ikb fields are still open; the report is key=value or --json and can be extended.

Opened
: 2026-11-23

Rank
: 2


<a id="status-over-kernel-edges"></a>
### rhizoid status over topic, backport, int and fork edges

Status
: done

Note
: A topic's base vs the newest upstream tag; an int tag's recipe read back from its message; commits on int/ not made by assemble; a branch outside the scheme (the scheme as data in the graph file: topic/ITEM, backport/ITEM/BASE, wip/LANE/WHAT, int/DEVICE/LIST; tags topic/ITEM/vN, int/DEVICE/LIST/BASE/N, archive/NAME); an assembled worktree whose tree differs from its tag; fork -> upstream from the graph (linux, sxmo-utils); --fetch fetches with --prune. Unknowns shown as not known yet. From the Steward's point 4 and walleye. Decision 2026-11-23-rhizoid-carries-the-structure-git-flows; linux-phone-oco/docs decision 2026-11-23-structure-git-flows-run-on-rhizoid. Done 2026-11-23: rhizoid v0.2.0 (git-rhizoid/rhizoid PR #13, release PR #14). It is general under decision 2026-11-23-rhizoid-stays-general: a graph's [[integration]] edge (repo, release_prefix, scheme, topics, assembled) and not a kernel edge, and the kernel layout is examples/kernel.graph.toml. Checks: name-scheme (an int/ branch is outside the kernel example's scheme: test kernels are tags only), topic-base, branch-origin (a local topic that differs from origin's), recipe (each assembled list's newest tag read back; a tag of the assembled shape without a recipe), worktree-tag (rhizoid's worktrees, locked or left unlocked at a conflict). not-known-yet is never drift. --fetch prunes branches, never tags. Fork -> upstream stays a [[fork]] edge. The same release carries the Steward's three assemble refinements (--done TAG, an unchanged list makes no tag, tested_commit a full sha) and the ikb keys (entry.N.source, one BRANCH.WITH.DOTS=sha line per entry, tested=).

Opened
: 2026-11-23

Rank
: 3


<a id="gix-worktree-add-upstream"></a>
### Offer gitoxide worktree add/lock as an upstream pull request

Status
: open

Note
: Only with the author's go (decision 2026-11-23-standard-tools-drive-cut-or-write): the first candidate for a cutting with wrapping code; until then rhizoid drives git worktree.

Opened
: 2026-11-23


<a id="generic-file-back"></a>
### Send a follower's changed generic file back to its source as a patch

Status
: open

Note
: Split from slice-consumption (2026-11-23): when follow ends 3, the follower changed a file its source gives; the change belongs upstream. Lacking: a verb that makes the follower's version of that file a branch of the source's clone (the release the follower pins as its base) and a pull request, never in the person's name by itself - the slice case of send-back, for single files and marked parts.

Opened
: 2026-11-23


<a id="status-names-git-errors"></a>
### A failed git call names git's error; a local tag that differs from origin's is a finding, not a stop

Status
: done

Note
: Orchestration, 2026-11-23: bump --fetch on lab-tools' clone stopped with an empty error; git had refused the stale local tag sxmo-utils-v1.18.1_p20261118 (would clobber existing tag). Every git failure prints its command and stderr (status, assemble, bump). A tag the clone holds differently from origin is moved-by-hand naming both shas, and the run goes on. No fetch --force: local tags (assembled int/ tags) stay. Proof: a fixture clone with a local tag differing from origin's. Done in rhizoid v0.3.3 (PR #36): every failed git call names its command and git's words (stdout when stderr is empty); a refused tag is moved-by-hand tag-origin; --fetch needs git 2.41.

Opened
: 2026-11-23

Rank
: 1


<a id="status-reads-own"></a>
### status reads a slice follower's own and [why] as declared

Status
: done

Note
: Decision 2026-11-23-every-pin-one-pushed-mover (4); idealkb decision 2026-11-23-own-files-read-as-declared, its item rhizoid-status-reads-own. Done in rhizoid v0.3.3 (PR #38): an own file differing from the source's at the pin is current when the pin file's [why] gives a reason (printed, with a note when a release since the pin changed it); upstream:ITEM stays a candidate; no reason stays moved-by-hand and says so. An own tables.toml reads the same where follow reads it as own (follow leaves an own file whole, marked part included); a part file follow would not read as own (follow reads a one-line own = [...], as follow.sh) is behind. The names come through the [[slice]] edge (own_key, why_key; defaults own and why). Proof: status on docs' graph at origin/main went from 13 moved-by-hand own lines (v0.3.2) to 0 (v0.3.3, all 13 current, declared).

Opened
: 2026-11-23

Rank
: 1


<a id="pin-mover-on-edge"></a>
### Each pin's one mover is named on its edge (moved_by); bump now moves only rhizoid-bump's

Status
: done

Note
: Decision 2026-11-23-every-pin-one-pushed-mover (1). moved_by on [[tool]] and [[slice]], default rhizoid-bump; bump lists every pin with pin.N.moved_by and skips the others under now. docs' graph then names idealkb-update-pins, tad-update-pins and lpoco-host-follow (orchestration's edit). Proof: bump now on a fixture with a pin moved by another job leaves it, and lists it. Done in rhizoid v0.3.4 (PR #39): moved_by on [[tool]] and [[slice]], never empty; bump lists pin.N.moved_by and under now moves only rhizoid-bump's pins, its exit counting only those.

Opened
: 2026-11-23

Rank
: 2


<a id="bump-lands-on-a-timer"></a>
### bump now --land lands each bump through the follower's checks; a shipped user timer runs it hourly

Status
: done

Note
: Decision 2026-11-23-every-pin-one-pushed-mover (2). The graph's [bump] land argv (e.g. ["land"]) runs on each pushed bump branch; a failing gate or check leaves the PR and says why. packaging/systemd/rhizoid-bump.{service,timer} on idealkb-update-pins' pattern (token from the lab's private file). Orchestration enables it on the lab host. Proof: a fixture follower whose land stand-in passes gets the pin on main; one that fails keeps the branch and the PR, and the run names it. Done in rhizoid v0.3.6 (PR #43): --land runs [bump] land in the bump's worktree on its branch; a refused land keeps the PR (pin.N.land_error), and a later run says branch-exists - it waits for a hand. packaging/systemd/rhizoid-bump.{service,timer}: graph from origin/main of RHIZOID_GRAPH_CLONE (~/.config/rhizoid/bump.env). Enabling it on the lab host is orchestration's.

Opened
: 2026-11-23

Rank
: 4


<a id="pin-table-coverage"></a>
### The graph covers a pin table whole: a pinned key no edge covers is a finding

Status
: done

Note
: Decision 2026-11-23-every-pin-one-pushed-mover (3). [[pins]] names a follower's file and table (lab.toml [tools]; a Cargo.toml's git dependencies) and unpinned keys each with a why (tools.land and agent-env pin git revs; oco-work unknown). status pin-coverage: a key neither an edge nor unpinned is moved-by-hand, naming it. Proof: adding a key to a fixture's [tools] with no edge makes the finding; listing it unpinned with a why clears it. Done in rhizoid v0.3.8 (PR #47): [[pins]] follower, file, table, git_only, unpinned; pin-coverage names every problem in one line (uncovered keys, unpinned names the table lacks or an edge covers); an empty why is refused at parse. On docs' graph with a [[pins]] for lab.toml [tools], unpinning land, agent-env and oco-work makes it current (lpoco and rhizoid by their edges). The same release makes bump now end 0 past a refusal for copies (decision 2026-11-23-every-pin-one-pushed-mover (7)).

Opened
: 2026-11-23

Rank
: 5


<a id="pin-one-copy"></a>
### One pin, one place: status finds a second copy of a pin's tag name; bump refuses to move one copy of several

Status
: done

Note
: Decision 2026-11-23-every-pin-one-pushed-mover (5). google-walleye-lab #790: the attended pin was also in the procedures' headers and CI, so bump moved one of three. pin-copies: git grep of the follower's tracked files at origin/main for the tag name bump writes (tag_prefix + version + tag_suffix) outside the pin file and its also files; each hit is moved-by-hand with file:line. bump now refuses such a pin (pin.N.state=refused, copies named). Ranked before the timer, so a timer never lands a half-moved pin. Proof: a fixture follower with the tag in a second file - status names it and bump refuses; without it, bump moves the pin. Done in rhizoid v0.3.5 (PR #41): whole tag names only (v0.17.10 or v0.17.1-cut.2 is no copy); a tool with no tag prefix is not searched. On docs' graph it found the real copies (walleye's procedures and CI, surya's procedures/attended-session.rs) and records too - split off as pin-copies-skip-records.

Opened
: 2026-11-23

Rank
: 3


<a id="pin-copies-skip-records"></a>
### pin-copies skips the files a follower marks as records with a git attribute

Status
: done

Note
: The rhizoid lane coordinator, 2026-11-23, checking v0.3.5 on docs' graph: pin-copies counted history that names a version as copies (docs' research/base-graph/2026-11-18/measured.md for tad-v0.7.1; walleye's data/backlog.json and its rendered docs/backlog.md) - not a second pin, and back after every bump, the busy work the condition rules out. A follower marks its record paths in its own .gitattributes (data/** rhizoid-records); pin-copies skips any file git check-attr marks: an existing git mechanism, declared where the files live, no list in rhizoid or the graph. Ranked before pin-table-coverage. Proof: a fixture where a copy in a marked file is skipped and an unmarked copy is still found. Done in rhizoid v0.3.7 (PR #45): Repos::marked reads git check-attr --source at the graph's revision (git 2.40+; a global attributes file never counts), its paths written beside the read so 5000 records never stall. Followers still have to add their .gitattributes lines.

Opened
: 2026-11-23

Rank
: 4


<a id="graph-check-verb"></a>
### rhizoid check --graph: whether this version can read a graph, so a graph never lands ahead of its host

Status
: done

Note
: The rhizoid lane coordinator, 2026-11-23: docs' graph gained [[pins]] and the lab host's rhizoid 0.3.6 refused it (unknown field pins); the hourly timer would have broken had the graph landed first. Decided: keep refusing unknown fields (an old rhizoid that ignored one could move a pin it does not own) and add a parse-only verb. Done in rhizoid v0.3.9 (PR #49): rhizoid check [--graph FILE], declared through argenv, reads and checks every edge, moved_by, [[pins]] and [bump] with no clones and no network; 0 with readable=yes and the edges counted, 2 naming a field this version does not know. docs' CI runs it with the version lab.toml pins - from v0.3.9 on, since older versions have no check verb. Proof: an unknown field (top-level or in an edge) and bad values exit 2 naming them; docs' graph at origin/main passes.

Opened
: 2026-11-23
