<!-- Generated from data/ by tad. Do not edit by hand. -->

# Decisions

<a id="2026-11-23-standard-tools-drive-cut-or-write"></a>
### 2026-11-23-standard-tools-drive-cut-or-write

Date
: 2026-11-23

Brief
: git worktree and git rerere: drive the git CLI; b4: drive the git and kernel tools it wraps, not b4 - rhizoid's code is only what no tool has.

Decision
: git worktree: drive the git CLI (git worktree add --detach, lock --reason, remove), behind rhizoid's GitPort. git rerere: drive the git CLI - assemble is git merge with rerere.enabled and rerere.autoUpdate, stopping when a conflict is left. b4: none of the three as b4 - drive the git and kernel-tree tools it wraps: git format-patch --cover-letter -vN --base to cut a series, git range-diff, the kernel's get_maintainer.pl for recipients, checkpatch.pl for checks; collecting trailers from lore and sending stay out of rhizoid (the author sends), and the branch shape stays b4-compatible so the author may use b4 himself. Rhizome stays the direction, not a dependency: nothing here waits on it. The rule under all three: rhizoid's own code is the part no tool has - the list, the order, the tags, the refusal to edit an int/ branch by hand, the reproduction check, the output for records; git's own work is git's. A cutting (rhizcut) with wrapping code becomes the road when a needed library lacks one small thing and its upstream wants it - the first candidate: gix worktree add/lock, offered upstream. Kept open: gix's in-memory merge_commits as a dry run naming the two conflicting topics before touching a worktree, a later item only if it pays.

Why
: The author's words of 2026-11-23: "we dont want to reinvent a where where its not needed, unless it gives better quality, simplicity, elegancy, and we could weigh the possibility of using them as rhizcuts instead of driving them through cli's". So each tool was weighed three ways: drive the CLI, take it as a rhizcut used as a library, or write our own. Coverage checked 2026-11-23 against gix 0.85.0, git2 0.21.0 / libgit2 1.9.7 and git 2.56.1 (upstream roadmaps not checked, not known yet) (sources gitoxide, git2-rs, git-rerere): list worktrees - git yes, gix yes (worktrees(), proxies), libgit2 yes; add/lock/unlock worktree - git yes, gix no (read only), libgit2 yes (WorktreeAddOptions::lock, lock, unlock, prune); merge commits/trees - git yes, gix yes in memory (merge_commits, merge_trees), libgit2 yes; rerere (.git/rr-cache) - git yes, gix no, libgit2 no; rebase onto another base - git yes, gix no, libgit2 basic without rerere; format-patch with cover letter and --base - git yes, gix no, libgit2 one patch at a time (git_email_create), no cover letter, no --base; range-diff - git yes, gix no, libgit2 no. rhizoid already drives the git CLI behind GitPort (crates/rhizoid-cli/src/git_repos.rs, rhizoid main 0ffb48a). Worktree: git2 could do it, but would add libgit2 - C, a second git implementation whose worktree files must agree with the CLI's that people and prune use - for three calls; gix cannot add or lock today. Rerere: its point is one memory shared by every hand on the one kernel clone - the builder's git, the author's git, rhizoid; only git's own rerere reads and writes that rr-cache, and a second implementation must hash conflicts exactly as git does or it silently misses, or replays a wrong resolution; neither gix nor libgit2 has it. b4: what we need of it is git's or the kernel tree's own tools; b4 is Python (practice 21).

Rejected
: git worktree: a gix cutting adding worktree add/lock (worth offering upstream as a pull request, not carrying); our own (it would rewrite .git/worktrees/ by hand); git2/libgit2 as a library (a second C git implementation for three calls). git rerere: a gix cutting with a gix-rerere crate (a large exact-compatibility port, with no upstream to stay in step with); our own (the same, worse). b4: driving b4 (Python, practice 21; already rejected as a requirement in linux-phone-oco/docs decision 2026-11-23-structure-kernel-topics-and-integration); a b4 cutting as a library (Python cannot be a Rust library); a Rust rewrite of b4 (reinvention without gain: the parts we need are git's).

About
: rhizoid's kernel flows for linux-phone-oco: assembling test kernels from topic branches, topic and fork status, cutting series versions for upstream
