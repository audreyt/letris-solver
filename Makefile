COFFEE = $(shell find . -name '*.coffee' | sort | perl -pe 's/\.coffee/\.js/')

all :: $(COFFEE)

.coffee.js:
	coffee -c $<

.PHONY: all coffee
.SUFFIXES: .coffee .js
