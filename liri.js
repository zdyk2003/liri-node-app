var fs = require("fs");
var client = require("./keys.js");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var command = process.argv[2];

//Twiiter
if (command === "my-tweets") {
	fs.readFile("keys.js", "utf8", function(error, data) {
		if(error) {
			return error;
		}
		var search = new twitter(client.twitterKeys);
		var params = {
			screen_name: "czdyksman",
			count: "20"
		};
		search.get("statuses/user_timeline", params, function(error, tweets, response) {
			if(error) {
				return(error);
			}
			//display only the parts of the object needed
			console.log(tweets[0].created_at);
			console.log(tweets[0].text);

		});
	
	});	
};

//Spotify
var params = new spotify ({
	id: 'd855e48f7a44460fb1b93307c5f572c2',
	secret: 'a2b464d9a95f4446b8ff3dd4774acd54'
});

if (command === "spotify-this-song") {
	
	var song = process.argv[3];

    if(song){ 
	    params.search({ type: 'track', query: song }, spotifyIt);	
  	}
  	else {  
    	params.search({ type: 'track', query: "ace of base" }, spotifyIt);
  	}

	  	function spotifyIt(error, data) {
		    if (error) {
		        console.log(error);
		    }
		 	else{
		    var songInfo = data.tracks.items[0];
		    var songResult = console.log(songInfo.artists[0].name)
		                     console.log(songInfo.name)
		                     console.log(songInfo.album.name)
		                     console.log(songInfo.preview_url)
		    				 console.log(songResult);
		    };
		};	
};

//OMBD 
if (command === "movie-this") {

	var nodeArgs = process.argv;
	var movieName = "";

	for (var i = 3; i < nodeArgs.length; i++) {
	  if (i > 3 && i < nodeArgs.length) {
	    movieName = movieName + "+" + nodeArgs[i];
	  }
	  else {
	    movieName += nodeArgs[i];
	  }
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
		if (movieName) {
	  		request(queryUrl, function(error, response, body) {
			    console.log(JSON.parse(body).Title);
			    console.log("This movie came out in " + JSON.parse(body).Year);
			    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
		  	    console.log("Rotten Tomatoes gave it " + JSON.parse(body).Rotten_Tomatoes);
		  	    console.log("Produced in " + JSON.parse(body).Country);
			    console.log("Language is " + JSON.parse(body).Language);
			    console.log("The plot is " + JSON.parse(body).Plot);
			    console.log("This actors are " +JSON.parse(body).Actors);
	  		});
	  	}
	  	else{
	  		request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {
			    console.log(JSON.parse(body).Title);
			    console.log("This movie came out in " + JSON.parse(body).Year);
			    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
		  	    console.log("Rotten Tomatoes gave it " + JSON.parse(body).Rotten_Tomatoes);
		  	    console.log("Produced in " + JSON.parse(body).Country);
			    console.log("Language is " + JSON.parse(body).Language);
			    console.log("The plot is " + JSON.parse(body).Plot);
			    console.log("This actors are " +JSON.parse(body).Actors);
			});
	  	}	
};

//'Do what it says'
if (command === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if(error) {
		console.log(error);
		}	
		var songName = data.split('"')[1];
		console.log(songName);
		var params = new spotify ({
			id: 'd855e48f7a44460fb1b93307c5f572c2',
			secret: 'a2b464d9a95f4446b8ff3dd4774acd54'
		});

	    params.search({ type: 'track', query: songName }, spotifyIt);
	 
	  	function spotifyIt(error, data) {
		    if (error) {
		        console.log(error);
		    }
		 	else{
		    var songInfo = data.tracks.items[0];
		    var songResult = console.log(songInfo.artists[0].name)
		                     console.log(songInfo.album.name)
		                     console.log(songInfo.preview_url)
		    				 console.log(songResult);
		    };
		};	
	});
};


