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
	'/libs/font-awesome/font-awesome.min.css',
	'/libs/fonts/font-awesome/FontAwesome.otf',
	'/libs/fonts/font-awesome/fontawesome-webfont.eot',
	'/libs/fonts/font-awesome/fontawesome-webfont.svg',
	'/libs/fonts/font-awesome/fontawesome-webfont.ttf',
	'/libs/fonts/font-awesome/fontawesome-webfont.woff',
	'/libs/fonts/font-awesome/fontawesome-webfont.woff2',
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
	'/libs/fonts/roboto/Roboto-Regular.woff2'
	];

	event.waitUntil(
		caches.open(cache_name)
		.then(function(cache) {
			console.log("abrio cache");
			return cache.addAll(file_to_cache);
		})
		.then(function(){
			return self.skipWaiting();
		})
		.catch(function(err){
			console.log("no abrio",err);
		})
		);
});

self.addEventListener('activate', function(event) {  
	var cacheWhitelist = ['v1'];
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames){
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheWhitelist.indexOf(cacheName) === -1){
						return caches.delete(cacheName);
					}
				})
				)
		})
		);
});

self.addEventListener('fetch', function(event) {
	console.log('Fetch event: ', event);
	event.respondWith(
    // new Response('Hello from your friendly neighbourhood service worker!')
    caches
    .match(event.request)
    .then(function(response){
    	if(!response || response.status !== 200 || response.type !== 'basic'){
    		return response;
    	}
    	var responseToCache = response.clone();
    	caches.open(cache_name)
    	.then(function(cache){
    		cache.put(event.request, responseToCache);
    	});
    	return response;
    	// return response || fetch(event.request).then(function(response){
    	// 	caches.open(cache_name).then(function(cache){
    	// 		cache.put(event.request, response.clone());
    	// 		console.log('response: ', response);
    	// 		return response;
    	// 	});
    	// });
    })
    );
});