// Enforces Conventional Commits (https://www.conventionalcommits.org/) on every commit in a PR.
// Standard types only (feat, fix, docs, chore, ci, test, refactor, build, ...) - no custom
// type-enum, so this stays generic across whatever content this template is used for. Scope is
// optional and free-form; see CONTRIBUTING.md for the scopes this repo's own convention suggests.
//
// No `ignores` rule for git-subrepo's own commits: `git subrepo clone/pull/push` all accept
// -m/--message and it fully replaces the tool's auto-generated message (verified directly - see
// creation-guidelines/tad-engine's README). Always pass -m with a real Conventional Commits
// message (see AGENTS.md); if commitlint ever flags such a commit,
// that means -m was forgotten, and the fix is to amend the message, not to exempt the pattern.
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Dependabot's own commits ("Bump X from Y to Z", a release-notes body with long lines) are
    // valid Conventional Commits (type build/chore + scope) but fail these two default style
    // rules. Relaxed so Dependabot's own PRs pass; everything else from config-conventional
    // (type-enum, header format, blank line between header/body, ...) still applies.
    "subject-case": [0],
    "body-max-line-length": [0],
  },
};
