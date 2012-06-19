@Solver = (dictionary) ->
    words = [ [] for i from 0 to 100 ]
    sorts = [ [] for i from 0 to 100 ]

    maxLen = 0
    for word in dictionary
        maxLen >?= word.length
        words[word.length]push word
        sorts[word.length]push word.split('')sort!

    isSubStringOf = (sub, sup) ->
        | !sub.length               => true
        | sub.length > sup.length   => false
        | sub.0 is sup.0            => sub.slice(1) `isSubStringOf` sup.slice(1)
        | otherwise                 => sub `isSubStringOf` sup.slice(1)

    (tiles, len, cb) ->
        letters = tiles.split('')sort!
        for i from Math.min(maxLen, tiles.length, len) to 1 by -1
            for sort, idx in sorts[i]
                if sort `isSubStringOf` letters
                    return unless cb words[i][idx]
