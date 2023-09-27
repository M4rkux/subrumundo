/// <reference types="@sveltejs/kit" />
import { version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

import { PUBLIC_BASE_URL } from '$env/static/public';

self.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.add('cache.json');
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
	if (event.request.url !== `${PUBLIC_BASE_URL}/episode?page=1&amount=10`) return;

	async function respond() {
		const cache = await caches.open(CACHE);
		try {
			const responseCache = await cache.match(event.request);

			await fetch(event.request).then((response) => {
				if (response.status === 200) {
					cache.put(event.request, response.clone());
				}
			});

			return responseCache;
		} catch {
			const response = await fetch(event.request);

			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}
			return fetch('cache.json');
		}
	}

	event.respondWith(respond());
});
