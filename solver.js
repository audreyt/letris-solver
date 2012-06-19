(function(){
  this.Solver = function(dictionary){
    var i, words, sorts, maxLen, word, isSubStringOf, __res, __i, __len, __ref;
    __res = [];
    for (i = 0; i <= 100; ++i) {
      __res.push([]);
    }
    words = __res;
    __res = [];
    for (i = 0; i <= 100; ++i) {
      __res.push([]);
    }
    sorts = __res;
    maxLen = 0;
    for (__i = 0, __len = dictionary.length; __i < __len; ++__i) {
      word = dictionary[__i];
      maxLen >= (__ref = word.length) || (maxLen = __ref);
      words[word.length].push(word);
      sorts[word.length].push(word.split('').sort());
    }
    isSubStringOf = function(sub, sup){
      switch (false) {
      case !!sub.length:
        return true;
      case !(sub.length > sup.length):
        return false;
      case sub[0] !== sup[0]:
        return isSubStringOf(sub.slice(1), sup.slice(1));
      default:
        return isSubStringOf(sub, sup.slice(1));
      }
    };
    return function(tiles, len, cb){
      var letters, i, idx, sort, __ref, __len;
      letters = tiles.split('').sort();
      for (i = Math.min(maxLen, tiles.length, len); i >= 1; --i) {
        for (idx = 0, __len = (__ref = sorts[i]).length; idx < __len; ++idx) {
          sort = __ref[idx];
          if (isSubStringOf(sort, letters)) {
            if (!cb(words[i][idx])) {
              return;
            }
          }
        }
      }
    };
  };
}).call(this);
