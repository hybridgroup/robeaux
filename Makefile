VERSION := $(shell node -e "console.log(require('./package.json').version)")

.PHONY: test release test-controllers test-services test-functions

test:
	@./node_modules/karma/bin/karma start ./test/karma_test_all.conf.js --no-auto-watch --single-run

test-controllers:
	@./node_modules/karma/bin/karma start ./test/karma_test_controllers.conf.js --no-auto-watch --single-run

test-services:
	@./node_modules/karma/bin/karma start ./test/karma_test_services.conf.js --no-auto-watch --single-run

test-functions:
	@./node_modules/karma/bin/karma start ./test/karma_test_functions.conf.js --no-auto-watch --single-run

release:
	@git tag -m "$(VERSION)" v$(VERSION)
	@git push --tags
	@gem build robeaux.gemspec
	@gem push robeaux-$(VERSION).gem
	@npm publish ./
