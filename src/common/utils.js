export function hasSesh(bucket) {
	return sessionStorage && !!sessionStorage[bucket];
}
export function getSesh(bucket, getJSON = true) {
	if (!sessionStorage) return undefined;
	try {
		if (getJSON) return JSON.parse(sessionStorage.getItem(bucket));
		return sessionStorage.getItem(bucket);
	} catch (e) {
		console.error(`Unable to get session variable ${bucket}`, e);
	}
	return undefined;
}

export function setSesh(key, data) {
	if (!key || !data) {
		console.error('Cannot set session variable - invalid params');
		return false;
	}
	try {
		if (typeof data === 'object') data = JSON.stringify(data);
		sessionStorage.setItem(key, data);
		return true;
	} catch (e) {
		console.error(`Unable to set session variable ${bucket} with data:`, data, e);
	}
	return false;
}

export function clearSesh(key) {
	try {
		sessionStorage.removeItem(key)
	} catch (e) {
		console.error('Unable to clear item', key, e);
	}
}

export function loadBGImage(imageUrl, callback) {
	if (!imageUrl || !imageUrl.length) return;
	let img = new Image()
	img.onload = _ => {
		try {
			if (callback) callback();
		} catch (e) {
			console.error('Failed to load image');
		}
	}
	img.src = imageUrl;
}