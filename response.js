var luis = require('./luis');

function sentToLuis(parsedMessage) {
	// let resbody;
	luis.getIntent(parsedMessage)

	.then((output) => {
		//console.log(output);
		output = JSON.parse(output);
		module.exports.resbody = logic(output)
		//return logic(output)

	})

}

function logic(input) {
	var topIntent = input.topScoringIntent;
	var needEntities = true;

	// has no entities, we need to ask further
	if (input.entities.length < 1) {
		// strong intent, we need to code for weak intents
		if (topIntent.score >= 0.5) {
			let intent = topIntent.intent.toLowerCase();
			let reply = `What do you feel ${intent} about?`
			return reply;
		}
	}
	// have entities
	else {
		let keyword = input.entities[0].entity;
		let type = input.entities[0].type;

		needEntities = false;
		// low intent, ask for more details for love/hate of the entities
		if (topIntent.score < 0.49) {
		let reply = `Tell me more about your ${keyword}`;
		return reply;
		}
		// strong intent, ask for confirmation
		else {
			if (topIntent.intent == "Unhappy") {
			let	reply = `It seems like you're having trouble with your ${keyword}. You can always find your department HR representative at http://www.Microsoft.com/Resources/HR.`;
			return reply;
			}
		}
	}

}

// sentToLuis("I hate my boss")

module.exports.sentToLuis = sentToLuis;


// local testing
