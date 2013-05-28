var Keys = function(gora, lewo, prawo, dol) {
    var gora = gora || false,
            lewo = lewo || false,
            prawo = prawo || false,
            dol = dol || false;
    
    var onKeyDown = function(e) 
{
  var code = e.keyCode;
  if (code == 37)
    lewo = 1;
  if (code == 38)
    gora = 1;
  if (code == 39)
    prawo = 1;
  if (code == 40)
    dol = 1;
}
    
    var onKeyUp = function(e)
{
  var code = e.keyCode;
  if (code == 37)
    lewo = 0;
  if (code == 38)
    gora = 0;
  if (code == 39)
    prawo = 0;
  if (code == 40)
    dol = 0;
}
    
    return {
        gora: gora,
        lewo: lewo,
        prawo: prawo,
        dol: dol,
        onKeyDown: onKeyDown,
        onKeyUp: onKeyUp
    };
};