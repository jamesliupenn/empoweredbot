/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework.
-----------------------------------------------------------------------------*/
require('dotenv').config();
var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');
const util = require('util')
var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();
const dashbot = require('dashbot')(process.env.DASHBOT_API_KEY).slack;

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
// .onDefault((session) => {
//     session.send('Sorry, I did not understand \'%s\'.', session.message.text);
// });

// bot.dialog('/', intents);

//DASHBOT STUFF

'use strict';

if (!process.env.DASHBOT_API_KEY) {
  throw new Error('"DASHBOT_API_KEY" environment variable must be defined');
}
if (!process.env.SLACK_BOT_TOKEN) {
  throw new Error('"SLACK_BOT_TOKEN" environment variable must be defined');
}


request('https://slack.com/api/rtm.start?token='+process.env.SLACK_BOT_TOKEN, function(error, response) {
  const parsedData = JSON.parse(response.body);

  // Tell dashbot when you connect.
  dashbot.logConnect(parsedData);

  const bot = parsedData.self;
  const team = parsedData.team;
  client.on('connect', function(connection) {
    console.log('Slack bot ready');
    connection.on('message', function(message) {
      const parsedMessage = JSON.parse(message.utf8Data);

      // Tell dashbot when a message arrives
      dashbot.logIncoming(bot, team, parsedMessage);

      if (parsedMessage.type === 'message' && parsedMessage.channel &&
        parsedMessage.channel[0] === 'D' && parsedMessage.user !== bot.id) {

          //put LUIS logic here*****
        if (parsedMessage.text.length%2 === 0) {
          // reply on the web socket.
          const reply = {
            type: 'message',
            text: 'You are right when you say: '+parsedMessage.text,
            channel: parsedMessage.channel
          };

          // Tell dashbot about your response
          dashbot.logOutgoing(bot, team, reply);

          connection.sendUTF(JSON.stringify(reply));
        }
        //don't need this part
        // else {
        //   // reply using chat.postMessage
        //   const reply = {
        //     text: 'You are wrong when you say: '+parsedMessage.text,
        //     as_user: true,
        //     channel: parsedMessage.channel
        //   };
        //
        //   // Tell dashbot about your response
        //   dashbot.logOutgoing(bot, team, reply);
        //
        //   request.post('https://slack.com/api/chat.postMessage?token='+process.env.SLACK_BOT_TOKEN).form(reply);
        // }
      }

    });
  });
  client.connect(parsedData.url);
});


//END DASHBOT STUFF
