# CodePen v2 API

An unofficial, public JSON API for [CodePen](http://codepen.io)

## API Endpoints

### Pens

*   [/pens/picks](http://cpv2api.com/pens/picks)

    Get the latest picked pens

*   [/pens/popular](http://cpv2api.com/pens/popular)

    Get the most popular pens

*   [/pens/recent](http://cpv2api.com/pens/recent)

    Get recently created pens

### Example Response

`GET /pens/popular`

	{
	  "success": "true",
	  "data": [
	    {
	      "title": "Dynamic Image Colorizing with &lt;input type=&quot;color&quot;&gt;",
	      "details": "<p>Removes chrome from color input swatch and overlays over an image, using blend modes to colorize.  Voila!  Color changing without JS.</p>",
	      "link": "http://codepen.io/noahblon/pen/ZbjmbK",
	      "id": "ZbjmbK",
	      "views": "17920",
	      "loves": "360",
	      "comments": "22",
	      "user": {
	        "nicename": "Noah Blon",
	        "username": "noahblon",
	        "avatar": "//s3-us-west-2.amazonaws.com/s.cdpn.io/18515/profile/profile-80_3.jpg"
	      }
	    },
	    {
	      "title": "Skewed One Page Scroll",
	      "details": "",
	      "link": "http://codepen.io/suez/pen/gadLre",
	      "id": "gadLre",
	      "views": "4903",
	      "loves": "360",
	      "comments": "8",
	      "user": {
	        "nicename": "Nikolay Talanov",
	        "username": "suez",
	        "avatar": "//s3-us-west-2.amazonaws.com/s.cdpn.io/142996/profile/profile-80_5.jpg"
	      }
	    },
			{
				...
			}

You can pass the `page`parameter to paginate through results. Example: `GET /pens/popular?page=2`

* * *

### Pens by User


Get Pens for a specfic user

*   [/pens/public/natewiley](http://cpv2api.com/pens/public/natewiley)

    Get natewiley's public pens

*   [/pens/popular/tmrDevelops](http://cpv2api.com/pens/popular/tmrDevelops)

    Get tmrDevelops's popular pens

*   [/pens/loved/chriscoyier](http://cpv2api.com/pens/loved/chriscoyier)

    Get chriscoyier's loved pens

*   [/pens/forked/cathbailh](http://cpv2api.com/pens/forked/cathbailh)

    Get cathbailh's forked pens

### Example Response

`GET /pens/popular/tmrDevelops`

	{
		"success": "true",
		  "data": [
		    {
		      "title": "Verlet",
		      "details": "<p>I was trying to recreate the verlet effect on an SVG Polygon...but it has some boundary issues I need to work out.  Drag / throw the object; use the slider to change the number of points / object shape.  </p>",
		      "link": "http://codepen.io/tmrDevelops/pen/MYVzMe",
		      "id": "MYVzMe",
		      "views": "22021",
		      "loves": "217",
		      "comments": "21",
		      "user": {
		        "username": "tmrDevelops"
		      }
		    },
		    {
		      "title": "Galactic Orbitals",
		      "details": "<p>Galaxy clusters orbiting galaxy clusters, orbiting galaxy clusters...After a short while of orbiting, smaller clusters travel to the centers of larger galaxies && connections are formed</p>",
		      "link": "http://codepen.io/tmrDevelops/pen/PqQKzJ",
		      "id": "PqQKzJ",
		      "views": "19682",
		      "loves": "155",
		      "comments": "10",
		      "user": {
		        "username": "tmrDevelops"
		      }
		    },
			{
				...
			},

You can pass the `page`parameter to paginate through results. Example: `GET /pens/popular/tmrDevelops?page=2`

* * *

### Blog Posts

*   [/posts/picks](http://cpv2api.com/posts/picks)

    Get the latest picked posts

*   [/posts/popular](http://cpv2api.com/posts/popular)

    Get the most popular posts

### Example Response

`GET /posts/popular`

	{
		"success": "true",
		"data": [
			{
				"title": "Show & Tell Aboard The Queen Mary",
				"content": "I hosted a **Show & Tell** event at CSS Dev Conf 2015\. It was in the style of most [CodePen Meetups](\"http://blog.codepen.io/meetups/\") where we've been encouraging that format, since it's been so much fun. boat 

				Here's some of the things presented.

				I kicked things off by talking about SVG type a bit. [Brenna O'Brien](\"http://codepen.io/brenna/\") talked about "lockups" in her talk the day before, so I thought we could expand on that concept a little bit by creating one ourselves.

				A lockup is a typographic design. Words and letters are placed and styled very much...",
				"link": "//codepen.io/chriscoyier/post/show-tell-aboard-the-queen-mary",
				"views": "812",
				"loves": "8",
				"comments": "1",
				"user": {
					"nicename": "Chris Coyier",
					"username": "chriscoyier",
					"avatar": "//s3-us-west-2.amazonaws.com/s.cdpn.io/3/profile/profile-80_22.jpg"
				}
			},
			{
				...
			}


You can pass the `page`parameter to paginate through results. Example: `GET /posts/popular?page=2`

* * *

### Blog Posts by User

Get Posts for a specfic user

*   [/posts/published/towc](http://cpv2api.com/posts/published/towc)

    Get towc's latest posts

*   [/posts/popular/pixelass](http://cpv2api.com/posts/popular/pixelass)

    Get pixelass's popular posts

*   [/posts/loved/ImagineProgramming](http://cpv2api.com/posts/loved/ImagineProgramming)

    Get ImagineProgramming's loved posts

### Example Response

`GET /posts/published/towc`

	{
		"success": "true",
		"data": [
			{
				"title": "Why do we recreate things?",
				"content": "I can't really answer for everyone, but I do have some reasons for recreating wonderful art I see online, whether it's from codepen or not. 

				[Here is a collection of some of my recreations](\"http://codepen.io/collection/nmrjjY/\")

				gets you thinking

				I call most of my recreations "codeblind", simply because I didn't take a look at the code required to do the original animations. When you do that you are forced to come up with your own algorithms or methods to get as similar of a result as you can. Maybe you see a pen and you just think...",
				"link": "//codepen.io/towc/post/why-do-we-recreate-things",
				"views": "336",
				"loves": "7",
				"comments": "0",
				"user": {
					"username": "towc"
				}
			},
			{
				...
			},


You can pass the `page`parameter to paginate through results. Example: `GET /posts/published/towc?page=2`

* * *

### User Profiles

Get profile data for a specific user

*   [/profile/jackrugile](http://cpv2api.com/profile/jackrugile)

    Get jackrugile's info

### Example Response

`GET /profile/jackrugile`

	{
		"success": "true",
		"data": {
			"nicename": "Jack Rugile",
			"username": "jackrugile",
			"avatar": "//s3-us-west-2.amazonaws.com/s.cdpn.io/836/profile/profile-512_4.jpg",
			"location": "Denver, CO",
			"bio": "",
			"pro": true,
			"followers": "849",
			"following": "178",
			"links": [
				"https://github.com/jackrugile",
				"http://jackrugile.com",
				"http://twitter.com/jackrugile"
			]
		}
	}

* * *

## Example Usage

Simple example of getting the popular pens with jQuery's `.getJSON()`

	$.getJSON("http://cpv2api.com/pens/popular", function(resp){
		if(resp.success){
			console.log(resp.data);
			// do something awesome
		}
	});



Inspired by Tim Pietrusky's [CodePen AwesomePI](https://github.com/TimPietrusky/codepen-awesomepi)

To my pen pals, with <span class="heart">♥</span> by [Nate Wiley](http://codepen.io/natewiley)

### License MIT