// Add ACCESS_TOKEN in a gitignore file.. Config..
"use strict";
var Rx = require('@reactivex/rxjs');

const API_URL = "https://api.dribbble.com/v1/";
const PLAIN_API_URL = "https://dribbble.com";
const ACCESS_TOKEN = "9f5ea9ce279f1bad58a016d6736674c83cf64b5f40ec891e2a78be778cd02a47";


const CLIENT_ID = "e57c5114abf35b304afcea1cf56715b99b73f0b1b679a6a7d3bfcd038ab9fb5f";
const CLIENT_SECRET = "7a44a0de0e0e10cbb0a0af86b38eb518bf2fa15d3cfe011b396a8439d568c2a7";

function fetchData(URL) {
	console.log("fetchData: ", URL);
	var promise = fetch(URL, {
		headers: {
			"Authorization": "Bearer " + ACCESS_TOKEN
		}
	}).then((response) => response.json());

	return Rx.Observable.defer(() => Rx.Observable.fromPromise(promise));
}

function postData(URL) {
	var promise = fetch(URL, {
		method: 'POST',
		headers: {
			"Authorization": "Bearer " + ACCESS_TOKEN
		}
	}).then((response) => response.json());

	return Rx.Observable.defer(() => Rx.Observable.fromPromise(promise));


	// var request = new Request(URL, {
	// 	method: 'POST',
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });
	// var promise = fetch(request)
	// 	.then((response) => {
    //
    //
	// 		console.log("postData return: " + response);
	// 		return response;
	// 	});
    //
	// return Rx.Observable.defer(() => Rx.Observable.fromPromise(promise));
}

function fetchHTML(URL) {
	console.log("fetchHTML: ", URL);
	var promise = fetch(URL, {
		headers: {
			"Authorization": "Bearer " + ACCESS_TOKEN,
			"Content-Type": "text/html"
		}
	}).then((response) => response.text());

	return Rx.Observable.defer(() => Rx.Observable.fromPromise(promise));
}

module.exports = {
	popularShotsGET: function(pageNumber: ?number): ?Object {
		var URL = API_URL + "/shots";
		if (pageNumber) {
			URL += `?per_page=14&page=${pageNumber}`;
		}

		return fetchData(URL);
	},

	search: function(query, pageNumber: ?number): ?Object {
		var URL = PLAIN_API_URL + "/search";
		if (pageNumber) {
			URL += `?q=${query}&per_page=14&page=${pageNumber}`
		}

		return fetchHTML(URL);
	},

	accountOAuth: function(code) {
		var URL = PLAIN_API_URL + "/oauth/token";

		// https://dribbble.com/oauth/token?client_id=e57c5114abf35b&client_secret=7a44a0de0&code=845b
		URL += `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`;

		// console.log("post URL: " + URL);


		return postData(URL);

		// return postData(request);

		// var promise = fetch(request)
		// 	.then((response) => {
        //
        //
        //
		// 		console.log("postData return: " + response);
		// 		return response.blob();
		// 	});
        //
		// return Rx.Observable.defer(() => Rx.Observable.fromPromise(promise));
	},

	getAuthUser: function(access_token) {
		var URL = API_URL + "/user";
		URL += `?access_token=${access_token}`;

		return fetchData(URL);
	}
};
