(function() {

  this.Solver = function(dictionary) {
    var i, isSubStringOf, maxLen, sorts, word, words, _i, _len;
    words = [];
    sorts = [];
    for (i = 0; i <= 100; i++) {
      words[i] = [];
      sorts[i] = [];
    }
    maxLen = 0;
    for (_i = 0, _len = dictionary.length; _i < _len; _i++) {
      word = dictionary[_i];
      if (maxLen < word.length) maxLen = word.length;
      words[word.length].push(word);
      sorts[word.length].push(word.split('').sort());
    }
    isSubStringOf = function(sub, sup) {
      if (!sub.length) return true;
      if (!sup.length) return false;
      if (sub[0] === sup[0]) return isSubStringOf(sub.slice(1), sup.slice(1));
      return isSubStringOf(sub, sup.slice(1));
    };
    return function(tiles, len, cb) {
      var i, idx, letters, sort, _len2, _ref, _ref2;
      letters = tiles.split('').sort();
      for (i = _ref = Math.min(maxLen, tiles.length, len); _ref <= 1 ? i <= 1 : i >= 1; _ref <= 1 ? i++ : i--) {
        _ref2 = sorts[i];
        for (idx = 0, _len2 = _ref2.length; idx < _len2; idx++) {
          sort = _ref2[idx];
          if (isSubStringOf(sort, letters)) {
            if (cb(words[i][idx]) === false) return;
          }
        }
      }
    };
  };

}).call(this);
