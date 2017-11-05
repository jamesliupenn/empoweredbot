var luis = require('./luis');

function sentToLuis(parsedMessage) {
	luis.getIntent(parsedMessage).then((output) => {
		console.log(output);
		output = JSON.parse(output);
		logic(output);
	});
}

function logic(input) {
	var topIntent = input.topScoringIntent;
	var reply = "";
	var needEntities = true;

	// has no entities, we need to ask further
	if (input.entities.length < 1) {
		// strong intent, we need to code for weak intents
		if (topIntent.score >= 0.5) {
			let intent = topIntent.intent.toLowerCase();
			reply = `What do you feel ${intent} about?`
			console.log(reply);
		}
	}
	// have entities
	else {
		let keyword = input.entities[0].entity;
		let type = input.entities[0].type;

		needEntities = false;
		// low intent, ask for more details for love/hate of the entities
		if (topIntent.score < 0.49) {
			reply = `Tell me more about your ${keyword}`;
			console.log(reply);
		}
		// strong intent, ask for confirmation
		else {
			if (topIntent.intent == "Unhappy") {
				reply = `It seems like you're having trouble with your ${keyword}`;
				console.log(reply);	
			}
		}	
	}
}

module.exports.sentToLuis = sentToLuis;

// local testing
sentToLuis("my coworkers are funny");