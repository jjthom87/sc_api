$(document).ready(function(){

	SC.initialize({
	  client_id: 'fd4e76fc67798bfa742089ed619084a6',
	});

	var header = $('<h2>');
	header.addClass("jumbotron");
	header.text("Search & Play Music");
	$('div').eq(0).append(header);

	var input = $('<input>',{
		id: 'track-input',
		type: 'text',
		placeholder: 'Search By Artist/Song & Press Enter or Search Button',
		class: 'col-md-4',
		height: '35px'
	});
	var button = $('<button>',{
		id: 'search-button',
		class: 'btn btn-primary',
		text: 'Search'
	});

	$('div').eq(0).append(input).append(button).append('<br><br>')

	var random;
	var songDiv = $('<div>');
	songDiv.addClass('song-div');
	var songOl = $('<ol>');
	songOl.addClass('song-ol');
	$(document).on('click', '#search-button', function(){
		$('.song-div').remove();
		SC.get('/tracks',{
			q: $('#track-input').val()
		}).then(function(response){
			var str = "<ol>";
			for(var i = 0; i < response.length; i++){
				str += "<li><button class='song-button' data-id=" + response[i].id + ">" + response[i].title + "</button></li>"
			}
			str += "</ol>"
			songDiv.html(str);
			$('div').eq(0).append(songDiv)
		})
		$('#track-input').val("");
	})

	$(document).on('click', '.song-button', function(){
		var id = $(this).data('id');
		SC.stream("/tracks/" + id).then(function(player) {
			player.play();
		});
	})

	$(document).on('keypress', function(e){
		if(e.key === 'Enter'){
			$('.song-div').remove();
			SC.get('/tracks',{
				q: $('#track-input').val()
			}).then(function(response){
				var str = "<ol>";
				for(var i = 0; i < response.length; i++){
					str += "<li><button class='song-button' data-id=" + response[i].id + ">" + response[i].title + "</button></li>"
				}
				str += "</ol>"
				songDiv.html(str);
				$('div').eq(0).append(songDiv)
			})
			$('#track-input').val("");
		}
	})
	// var playButton = $('<button>');
	// playButton.addClass('play-button');
	// playButton.text("Play")
	// $('div').eq(0).append(playButton)

	// var num = 0
	// $(document).on('click', '.play-button', function(){
	// 	SC.get('/tracks',{
	// 		q: "heart"
	// 	}).then(function(response){
	// 		SC.stream("/tracks/" + response[num].id).then(function(player) {
	// 			player.play();
	// 		});
	// 	})
	// })

	// var nextButton = $('<button>');
	// nextButton.addClass('next-button');
	// nextButton.text('Next')
	// $('div').eq(0).append(nextButton);

	// $(document).on('click', '.next-button', function(){
	// 	num++;
	// 	SC.get('/tracks',{
	// 		q: "heart"
	// 	}).then(function(response){
	// 		SC.stream("/tracks/" + response[num].id).then(function(player) {
	// 			player.play();
	// 		});
	// 	})
	// })

})