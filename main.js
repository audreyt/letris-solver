(function(){
  var solve;
  solve = Solver(Dictionary);
  $(function(){
    var doSubmit;
    doSubmit = function(){
      var maxHits, tiles;
      maxHits = Number($('#maxhits').val()) || 10;
      tiles = $('#letters').val().toLowerCase().replace(/[^a-z]/g, '');
      if (tiles.length === 0) {
        return;
      }
      $('#letters').attr('disabled', true);
      $('#results').empty();
      if (!$('#solve').hasClass('resume')) {
        $('.resume').empty();
      }
      return setTimeout(function(){
        var count;
        count = 0;
        solve(tiles, Number($('#maxlen').val()) || 30, function(hit){
          count++;
          $('#results').append($('<tr/>').append($('<th/>').text(hit)).append($('<td/>').append($('<input/>').attr({
            value: hit.length,
            type: 'button'
          }).click(function(){
            var ch, __i, __ref, __len;
            $('#results').before($('<center/>').attr({
              'class': 'resume'
            }).text(hit));
            for (__i = 0, __len = (__ref = hit.split('')).length; __i < __len; ++__i) {
              ch = __ref[__i];
              tiles = tiles.replace(new RegExp(ch), '');
            }
            $('#letters').val(tiles);
            if (tiles.length) {
              $('#solve').addClass('resume');
              doSubmit();
              return $('#solve').removeClass('resume');
            } else {
              return $('#results', empty());
            }
          }))));
          return count < maxHits;
        });
        return $('#letters').attr('disabled', false).removeAttr('disabled');
      }, 1);
    };
    $('#solve').submit(doSubmit);
    $('#letters').focus();
    if (/\w+/.test(location.hash)) {
      $('#letters').val(location.hash.toLowerCase().replace(/[^a-z]/g, ''));
      return doSubmit();
    }
  });
}).call(this);
