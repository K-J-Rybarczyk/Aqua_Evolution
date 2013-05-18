var hero = {
  name: '',
  avatar: 'undefined',
  stats: [5, 5, 5],
  leftPoints: 5
};



var heroConfirm = $('#confirm').click(function() {
  newHero.name = $('input[name="name"]').val();

});