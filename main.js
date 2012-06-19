(function(){
  var __replace = ''.replace;
  $(function(){
    var solve, doSubmit;
    solve = Solver(Dictionary);
    doSubmit = function(){
      var maxHits, tiles;
      maxHits = Number($('#maxhits').val()) || 10;
      tiles = __replace.call($('#letters').val().toLowerCase(), /[^a-z]/g, '');
      if (!tiles.length) {
        return;
      }
      $('#letters').attr({
        disabled: true
      });
      $('#results').empty();
      if (!$('#solve').hasClass('resume')) {
        $('.resume').empty();
      }
      __flip(setTimeout)(1, function(){
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
              tiles = __replace.call(tiles, RegExp(ch + ''), '');
            }
            $('#letters').val(tiles);
            if (tiles.length) {
              $('#solve').addClass('resume');
              doSubmit();
              $('#solve').removeClass('resume');
            } else {
              $('#results').empty();
            }
          }))));
          return count < maxHits;
        });
        return $('#letters').attr({
          disabled: false
        }).removeAttr('disabled');
      });
    };
    $('#solve').submit(doSubmit);
    $('#letters').focus();
    if (/\w+/.test(location.hash)) {
      $('#letters').val(__replace.call(location.hash.toLowerCase(), /[^a-z]/g, ''));
      return doSubmit();
    }
  });
  function __flip(f){
    return __curry(function (x, y) {
      return f(y, x);
    });
  }
  function __curry(f, args){
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      return params.push.apply(params, arguments) < f.length && arguments.length ?
        __curry.call(this, f, params) : f.apply(this, params);
    } : f;
  }
}).call(this);
