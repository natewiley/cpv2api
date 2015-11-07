# CodePen v2 API

An unofficial, public JSON API for [CodePen](http://codepen.io)

## API Endpoints

### Pens

*   [/pens/picks](/pens/picks)

    Get the latest picked pens

*   [/pens/popular](/pens/popular)

    Get the most popular pens

*   [/pens/recent](/pens/recent)

    Get recently created pens

### Example Response

`GET /pens/popular`

	{
		"success": "true",
		"data": [
			{
				"title": "CSGO Signature generator!",
				"link": "http://codepen.io/TryHardHusky/pen/KdQQVq",
				"id": "KdQQVq",
				"views": "465284",
				"loves": "206",
				"comments": "3",
				"user": {
					"nicename": "TryHardHusky",
					"username": "TryHardHusky",
					"avatar": "//s3-us-west-2.amazonaws.com/s.cdpn.io/168485/profile/profile-80_5.jpg"
				}
			},
			{
				"title": "Dynamic Image Colorizing with &lt;input type='color'&gt;",
				"link": "http://codepen.io/noahblon/pen/ZbjmbK",
				"id": "ZbjmbK",
				"views": "8236",
				"loves": "173",
				"comments": "14",
				"user": {
					"nicename": "Noah Blon",
					"username": "noahblon",
					"avatar": "//s3-us-west-2.amazonaws.com/s.cdpn.io/18515/profile/profile-80_3.jpg"
				}
			},
			{
				...
			}

You can pass the `page`parameter to paginate through results. Example: `GET /pens/popular?page=2`

### Pens by User


Get Pens for a specfic user

*   [/pens/public/natewiley](/pens/public/natewiley)

    Get natewiley's public pens

*   [/pens/popular/tmrDevelops](/pens/popular/tmrDevelops)

    Get tmrDevelops's popular pens

*   [/pens/loved/chriscoyier](/pens/loved/chriscoyier)

    Get chriscoyier's loved pens

*   [/pens/forked/cathbailh](/pens/forked/cathbailh)

    Get cathbailh's forked pens

### Example Response

`GET /pens/popular/tmrDevelops`

	{
		"success": "true",
		"data": [
			{
				"title": "Verlet",
				"link": "http://codepen.io/tmrDevelops/pen/MYVzMe",
				"id": "MYVzMe",
				"views": "21985",
				"loves": "217",
				"comments": "21",
				"user": {
					"username": "tmrDevelops"
				}
			},
			{
				"title": "Galactic Orbitals",
				"link": "http://codepen.io/tmrDevelops/pen/PqQKzJ",
				"id": "PqQKzJ",
				"views": "17191",
				"loves": "152",
				"comments": "10",
				"user": {
					"username": "tmrDevelops"
				}
			},
			{
				...
			},

You can pass the `page`parameter to paginate through results. Example: `GET /pens/popular/tmrDevelops?page=2`


### User Profiles

Get profile data for a specific user

*   [/profile/jackrugile](/profile/jackrugile)

    Get jackrugile's info

### Example Response

`GET /profile/jackrugile`

<pre>{
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
</pre>


## Example Usage

Simple example of getting the popular pens with jQuery's `.getJSON()`

<pre>$.getJSON("http://cpv2api.com/pens/popular", function(resp){
	if(resp.success){
		console.log(resp.data);
		// do something awesome
	}
});

</pre>

Inspired by Tim Pietrusky's [CodePen AwesomePI](https://github.com/TimPietrusky/codepen-awesomepi)

To my pen pals, with <span class="heart">♥</span> by [Nate Wiley](http://codepen.io/natewiley)

### License MIT