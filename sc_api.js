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

	var songDiv = $('<div>');
	songDiv.addClass('song-div');
	$(document).on('click', '#search-button', function(){
		appendSongList(songDiv);
	});

	$(document).on('click', '.song-button', function(){
		var id = $(this).data('id');
		SC.stream("/tracks/" + id).then(function(player) {
			player.play();
		});
	});

	$(document).on('keypress', function(e){
		if(e.key === 'Enter'){
			appendSongList(songDiv);
		}
	})

	function appendSongList(div){
		$('.song-div').remove();
		SC.get('/tracks',{
			q: $('#track-input').val()
		}).then(function(response){
			var str = "<ol>";
			for(var i = 0; i < response.length; i++){
				str += "<li><button class='song-button' data-id=" + response[i].id + ">" + response[i].title + "</button></li>"
			}
			str += "</ol>"
			div.html(str);
			$('div').eq(0).append(div)
		});
		$('#track-input').val("");
	}

})