var cache_name = 'v1';
self.addEventListener('install', function(event) {
	console.log('Install');

	var file_to_cache = [
  '/',
  '/libs/',
  '/app/'
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
	console.log('Activate');
});

self.addEventListener('fetch', function(event) {
	console.log('Fetch event: ', event);
	event.respondWith(
    // new Response('Hello from your friendly neighbourhood service worker!')
    caches
    .match(event.request)
    .then(function(response){
      return response || fetch(event.request).then(function(response){
        caches.open(cache_name).then(function(cache){
          cache.put(event.request, response.clone());
          console.log('response: ', response);
          return response;
        });
      });
    })
    );
});