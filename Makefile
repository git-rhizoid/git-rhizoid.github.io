# Thin entry point. The data engine is tad (creation-guidelines/tad-engine), a released Rust tool;
# tables.toml declares the tables and the rules across them.
SHELL := /bin/bash
TAD ?= tad

.PHONY: setup check canon render verify
setup:            ## install tad from its pinned release (its checksum checked)
	./bin/install-tad.sh
check:            ## every row and every rule across tables (tables.toml)
	$(TAD) check
canon:            ## rewrite data/ in canonical form (only when it checks out)
	$(TAD) canon
render:           ## data/ -> docs/
	$(TAD) render
verify: check     ## what CI runs: data is valid and canonical, docs are fresh
	@before="$$(find data docs -type f -print0 | sort -z | xargs -0 sha256sum)"; \
	$(TAD) canon && $(TAD) render; \
	after="$$(find data docs -type f -print0 | sort -z | xargs -0 sha256sum)"; \
	if [ "$$before" != "$$after" ]; then \
	  echo "data/ or docs/ was not canonical/fresh and has been rewritten. Review and commit:"; \
	  diff <(echo "$$before") <(echo "$$after") || true; exit 1; \
	fi; echo "verify: data canonical, docs fresh"
