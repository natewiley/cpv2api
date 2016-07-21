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
	      "images": {
	          "small": "http://codepen.io/noahblon/pen/ZbjmbK/image/small.png",
	          "large": "http://codepen.io/noahblon/pen/ZbjmbK/image/large.png"
	      },
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
	      "images": {
	          "small": "http://codepen.io/suez/pen/gadLre/image/small.png",
	          "large": "http://codepen.io/suez/pen/gadLre/image/large.png"
	      },
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

*   [/pens/showcase/MichaelArestad](http://cpv2api.com/pens/showcase/MichaelArestad)

    Get MichaelArestad's showcase pens

#### Get pens for a user by tag

*   [/pens/public/keithwyland?tag=tenlines](/pens/public/keithwyland?tag=tenlines)

    Get keithwyland's pens tagged "tenlines"


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
		      "images": {
		          "small": "http://codepen.io/tmrDevelops/pen/MYVzMe/image/small.png",
		          "large": "http://codepen.io/tmrDevelops/pen/MYVzMe/image/large.png"
		      },
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
		      "images": {
		          "small": "http://codepen.io/tmrDevelops/pen/PqQKzJ/image/small.png",
		          "large": "http://codepen.io/tmrDevelops/pen/PqQKzJ/image/large.png"
		      },
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

### Collections

*   [/collections/picks](http://cpv2api.com/collections/picks)

    Get the latest picked collections

*   [/collections/popular](http://cpv2api.com/collections/popular)

    Get the most popular collections

#### Get collections by user

*   [/collections/popular/tholman](http://cpv2api.com/collections/popular/tholman)

    Get tholman's popular collections

*   [/collections/public/chriscoyier](http://cpv2api.com/collections/public/chriscoyier)

    Get chriscoyier's public collections

*   [/collections/loved/natewiley](http://cpv2api.com/collections/loved/natewiley)

    Get natewiley's loved collections

### Example Response

`GET /collections/loved/natewiley`

	{
	  "success": "true",
	  "data": [
	    {
	      "title": "hearted so hard",
	      "details": "",
	      "id": "AOybyj",
	      "url": "http://codepen.io/collection/AOybyj",
	      "penCount": "37 Pens",
	      "loves": "9",
	      "views": "1409",
	      "user": {
	        "nicename": "Sarah Drasner",
	        "username": "sdras",
	        "avatar": "//s3-us-west-2.amazonaws.com/s.cdpn.io/28963/profile/profile-80_3.jpg",
	        "profileUrl": "http://codepen.io/sdras"
	      }
	    },
	    {
	    	...
	    },


*** You can pass the `page`parameter to paginate through results. Example: `GET /collections/loved/natewiley?page=2`

* * *

#### Get a collection by ID

*   [/collection/AdbzyJ](http://cpv2api.com/collection/AdbzyJ)

    Get maicode's #Codevember collection

### Example Response

`GET /collection/AdbzyJ`

	{
	  "success": "true",
	  "data": [
	    {
	      "title": "Codevember Day 10",
	      "details": "

	Ele love <3

	",
	      "link": "http://codepen.io/maicodes/pen/KdrmjL",
	      "id": "KdrmjL",
	      "views": "461",
	      "loves": "14",
	      "comments": "2",
	      "images": {
	        "small": "http://codepen.io/maicodes/pen/KdrmjL/image/small.png",
	        "large": "http://codepen.io/maicodes/pen/KdrmjL/image/large.png"
	      },
	      "user": {
	        "nicename": "Mai El-Awini",
	        "username": "maicodes",
	        "avatar": "//s3-us-west-2.amazonaws.com/s.cdpn.io/290528/profile/profile-80_2.jpg"
	      }
	    },
	    {
	      "title": "Codevember Day 9",
	      "details": "

	<3 my pen pals\nExperimenting with  [Nate Wiley](\"http://codepen.io/natewiley/\")'s new API. 

	",
	      "link": "http://codepen.io/maicodes/pen/EVOYWY",
	      "id": "EVOYWY",
	      "views": "156",
	      "loves": "6",
	      "comments": "2",
	      "images": {
	        "small": "http://codepen.io/maicodes/pen/EVOYWY/image/small.png",
	        "large": "http://codepen.io/maicodes/pen/EVOYWY/image/large.png"
	      },
	      "user": {
	        "nicename": "Mai El-Awini",
	        "username": "maicodes",
	        "avatar": "//s3-us-west-2.amazonaws.com/s.cdpn.io/290528/profile/profile-80_2.jpg"
	      }
	    },
	    {
	    	...
	    },


*** You can pass the `page`parameter to paginate through results. Example: `GET /collection/AdbzyJ?page=2`

* * *

### Tags

Get tags for a user

*   [/tags/pixelass](http://cpv2api.com/tags/pixelass)

    Get pixelass's tags

You can get pens for a user by tag (shown above in pens by user)

### Example Response

`GET /tags/pixelass`

	{
	  "success": "true",
	  "data": [
	    {
	      "tag": "fractal",
	      "penCount": "103",
	      "link": "http://codepen.io/pixelass/pens/tags/?selected_tag=fractal",
	      "user": "pixelass"
	    },
	    {
	      "tag": "animation",
	      "penCount": "83",
	      "link": "http://codepen.io/pixelass/pens/tags/?selected_tag=animation",
	      "user": "pixelass"
	    },
	    {
	      "tag": "css",
	      "penCount": "53",
	      "link": "http://codepen.io/pixelass/pens/tags/?selected_tag=css",
	      "user": "pixelass"
	    },
	    {
	    	...
	    },



* * *

### Followers / Following

Get followers / following data by user.

*   [/followers/pixelass](http://cpv2api.com/followers/pixelass)

    Get pixelass's followers

*   [/following/seanseansean](http://cpv2api.com/following/seanseansean)

    Get users that seanseansean is following


### Example Response

`GET /followers/pixelass`

	{
	  "success": "true",
	  "data": [
	    {
	      "nicename": "Keith Wyland",
	      "username": "keithwyland",
	      "avatar": "//s3-us-west-2.amazonaws.com/s.cdpn.io/358/profile/profile-80_2.jpg",
	      "url": "http://codepen.io/keithwyland"
	    },
	    {
	      "nicename": "Akopczewski",
	      "username": "akopcz2",
	      "avatar": "//gravatar.com/avatar/fd0b85fdcc8b3ea17f837d748f901995?s=80",
	      "url": "http://codepen.io/akopcz2"
	    },
	    {
	      "nicename": "Mario Luevanos",
	      "username": "marioluevanos",
	      "avatar": "//s3-us-west-2.amazonaws.com/s.cdpn.io/39132/profile/profile-80_1.jpg",
	      "url": "http://codepen.io/marioluevanos"
	    },
	    {
	      ...
	    },


You can pass the `page`parameter, example: `GET /followers/pixelass?page=2`

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

### Search

Search Pens, Posts, Collections, and Users by keyword.

#### Parameters

*   `q:`

    The search query, must be passed on all search endpoints.

*   `page:`

    The current page, defaults to 1

*   `limit:`

    A username to limit the search by **(only works on search/pens endpoint)**

#### Search Endpoints

*   [/search/pens?q=fractal](http://cpv2api.com/search/pens?q=fractal)

    Search for pens containing the keyword _fractal_

*   [/search/posts?q=NightlySeaCreaturesWeekend](http://cpv2api.com/search/posts?q=NightlySeaCreaturesWeekend)

    Search posts for _NightlySeaCreaturesWeekend_

*   [/search/collections?q=forms](http://cpv2api.com/search/collections?q=forms)

    Search collections for _forms_

*   [/search/users?q=rlm](http://cpv2api.com/search/users?q=rlm)

    Search users for _rlm_

### Example Response

`GET /search/pens/?q=canvas-club`

	{
	  "success": "true",
	  "data": [
	    {
	      "title": "Enchanted",
	      "details": "<p>Parallax on canvas. </p>",
	      "link": "http://codepen.io/tmrDevelops/pen/EaNwjz",
	      "id": "EaNwjz",
	      "views": "16742",
	      "loves": "153",
	      "comments": "28",
	      "images": {
	        "small": "http://codepen.io/tmrDevelops/pen/EaNwjz/image/small.png",
	        "large": "http://codepen.io/tmrDevelops/pen/EaNwjz/image/large.png"
	      },
	      "user": {
	        "nicename": "Tiffany Rayside",
	        "username": "tmrDevelops",
	        "avatar": "//s3-us-west-2.amazonaws.com/s.cdpn.io/131045/profile/profile-80_26.jpg"
	      }
	    },
	    {
	      ...
	    },
	}


*** You can pass the `page`parameter, example: `GET /search/pens/?q=canvas-club&page=2`

* * *

### Tags

Get Pens with a tag

#### Parameters

*   `tag:`

    The tag to retrieve, must be passed on all tag endpoints.

*   `page:`

    The current page, defaults to 1

#### Tag Endpoints

*   [/tag/svg](http://cpv2api.com/tag/svg)

    Search for pens containing the keyword _svg_

#### Example Response

`GET /tag/canvas`

	{
	  "success": "true",
	  "data": [
	    {
	      "title": "Transition",
	      "details": "<p>This was a little js port I did from a flash project I stumbled upon when looking into learning more about flash\/js similarities. <\/p>",
	      "link": "http:\/\/codepen.io\/tholman\/pen\/BHohK",
	      "id": "BHohK",
	      "views": "6020",
	      "loves": "183",
	      "comments": "1",
	      "images": {
	        "small": "http:\/\/codepen.io\/tholman\/pen\/BHohK\/image\/small.png",
	        "large": "http:\/\/codepen.io\/tholman\/pen\/BHohK\/image\/large.png"
	      },
	      "user": {
	        "nicename": "Tim Holman",
	        "username": "tholman",
	        "avatar": "https:\/\/s3-us-west-2.amazonaws.com\/s.cdpn.io\/277\/profile\/profile-80_5.jpg"
	      }
	    },
	    {
	      ...
	    }
	}


*** You can pass the `page`parameter to paginate through results. Example: `GET /tag/canvas?page=2`

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