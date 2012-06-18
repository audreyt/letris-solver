@Solver = (dictionary) ->
    words = []
    sorts = []
    for i from 0 to 100
        words[i] = []
        sorts[i] = []

    maxLen = 0
    for word in dictionary
        maxLen >?= word.length
        words[word.length].push word
        sorts[word.length].push word.split('').sort!

    isSubStringOf = (sub, sup) ->
        | !sub.length               => true
        | sup.length < sub.length   => false
        | sub.0 is sup.0            => isSubStringOf sub.slice(1), sup.slice(1)
        | otherwise                 => isSubStringOf sub, sup.slice(1)

    (tiles, len, cb) ->
        letters = tiles.split('').sort!
        for i from Math.min(maxLen, tiles.length, len) to 1 by -1
            for sort, idx in sorts[i]
                if isSubStringOf sort, letters
                    return unless cb words[i][idx]
