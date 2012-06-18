solve = Solver Dictionary

$ ->
    doSubmit = ->
        maxHits = Number($ \#maxhits .val!) || 10
        tiles = $ \#letters .val!toLowerCase!replace /[^a-z]/g ''
        return if tiles.length is 0
        $ \#letters .attr \disabled true
        $ \#results .empty!
        $ \.resume .empty! unless $ \#solve .hasClass \resume
        setTimeout ->
            count = 0
            solve tiles, Number($ \#maxlen .val!) || 30, (hit) ->
                count++
                $ \#results .append do
                    $(\<tr/>).append $(\<th/>).text hit .append $(\<td/>).append do
                        $(\<input/>).attr value: hit.length, type: \button .click ->
                            $ \#results .before do
                                $(\<center/>).attr class: \resume .text hit
                            for ch in hit.split ''
                                tiles .:= replace new RegExp(ch), ''
                            $ \#letters .val tiles
                            if tiles.length
                                $ \#solve .addClass \resume
                                doSubmit!
                                $ \#solve .removeClass \resume
                            else
                                $ \#results empty!
                return count < maxHits
            $ \#letters .attr \disabled false
                        .removeAttr \disabled
        , 1

    $ \#solve .submit doSubmit
    $ \#letters .focus!

    if /\w+/.test location.hash
        $ \#letters .val location.hash.toLowerCase!replace /[^a-z]/g ''
        doSubmit!
