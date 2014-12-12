SRC = classes/*.js

TESTS = test/index

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		$(TESTS) \
		--bail

.PHONY: test