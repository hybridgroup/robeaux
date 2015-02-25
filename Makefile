SASS_ARGS := src/stylesheets/style.scss css/style.css

ifneq (,$(shell sassc --version 2>/dev/null))
	SASS_COMPILER := sassc
else
	SASS_COMPILER := sass
endif

help:
	@echo "make [task]"
	@echo ""
	@echo "  make clean    - removes built files"
	@echo "  make lint     - runs JSXHint against src/javascripts"
	@echo "  make js       - builds JavaScript with Browserify"
	@echo "  make css      - builds CSS with Sass"
	@echo "  make all      - cleans targets, then builds css + js"
	@echo "  make minified - cleans targets, then builds minified versions of css + js"

lint:
	@jsxhint -e ".es" ./src/javsacripts/**/*.es

js:
	@echo "Compiling JavaScript with Browserify"
	@browserify src/javascripts/script.es -t babelify -o js/script.js

css:
	@echo "Compiling Sass with $(SASS_COMPILER)"
	@$(SASS_COMPILER) $(SASS_ARGS)

clean:
	@echo "Removing generated JS/CSS"
	@rm -f js/* css/*

all: clean js css

minified: clean
	@echo "Compiling compressed JavaScript"
	@NODE_ENV=production browserify src/javascripts/script.es -t babelify -t envify -o js/script.js
	@uglifyjs --compress --mangle -- js/script.js 2>/dev/null > js/script.min.js
	@rm js/script.js
	@mv js/script.min.js js/script.js

	@echo "Compiling compressed CSS"
	@$(SASS_COMPILER) -t compressed $(SASS_ARGS)

.PHONY: help lint css js clean all minified
