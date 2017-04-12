BIN := ./node_modules/.bin/
TEST_FILES := spec/helper.js $(shell find spec/components -type f)

VERSION := $(shell node -e "console.log(require('./package.json').version)")

SASS_ARGS := src/stylesheets/application.scss:css/application.css

BROWSERIFY_ARGS := src/javascripts/script.es -t babelify -t envify
UGLIFY_ARGS := --compress --mangle 2>/dev/null

all: clean js css

help:
	@echo "make [task]"
	@echo ""
	@echo "  make all       - cleans targets, then builds css + js"
	@echo "  make clean     - removes built files"
	@echo "  make lint      - runs JSXHint against src/javascripts"
	@echo "  make serve     - run development server with dummy data on :3000"
	@echo "  make js        - builds JavaScript with Browserify"
	@echo "  make css       - builds CSS with Sass"
	@echo "  make minified  - cleans targets, then builds minified versions of css + js"
	@echo "  make test      - runs tests with Mocha"

clean:
	@echo "Removing generated JS/CSS"
	@rm -f js/* css/*

js:
	@echo "Compiling JavaScript with Browserify"
	@$(BIN)browserify $(BROWSERIFY_ARGS) > js/script.js

css:
	@echo "Compiling CSS"
	@sass $(SASS_ARGS)

lint:
	@$(BIN)eslint ./src/javascripts/**/*.es $(TEST_FILES)

minified: clean
	@echo "Compiling compressed JavaScript"
	@NODE_ENV=production $(BIN)browserify $(BROWSERIFY_ARGS) | $(BIN)uglifyjs $(UGLIFY_ARGS) > js/script.js

	@echo "Compiling compressed CSS"
	@sass -t compressed $(SASS_ARGS)

test:
	@$(BIN)mocha --colors -R dot $(TEST_FILES)

serve:
	@node ./script/dev-server.js

release: test minified
	@git tag -m "$(VERSION)" v$(VERSION)
	@git push --tags
	@gem build robeaux.gemspec
	@gem push robeaux-$(VERSION).gem
	@npm publish ./
	@rm robeaux-$(VERSION).gem

.PHONY: help lint css js clean all minified test serve
