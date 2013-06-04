var Keys = function(gora, lewo, prawo, dol) {
    var gora = gora || false,
            lewo = lewo || false,
            prawo = prawo || false,
            dol = dol || false;
    
    var onKeyDown = function(e) 
{
  var code = e.keyCode;

  if (code == 65)
    this.lewo = true;
  if (code == 87)
    this.gora = true;
  if (code == 68)
    this.prawo = true;
  if (code == 83)
    this.dol = true;
}
    
    var onKeyUp = function(e)
{
  var code = e.keyCode;

  if (code == 65)
    this.lewo = false;
  if (code == 87)
    this.gora = false;
  if (code == 68)
    this.prawo = false;
  if (code == 83)
    this.dol = false;
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