$(document).ready(function(){

	SC.initialize({
	  client_id: 'fd4e76fc67798bfa742089ed619084a6',
	});

	// SC.get('/users/laintr/tracks').then(function(tracks){
	// 	console.log(tracks)
	// })

	var input = $('<input>',{
		id: 'track-input',
		type: 'text',
		placeholder: 'Enter Track Here'
	});
	var button = $('<button>',{
		id: 'search-button',
		class: 'btn btn-primary',
		text: 'Search'
	});

	$('div').eq(0).append(input).append('<br>').append(button).append('<br>')

	var random;
	$(document).on('click', '#search-button', function(){
		SC.get('/tracks',{
			q: $('#track-input').val()
		}).then(function(response){
			random = Math.floor(Math.random() * response.length);
			SC.stream("/tracks/" + response[random].id).then(function(player) {
				player.play();
			});
		})
	})

	var playButton = $('<button>');
	playButton.addClass('play-button');
	playButton.text("Play")
	$('div').eq(0).append(playButton)

	var num = 0
	$(document).on('click', '.play-button', function(){
		SC.get('/tracks',{
			q: "heart"
		}).then(function(response){
			SC.stream("/tracks/" + response[num].id).then(function(player) {
				player.play();
			});
		})
	})

	var nextButton = $('<button>');
	nextButton.addClass('next-button');
	nextButton.text('Next')
	$('div').eq(0).append(nextButton);

	$(document).on('click', '.next-button', function(){
		num++;
		SC.get('/tracks',{
			q: "heart"
		}).then(function(response){
			SC.stream("/tracks/" + response[num].id).then(function(player) {
				player.play();
			});
		})
	})

})