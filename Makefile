BIN := ./node_modules/.bin/
TEST_FILES := spec/helper.js $(shell find spec/components -type f)

ifneq (,$(shell sassc --version 2>/dev/null))
	SASS_COMPILER := sassc
	SASS_ARGS := src/stylesheets/style.scss css/style.css
	SASS_WATCH_CMD := find ./src/stylesheets -type f | grep -v "bourbon" | grep -v "neat" | peat "$(SASS_COMPILER) $(SASS_ARGS)"
else
	SASS_COMPILER := sass
	SASS_ARGS := src/stylesheets/style.scss:css/style.css
	SASS_WATCH_CMD := $(SASS_COMPILER) --watch $(SASS_ARGS)
endif

help:
	@echo "make [task]"
	@echo ""
	@echo "  make clean     - removes built files"
	@echo "  make lint      - runs JSXHint against src/javascripts"
	@echo "  make js        - builds JavaScript with Browserify"
	@echo "  make css       - builds CSS with Sass"
	@echo "  make watch-js  - watches/builds JavaScript with Browserify"
	@echo "  make watch-css - watches/builds CSS with Sass"
	@echo "  make all       - cleans targets, then builds css + js"
	@echo "  make minified  - cleans targets, then builds minified versions of css + js"
	@echo "  make test      - runs tests with Mocha"

clean:
	@echo "Removing generated JS/CSS"
	@rm -f js/* css/*

js:
	@echo "Compiling JavaScript with Browserify"
	@$(BIN)browserify src/javascripts/script.es -t babelify -o js/script.js

css:
	@echo "Compiling Sass with $(SASS_COMPILER)"
	@$(SASS_COMPILER) $(SASS_ARGS)

watch-js:
	@echo "Watching JavaScript with Watchify"
	@$(BIN)watchify src/javascripts/script.es -t babelify -o js/script.js

watch-css:
	@echo "Watching CSS with $(SASS_COMPILER)"
	$(SASS_WATCH_CMD)

lint:
	@$(BIN)jsxhint -e ".es" ./src/javascripts/**/* $(TEST_FILES)

all: clean js css

minified: clean
	@echo "Compiling compressed JavaScript"
	@NODE_ENV=production $(BIN)browserify src/javascripts/script.es -t babelify -t envify -o js/script.js
	@$(BIN)uglifyjs --compress --mangle -- js/script.js 2>/dev/null > js/script.min.js
	@rm js/script.js
	@mv js/script.min.js js/script.js

	@echo "Compiling compressed CSS"
	@$(SASS_COMPILER) -t compressed $(SASS_ARGS)

test:
	@$(BIN)mocha --colors -R dot $(TEST_FILES)

.PHONY: help lint css js watch-js watch-css clean all minified test
