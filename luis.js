'use strict';

const request = require('request');
const querystring = require('querystring');
require('dotenv').config();


module.exports = {
	getIntent: function(utterance) {
		var endpoint = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/";

		// Set the LUIS_APP_ID environment variable 
		var luisAppId = process.env.LuisAppId;

		// Set the LUIS_SUBSCRIPTION_KEY environment variable
		var queryParams = {
			"subscription-key": process.env.LuisSubscriptionKey,
			"timezoneOffset": "0",
			"verbose":  true,
			"q": utterance
		}
		var luisURL = endpoint + luisAppId + '?' + querystring.stringify(queryParams);

		if (utterance) {
			return new Promise((resolve, reject) => {
				request(luisURL, (err, data) => {
					if (err) {
						return reject(err);
					}
					resolve(data);
				});
			})
			.then((data) => {
				var output = data.body;
				return(output);
			})
			.then((output) => {
				console.log(output);
			})
		}
		else {
			return console.log("What did you say again?");
		}
	}
}

