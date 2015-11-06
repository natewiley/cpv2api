var request = require('request');
var express = require('express');
var cheerio = require('cheerio');
var ua = require('universal-analytics');
var visitor = ua('UA-69781500-1');
var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


app.set('port', (process.env.PORT || 3000));

app.set('view engine', 'jade');
app.use(allowCrossDomain);
app.use(express.static(__dirname + '/public'));




app.get('/', function(req, res) {
  res.render("index");
});



app.get('/pens/:type?/:user?', function(req, res){

	var query = req.query;
	var type = req.params.type ? req.params.type : 'picks';
	var username = req.params.user ? req.params.user : false;
	var page = query.page ? query.page : '1';

	var url = username ? 'http://codepen.io/'+username+'/pens/'+type+'/grid/' + page : 'http://codepen.io/pens/grid/'+type+'/'+page; 

	var endpoint = username ? "/pens/" + type + "/" + username + "/" + page : "/pens/" + type + "/" + page;

	request(url, function(err, response, body){
		if(err){
			res.send({ error: "Hmm, error occured try again" }); // lol...
		}
		// res.send(body)
		if(response.statusCode === 404){
			if(!username){
				res.send({ error: '404 from CodePen (check for typos), supported endpoints are /picks, /popular, /recent' });
			} else {
				res.send({ error: '404 from CodePen (check for typos), supported endpoints for a user are /public/{username}, /popular/{username}, /forked/{username}, /loved/{username}' });
			}
   			
		}

		var $ = cheerio.load(JSON.parse(body).page.html);
		var $pens = $('.single-pen');

		var data = [];

		$pens.each(function(){
			var $pen = $(this);
			var $link = $pen.find('h3.pen-title a');
			

			var id = $pen.attr('data-slug-hash');

			var title = $link.html().trim();
			var link = $link.attr('href');

			var views = $pen.find('.single-stat.views').text().trim();
			var loves = $pen.find('.single-stat.loves').text().trim();
			var comments = $pen.find('.single-stat.comments').text().trim();
			var user;

			if(!username){
				var $userLink = $pen.find('.username');
				user = {
					nicename: $userLink.find('span').html(),
					username: $userLink.attr('href').replace('/', ''),
					avatar: $userLink.find('img').attr('src')
				};
			} else {
				user = {
					username: username
				};
			}
			

			data.push({
				title: title,
				link: link,
				id: id,
				views: views,
				loves: loves,
				comments: comments,
				user: user

			});

		});

		if(data){
			
			res.send({
				success: 'true',
				data: data
			});
			visitor.pageview(endpoint).send();
		}
	})

	
});



app.get('/profile/:user?', function(req, res){

	
	if(!req.params.user){
		res.send({ error: 'Error.. A user must be set. like /profile/natewiley'} );
	}

	

	else {

		user = req.params.user;

		var endpoint = "/profile/" + user;

		request('http://codepen.io/' + user, function(err, response, body){
			if(response.statusCode === 404){
				res.send({ error: '404 from CodePen, are you sure you\'ve spelled the username correctly?' });
			}
			var $ = cheerio.load(body);
			var nicename = $('#profile-name-header').text().replace('PRO', '').trim();
			var username = $('#profile-username').text().replace('@', '').trim();
			var location = $('#profile-location').text().trim();
			var bio = $('#profile-bio').text().trim();
			var avatar = $('#profile-image').attr('src');

			var isPro = $('#profile-badge-pro').length ? true : false;
			var followers = $('#followers-count').html();
			var following = $('#following-count').html();
			var links = $('.profile-links a:not(#hire-me-button)');

			var profileLinks = [];
				
			if(links.length){
				links.each(function(){
					profileLinks.push($(this).attr('href'));
				});
			}

			var data = {
				nicename: nicename,
				username: username,
				avatar: avatar,
				location: location,
				bio: bio,
				pro: isPro,
				followers: followers,
				following: following,
				links: profileLinks
			};
			res.send({
				success: 'true',
				data: data
			});
			visitor.pageview(endpoint).send();
		});


	}
	
});


app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});
 
// handling 404 errors
app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }
  res.render("error", { message: err.message || "Something went wrong! Please try again." } );
});


app.listen(app.get('port'), function() {
  console.log('server runnin on ', app.get('port'));
});

