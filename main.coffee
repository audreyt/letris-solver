solve = Solver(Dictionary)

$ ->
  $("#solve").submit ->
    maxHits = Number($("#maxhits").val()) or 10
    tiles = $("#letters").val()
    tiles = tiles.toLowerCase().replace(/[^a-z]/g, "")
    return  if tiles.length is 0
    $("#letters").attr "disabled", true
    $("#results").empty()
    setTimeout (->
      count = 0
      solve tiles, Number($("#maxlen").val()) or 30, (hit) ->
        count++
        $("#results").append $("<tr />").append(
          $("<th />").text(hit)
        ).append(
          $("<td />").append(
            $("<input />").attr(value: hit.length, type: 'button').click ->
              $('#results').before $('<center />').attr(class: 'resume').text(hit)
              for ch in hit.split('')
                tiles = tiles.replace(new RegExp(ch), '')
              $("#letters").val tiles
              if tiles.length
                $("#solve").addClass('resume').submit().removeClass('resume')
              else
                $('#results').empty()
          )
        )
        return(count < maxHits)

      $("#letters").attr("disabled", false).removeAttr('disabled')
    ), 1
    false

  $("#letters").focus()

  if /\w+/.test(location.hash)
    $("#letters").val location.hash.toLowerCase().replace(/[^a-z]/g, "")
    $("#solve").submit()
