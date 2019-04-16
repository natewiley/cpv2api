
var cluster = require("cluster");

if(cluster.isMaster){
	var numWorkers = require('os').cpus().length;

	console.log('Master cluster setting up ' + numWorkers + ' workers...');

	for(var i = 0; i < numWorkers; i++) {
			cluster.fork();
	}

	cluster.on('online', function(worker) {
			console.log('Worker ' + worker.process.pid + ' is online');
	});

	cluster.on('exit', function(worker, code, signal) {
			console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
			console.log('Starting a new worker');
			cluster.fork();
	});
} else {

	var request = require('./request'); // request helper
	var express = require('express');
	var cheerio = require('cheerio');
	var ua = require('universal-analytics');
	var visitor = ua('UA-69781500-1');
	var app = express();
	var siteUrl = 'http://codepen.io';

	// CORS middleware
	var allowCrossDomain = function(req, res, next) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET');
			res.header('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN');
			next();
	}


	app.set('port', (process.env.PORT || 3000));

	app.set('view engine', 'jade');
	app.use(allowCrossDomain);
	app.use(express.static(__dirname + '/public'));




	app.get('/', function(req, res) {
		res.render("index");
	});

	app.get(['/pens/:type?/:user?', '/collection/:id', '/search/pens', '/tag/:tag'], function(req, res){

		var query = req.query;
		var page = query.page ? query.page : '1';
		var username = req.params.user ? req.params.user : false;
		var tag = query.tag ? query.tag : false;
		var url, which, type;

		if(req.originalUrl.match(/^\/collection/)){
			which = "collection";
		} else if(req.originalUrl.match(/^\/search\/pens/)){
			which = "search";
		} else if(req.originalUrl.match(/^\/tag/)){
			which = "tag";
		} else {
			which = "pens";
		}

		if(which === "collection"){
			var id = req.params.id;
			url = siteUrl + '/collection/grid/'+id+'/'+page+'/'; 
			endpoint = "/collection/" + id + "/" + page + "/";
		} else if(which === "pens") {
			type = req.params.type ? req.params.type : 'picks';
			if(!tag){
				url = username ? siteUrl + '/'+username+'/pens/'+type+'/grid/' + page : siteUrl + '/pens/grid/'+type+'/'+page; 
				endpoint = username ? "/pens/" + type + "/" + username + "/" + page : "/pens/" + type + "/" + page;
			} else {
				url = siteUrl + "/"+username+"/pens/tags/grid/?selected_tag=" + tag;
				endpoint = username + '/pens/tag/' + tag + '/' + page;
			}
		} else if(which === "search"){
			var limit = query.limit ? query.limit : "all";
			var searchQuery = query.q ? query.q : "";
			url =  siteUrl + '/search/pens/?limit='+limit+'&page='+page+'&q=' + searchQuery;
			endpoint = '/search/pens?q=' + searchQuery + '&limit=' + limit;
		} else if(which === "tag") {
			var tag = req.params.tag;
			url = siteUrl + '/tag/grid/' + tag + '?page=' + page;
			endpoint = '/tag/' + tag + '/';
		}
		
		
		


		

		request.doRequest(url, function(err, response, body){
			if(err){
				res.send({ error: "Hmm, error occured try again" }); // lol...
			}

			if(response.statusCode === 404){
				if(!username && which !== "collection"){
					res.send({ error: '404 from CodePen (check for typos), supported endpoints are /picks, /popular, /recent' });
				} else if(which !== "collection") {
					res.send({ error: '404 from CodePen (check for typos), supported endpoints for a user are /public/{username}, /popular/{username}, /forked/{username}, /loved/{username}' });
				} else {
					res.send({ error: '404 from CodePen the check that the id of the collection is correct, like /collection/AdbzyJ' });
				}
					
			}

			var $ = ( which == "search" ) ? cheerio.load( body ) : cheerio.load( JSON.parse( body || '{}' ).page.html );
			var $pens = $('.single-pen');

			var data = [];

			$pens.each(function(){
				var $pen = $(this);
				var $link = $pen.find('h3.item-title a').length ? $pen.find('h3.item-title a') : $pen.find('h3.item-title');
				

				var id = $pen.attr('data-slug-hash');

				var title = $link.html().trim();

				var $detailsArr = $pen.find('.meta-overlay p');

				var details = '';

				if($detailsArr.length){
					$detailsArr.each(function(){
						details += '<p>' + $(this).html() + '</p>';
					});
				}

				var link = $link.attr('href') || siteUrl + "/" + username + "/pen/" + id;

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
						username: type === "showcase" ? username : String( $pen.find('iframe').data("username") || '' ).replace('/', '')
					};
				}

				var smallImg = siteUrl + "/" + user.username + "/pen/" + id + "/image/small.png";
				var largeImg = siteUrl + "/" + user.username + "/pen/" + id + "/image/large.png";
				

				data.push({
					title: title,
					details: details,
					link: link,
					id: id,
					views: views,
					loves: loves,
					comments: comments,
					images: {
						small: smallImg,
						large: largeImg
					},
					user: user

				});

			});

			if(data.length){
				
				res.send({
					success: 'true',
					data: data
				});

				visitor.pageview(endpoint).send();
			} else {
				res.send({
					error: "Error. No Pens."
				});
			}
		})

		
	});


	app.get(['/posts/:type?/:user?', '/search/posts'], function(req, res){

		var query = req.query;
		
		var type = req.params.type ? req.params.type : 'picks';
		var username = req.params.user ? req.params.user : false;
		var page = query.page ? query.page : '1';
		var which = req.originalUrl.indexOf("search/posts") > -1 ? "search" : "posts";
		var url, endpoint;

		if(which === "posts") {
			url = username ? siteUrl + '/'+username+'/posts/'+type+'/grid/' + page : siteUrl + '/posts/grid/'+type+'/'+page; 
			endpoint = username ? "/posts/" + type + "/" + username + "/" + page : "/posts/" + type + "/" + page;
		} else if(which === "search") {
			var searchQuery = query.q ? query.q : "";
			url = siteUrl + '/search/posts/?q='+searchQuery+'&page=' + page;
			endpoint = '/search/posts?q=' + searchQuery;
		}

		

		request.doRequest(url, function(err, response, body){
			if(response.statusCode === 404){
				if(!username){
					res.send({ error: '404 from CodePen (check for typos), supported endpoints are posts/picks, posts/popular' });
				} else {
					res.send({ error: '404 from CodePen (check for typos), supported endpoints for a user are posts/published/{username}, posts/popular/{username}, posts/loved/{username}' });
				}
						
			}

			$ = which === "search" ? cheerio.load(body) : cheerio.load(JSON.parse(body).page.html);
			var $posts = $('.single-post');

			var data = [];

			$posts.each(function(){
				var $post = $(this);
				var $link = $post.find('.post-title a');
				var content = $post.find(".item-content").html().trim();
				var title = $link.html().trim();
				var link = $link.attr('href');

				var views = $post.find('.single-stat.views').text().trim();
				var loves = $post.find('.single-stat.loves').text().trim();
				var comments = $post.find('.single-stat.comments').text().trim();
				var user;

				if(!username || type === "loved"){
					var $userLink = $post.find('.user a');
					user = {
						nicename: $userLink.find('span').eq(0).html().trim(),
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
					content: content,
					link: link,
					views: views,
					loves: loves,
					comments: comments,
					user: user

				});

			});

			if(data.length){
				
				res.send({
					success: 'true',
					data: data
				});

				visitor.pageview(endpoint).send();
			} else {

				res.send({
					error: "Error. No Posts."
				});

			}
		});
		
	})



	app.get('/profile/:user?', function(req, res){

		
		if(!req.params.user){
			res.send({ error: 'Error.. A user must be set. like /profile/natewiley'} );
		}

		

		else {

			user = req.params.user;

			var endpoint = "/profile/" + user;

			request(siteUrl + '/' + user, function(err, response, body){

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


	app.get(['/following/:user?', '/followers/:user?', '/search/users'], function(req, res, next){

		
		var which, user, url, endpoint;

		if(req.originalUrl.indexOf("followers") > -1) {
			which = "followers";
		} else if(req.originalUrl.indexOf("following") > -1) {
			which = "following";
		} else if(req.originalUrl.indexOf("search/users") > -1) {
			which = "search";

		}

		if(!req.params.user && which !== "search"){
			res.send({ error: 'Error.. A user must be set. like /followers/natewiley'} );
		}

		var query = req.query;
		var page = req.query.page ? req.query.page : 1;

		if(which !== "search") {

			user = req.params.user;
			url = siteUrl + "/"+ user +"/"+ which +"/grid/?page="+ page +"/";
			endpoint = which + "/" + user + "/" + page;
		} else {
			var searchQuery = query.q ? query.q : "";
			url = siteUrl + "/search/users/?q=" + searchQuery + "&page=" + page;
			endpoint = "search/users/?q=" + searchQuery + "&page=" + page;
		}
		
		
		request.doRequest(url, function(err, response, body){
			if(response.statusCode === 404){
				res.send({ error: '404 from CodePen, are you sure you\'ve spelled the username correctly?' });
			}

			$ = which === "search" ? cheerio.load(body) : cheerio.load(JSON.parse(body).page.html);
			var $userLinks = which === "search" ? $(".search-user a") : $(".user-list a");

			var data = [];

			$userLinks.each(function(){

				var $user = $(this), nicename, username;

				if(which !== "search"){
					nicename = $user.find(".user-list-name").html().trim();
					username = $user.find(".user-list-username").html().trim().replace("@", "");
				} else {
					nicename = $user.find(".search-user-name").html().trim();
					username = $user.attr("href").replace("/", "");
				}
				
				var avatar = $user.find("img").attr("src");
				var profileUrl = siteUrl + "/" + username;

				data.push({
					nicename: nicename,
					username: username,
					avatar: avatar,
					url: profileUrl
				});
			});

			if(data.length){
				res.send({
					success: 'true',
					data: data
				});

				visitor.pageview(endpoint).send();
			} else {

				res.send({
					error: "Error. Nobody home."
				});

			}
		});

	});

	app.get(['/collections/:type?/:user?','/search/collections'], function(req, res, next){
		var query = req.query;
		var searchQuery = query.q ? query.q : "";
		var page = query.page ? query.page : 1;
		var which = req.originalUrl.indexOf("/search/collections") > -1 ? "search" : "collections";
		
		var username = req.params.user ? req.params.user : false;
		var type, url, endpoint;

		if(username && !req.params.type){
			type = "public";
		} else if(!req.params.type){
			type = "picks";
		} else {
			type = req.params.type;
		}

		if(which === "search"){
			url = siteUrl + "/search/collections/?q=" + searchQuery;
			endpoint = "search/collections/?q=" + searchQuery + "&page=" + page;
		} else {
			url = username ? siteUrl + "/"+username+"/collections/"+type+"/grid/"+page+"/" : siteUrl + "/collections/grid/"+ type +"/" + page;
			endpoint = "search/collections/?q=" + searchQuery + "&page=" + page;
		}
		

		request.doRequest(url, function(err, response, body){
			if(response.statusCode === 404){
				res.send({ error: '404 from CodePen, are you sure you\'ve spelled everything correctly?' });
			}
			$ = which === "search" ? cheerio.load(body) : cheerio.load(JSON.parse(body).page.html);
			var $collections = $(".single-collection");

			var data = [];

			$collections.each(function(){

				var $collection = $(this);

				var penCount = $collection.find(".collection-count").html().trim();
				var title = $collection.find(".collection-title").html().trim();
				var details = $collection.find(".item-content").html().trim();
				var views = $collection.find('.single-stat.views').text().trim();
				var loves = $collection.find('.single-stat.loves').text().trim();

				var $user = $collection.find(".user a") ? $collection.find(".user a") : false;
				var link = $collection.find(".cover-link").attr("href");
				var collectionId = link.replace("/collection/", "").trim();
				var collectionUrl = siteUrl + "" + link;
				
				var user = {};

				if($user.length){
					
					var nicename = $user.find('span').eq(0).html().trim();
					var username = $user.attr("href").trim().replace("/", "");
					var avatar = $user.find("img").attr("src");
					var profileUrl = siteUrl + "/" + username;
					
					user.nicename = nicename;
					user.username = username;
					user.avatar = avatar;
					user.profileUrl = profileUrl;

				} else {

					user.username = req.params.user;
				}
				
				data.push({
					title: title,
					details: details,
					id: collectionId,
					url: collectionUrl,
					penCount: penCount,
					loves: loves,
					views: views,
					user: user
				});
			});

			if(data.length){
				res.send({
					success: 'true',
					data: data
				});

				visitor.pageview(endpoint).send();
			} else {

				res.send({
					error: "Error. Nobody home."
				});

			}
		});
	});

	app.get("/tags/:user", function(req, res, next){

		var query = req.query;
		var username = req.params.user;
		var cacheBust = Math.round(Math.random() * 10000);
		var url = siteUrl + "/"+ username +"/pens/tags/grid/?_cachebust=" + cacheBust;
		var endpoint = username + "/tags/";

		request.doRequest(url, function(err, response, body){
			if(response.statusCode === 404){
				res.send({ error: '404 from CodePen, are you sure you\'ve spelled everything correctly?' });
			}
			$ = cheerio.load(JSON.parse(body).page.html);

			var $tags = $(".tag-grid a");

			var data = [];

			$tags.each(function(){

				var $tag = $(this);
				
				var penCount = $tag.find(".tag-number").html().trim();
				
				$tag.find("span").remove();
				
				var tag = $tag.html().trim();
				var link = siteUrl + '/'+username+'/pens/tags/?selected_tag='+ tag;

				
				data.push({
					tag: tag,
					penCount: penCount,
					link: link,
					user: username
				});
			});


			if(data.length){
				res.send({
					success: 'true',
					data: data
				});

				visitor.pageview(endpoint).send();
			} else {

				res.send({
					error: "Error. Nobody home."
				});

			}
		});
	})

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
}
