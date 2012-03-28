(function() {
  var solve;

  solve = Solver(Dictionary);

  $(function() {
    $("#solve").submit(function() {
      var maxHits, tiles;
      maxHits = Number($("#maxhits").val()) || 10;
      tiles = $("#letters").val();
      tiles = tiles.toLowerCase().replace(/[^a-z]/g, "");
      if (tiles.length === 0) return;
      $("#letters").attr("disabled", true);
      $("#results").empty();
      setTimeout((function() {
        var count;
        count = 0;
        solve(tiles, Number($("#maxlen").val()) || 30, function(hit) {
          count++;
          $("#results").append($("<tr />").append($("<th />").text(hit)).append($("<td />").text(hit.length)));
          return count < maxHits;
        });
        return $("#letters").attr("disabled", false).removeAttr('disabled');
      }), 1);
      return false;
    });
    $("#letters").focus();
    if (/\w+/.test(location.hash)) {
      $("#letters").val(location.hash.toLowerCase().replace(/[^a-z]/g, ""));
      return $("#solve").submit();
    }
  });

}).call(this);
