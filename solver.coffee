#!/usr/bin/env coffee

# require('fs').readFileSync('words.txt').toString().split(/\n/)
@Solver = (dictionary) ->
  words = []; sorts = []
  for i in [0..100] then words[i] = []; sorts[i] = []

  maxLen = 0
  for word in dictionary
    maxLen = word.length if maxLen < word.length
    words[word.length].push word
    sorts[word.length].push word.split('').sort()

  isSubStringOf = (sub, sup) ->
    return true unless sub.length
    return false unless sup.length
    return isSubStringOf(sub.slice(1), sup.slice(1)) if sub[0] is sup[0]
    return isSubStringOf(sub, sup.slice(1))

  return (tiles, len, cb) ->
    letters = tiles.split('').sort()
    for i in [Math.min(maxLen, tiles.length, len)..1]
      for sort, idx in sorts[i]
        if isSubStringOf(sort, letters)
          return if cb(words[i][idx]) is false
