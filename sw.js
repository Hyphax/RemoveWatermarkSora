// Service Worker for RemoveWatermarkSora.net
// Provides offline functionality and aggressive caching for performance

const CACHE_NAME = 'removewatermarksora-v1.0.0';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Static assets cached');
                return self.skipWaiting();
            })
            .catch(err => console.log('Service Worker: Cache failed', err))
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache !== STATIC_CACHE && cache !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Clearing old cache', cache);
                            return caches.delete(cache);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    
    // Skip non-GET requests
    if (request.method !== 'GET') return;
    
    // Skip cross-origin requests (except fonts)
    if (!request.url.startsWith(self.location.origin) && 
        !request.url.includes('fonts.googleapis.com') &&
        !request.url.includes('fonts.gstatic.com')) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    // Serve from cache
                    return cachedResponse;
                }
                
                // Fetch from network and cache dynamically
                return fetch(request)
                    .then(networkResponse => {
                        // Check if valid response
                        if (!networkResponse || 
                            networkResponse.status !== 200 || 
                            networkResponse.type !== 'basic') {
                            return networkResponse;
                        }
                        
                        // Clone response for caching
                        const responseToCache = networkResponse.clone();
                        
                        // Cache dynamic content
                        if (shouldCache(request)) {
                            caches.open(DYNAMIC_CACHE)
                                .then(cache => {
                                    cache.put(request, responseToCache);
                                });
                        }
                        
                        return networkResponse;
                    })
                    .catch(() => {
                        // Offline fallback
                        if (request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        // Return cached version if available
                        return caches.match(request);
                    });
            })
    );
});

// Helper function to determine if request should be cached
function shouldCache(request) {
    const url = request.url;
    
    // Cache images, stylesheets, scripts
    if (request.destination === 'image' ||
        request.destination === 'style' ||
        request.destination === 'script') {
        return true;
    }
    
    // Cache fonts
    if (url.includes('fonts.googleapis.com') || 
        url.includes('fonts.gstatic.com')) {
        return true;
    }
    
    // Cache API responses (if any)
    if (url.includes('/api/')) {
        return true;
    }
    
    return false;
}

// Background sync for analytics (optional)
self.addEventListener('sync', (event) => {
    if (event.tag === 'analytics-sync') {
        event.waitUntil(syncAnalytics());
    }
});

async function syncAnalytics() {
    // Sync offline analytics data when connection restored
    try {
        const cache = await caches.open('analytics-cache');
        const requests = await cache.keys();
        
        for (const request of requests) {
            try {
                await fetch(request);
                await cache.delete(request);
            } catch (error) {
                console.log('Analytics sync failed for:', request.url);
            }
        }
    } catch (error) {
        console.log('Analytics sync error:', error);
    }
}

// Push notification handler (future feature)
self.addEventListener('push', (event) => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/icon-192x192.png',
        badge: '/icon-72x72.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/'
        },
        actions: [
            {
                action: 'open',
                title: 'Open',
                icon: '/icon-32x32.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icon-32x32.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'close') {
        return;
    }
    
    const url = event.notification.data?.url || '/';
    
    event.waitUntil(
        clients.openWindow(url)
    );
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
    const { type, payload } = event.data;
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'GET_CACHE_SIZE':
            getCacheSize().then(size => {
                event.ports[0].postMessage({ type: 'CACHE_SIZE', size });
            });
            break;
            
        case 'CLEAR_CACHE':
            clearAllCaches().then(() => {
                event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
            });
            break;
            
        default:
            console.log('Unknown message type:', type);
    }
});

// Helper function to get cache size
async function getCacheSize() {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
                const responseClone = response.clone();
                const blob = await responseClone.blob();
                totalSize += blob.size;
            }
        }
    }
    
    return totalSize;
}

// Helper function to clear all caches
async function clearAllCaches() {
    const cacheNames = await caches.keys();
    
    return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
}

// Performance monitoring
self.addEventListener('fetch', (event) => {
    // Track fetch performance
    const start = performance.now();
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                const end = performance.now();
                const duration = end - start;
                
                // Log slow responses
                if (duration > 1000) {
                    console.log('Slow response:', event.request.url, `${duration}ms`);
                }
                
                return response || fetch(event.request);
            })
    );
});

// Error reporting
self.addEventListener('error', (event) => {
    console.error('Service Worker error:', event.error);
    
    // Optional: Send error to analytics
    if ('navigator' in self && 'sendBeacon' in navigator) {
        navigator.sendBeacon('/api/errors', JSON.stringify({
            error: event.error.message,
            stack: event.error.stack,
            timestamp: Date.now()
        }));
    }
});

// Unhandled promise rejections
self.addEventListener('unhandledrejection', (event) => {
    console.error('Service Worker unhandled rejection:', event.reason);
    
    // Optional: Send error to analytics
    if ('navigator' in self && 'sendBeacon' in navigator) {
        navigator.sendBeacon('/api/errors', JSON.stringify({
            error: 'Unhandled promise rejection',
            reason: event.reason,
            timestamp: Date.now()
        }));
    }
});

console.log('Service Worker loaded successfully');