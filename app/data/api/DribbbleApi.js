// Add ACCESS_TOKEN in a gitignore file.. Config..
"use strict";
var Rx = require('@reactivex/rxjs');

const API_URL = "https://api.dribbble.com/v1/";
const ACCESS_TOKEN = "9f5ea9ce279f1bad58a016d6736674c83cf64b5f40ec891e2a78be778cd02a47";

function fetchData(URL) {
	console.log("fetchData: ", URL);
	var promise = fetch(URL, {
		headers: {
			"Authorization": "Bearer " + ACCESS_TOKEN
		}
	}).then((response) => response.json());

	return Rx.Observable.defer(() => Rx.Observable.fromPromise(promise));
	//
}

module.exports = {
	popularShotsGET: function(pageNumber: ?number): ?Object {
		var URL = API_URL + "/shots";
		if (pageNumber) {
			URL += "?per_page=14&page=" + pageNumber;
		}

		return fetchData(URL);
	}
};
