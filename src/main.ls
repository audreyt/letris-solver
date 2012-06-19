<- $

solve = Solver Dictionary

doSubmit = !->
    maxHits = Number($ \#maxhits .val!) || 10
    tiles = $ \#letters .val!toLowerCase! - /[^a-z]/g
    return unless tiles.length

    $ \#letters .attr {+disabled}
    $ \#results .empty!
    $ \.resume .empty! unless $ \#solve .hasClass \resume

    <- (`setTimeout` 1)
    count = 0
    do
        hit <- solve tiles, Number($ \#maxlen .val!) || 30
        count++
        $ \#results .append do
            $(\<tr/>)
                .append $(\<th/>)text hit
                .append $(\<td/>)append do
                    $(\<input/>)
                        .attr value:hit.length, type:\button
                        .click !->
                            $ \#results .before do
                                $(\<center/>)
                                    .attr class:\resume
                                    .text hit
                            for ch in hit.split ''
                                tiles -= //#ch//
                            $ \#letters .val tiles
                            if tiles.length
                                $ \#solve .addClass \resume
                                doSubmit!
                                $ \#solve .removeClass \resume
                            else
                                $ \#results .empty!
        return count < maxHits
    $ \#letters .attr {-disabled}
                .removeAttr \disabled

$ \#solve .submit doSubmit
$ \#letters .focus!

if /\w+/.test location.hash
    $ \#letters .val location.hash.toLowerCase! - /[^a-z]/g
    doSubmit!
