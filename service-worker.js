var cache_name = 'v1';
self.addEventListener('install', function(event) {
	console.log('Install');
	var file_to_cache = [
	'/',
	'/libs/jquery/jquery.min.js',
	'/libs/angular/angular.min.js',
	'/libs/angular/angular-ui-router.min.js',
	'/app/app.module.js',
	'/app/app.config.js',
	'/app/routes/home/home.html',
	'/app/routes/home/home.js',
	'/app/routes/bought/bought.html',
	'/app/routes/bought/bought.js',
	'/app/styles/styles.css',
	'/libs/fonts/font-awesome/css/font-awesome.min.css',
	'/libs/materialize/materialize.min.css',
	'/libs/materialize/materialize.min.js',
	'/libs/angular/angular-materialize.min.js',
	'/libs/fonts/roboto/Roboto-Light.ttf',
	'/libs/fonts/roboto/Roboto-Light.woff',
	'/libs/fonts/roboto/Roboto-Light.woff2',
	'/libs/fonts/roboto/Roboto-Medium.ttf',
	'/libs/fonts/roboto/Roboto-Medium.woff',
	'/libs/fonts/roboto/Roboto-Medium.woff2',
	'/libs/fonts/roboto/Roboto-Regular.ttf',
	'/libs/fonts/roboto/Roboto-Regular.woff',
	'/libs/fonts/roboto/Roboto-Regular.woff2',
	'/libs/fonts/font-awesome/fonts/FontAwesome.otf?v=4.6.3',
	'/libs/fonts/font-awesome/fonts/fontawesome-webfont.eot?v=4.6.3',
	'/libs/fonts/font-awesome/fonts/fontawesome-webfont.svg?v=4.6.3',
	'/libs/fonts/font-awesome/fonts/fontawesome-webfont.ttf?v=4.6.3',
	'/libs/fonts/font-awesome/fonts/fontawesome-webfont.woff?v=4.6.3',
	'/libs/fonts/font-awesome/fonts/fontawesome-webfont.woff2?v=4.6.3'
	];

	event.waitUntil(
		caches.open(cache_name)
		.then(function(cache) {
			console.log("abrio cache");
			return cache.addAll(file_to_cache);
		})
		.catch(function(err){
			console.log("no abrio",err);
		})
		);
});

self.addEventListener('activate', function(event) {  
	console.log('Activate');
});

self.addEventListener('fetch', function(event) {

	event.respondWith(
    caches
    .match(event.request)
    .then(function(response){
    	console.log("response: ",response);
    	return response || fetch(event.request).then(function(response){
    		caches.open(cache_name).then(function(cache){
    			cache.put(event.request, response.clone());
    			return response;
    		});
    	});    	
    })
    );
});