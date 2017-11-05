var luis = require('./luis');

function sentToLuis(parsedMessage) {
	luis.getIntent(parsedMessage).then((output) => {
		logic(output);
		// if (output.topScoringIntent.length == 1) {
		// 	console.log("what is wrong");
		// }
	});
}

function logic(input) {
	console.log(input.intents);
	// if intents are happy
	// if intents are neutral
	// if intents are unhappy **********
		// if entity type is Work
			// if resolution value is relation
			// if resolution value is performance *****
			// if resolution value is HR *****
			// if resolution value is career
		// if entity type is Meeting ****
		// if entity type is Physical
			// if resolution value is body ******
			// if resolution value is mind ******
}

sentToLuis("my boss sucks");