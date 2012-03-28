solve = Solver(Dictionary)

$ ->
  $("#solve").submit ->
    tiles = $("#letters").val()
    tiles = tiles.toLowerCase().replace(/[^a-z]/g, "")
    return  if tiles.length is 0
    $("#letters").attr "disabled", true
    $("#results").empty()
    setTimeout (->
      count = 0
      solve tiles, Number($("#maxlen").val()) or 30, (hit) ->
        count++
        $("#results").append $("<tr />").append($("<th />").text(hit)).append($("<td />").text(hit.length))
        count < 20

      $("#letters").attr "disabled", false
    ), 1
    false

  $("#letters").focus()

  if /\w+/.test(location.hash)
    $("#letters").val location.hash.toLowerCase().replace(/[^a-z]/g, "")
    $("#solve").submit()
