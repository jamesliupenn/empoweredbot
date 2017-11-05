        
module.exports.reply = function(request, response){

        response.send("a");
}



        // if (parsedMessage.text.length%2 === 0) {
        //   // reply on the web socket.
        //   const reply = {
        //     type: 'message',
        //     text: 'You are right when you say: '+parsedMessage.text,
        //     channel: parsedMessage.channel
        //   };

        //   // Tell dashbot about your response
        //   dashbot.logOutgoing(bot, team, reply);

        //   connection.sendUTF(JSON.stringify(reply));
        // } else {
        //   // reply using chat.postMessage
        //   const reply = {
        //     text: 'You are wrong when you say: '+parsedMessage.text,
        //     as_user: true,
        //     channel: parsedMessage.channel
        //   };
