/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework.
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
const dashbot = require('dashbot')(process.env.pSlR1OnSRtC1FJKKuA2atcPtV0CMbmGLqqfqhctN).slack;

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    stateEndpoint: process.env.BotStateEndpoint,
    openIdMetadata: process.env.BotOpenIdMetadata
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot.
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })
/*
.matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
*/
.onDefault((session) => {
    session.send('You said: \'%s\'.', session.message.text);
});

bot.dialog('/', intents);

//DASHBOT STUFF

var messagebody = {
  text: session.message.text
}

//**When you first connect, tell dashbot and save the bot and team locally
request('https://slack.com/api/rtm.start?token=' + process.env.HJMgFc9oTJrbaWzdd4mL3bwr, function(error, response) {
  const parsedData = JSON.parse(response.body);

  // Tell dashbot when you connect.
  dashbot.logConnect(parsedData);
  const bot = parsedData.self;
  const team = parsedData.team;

//**When you receive a message on the websocket, tell dashbot - passing bot, team, and message.
connection.on(messagebody, function(message) {
  const parsedMessage = JSON.parse(message.utf8Data);

  // Tell dashbot when a message arrives
  dashbot.logIncoming(bot, team, parsedMessage);

//END DASHBOT STUFF
