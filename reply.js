function reply(parsedMessage){
        console.log(replyMessage);
}


/*
mood/stage



Hey Alex
- Hey
mood: good, bad, nutral

General Bad mood
Is there anything bothering you?
...
Job disatisfaction:
Have you thought about talking to someone about that?
Here is person that could help you find a better position.

General disatisfaction:
Have you thought about talking to someone about that?
Take a break

Harrasment/Interpersonal
Have you told them that makes you uncomfortable, unhappy etc?
Here is a person that could help you resolve that.



nutral mood:
What did you think about the last meeting?
....
Bad:
How do you think it could be better?
Good:
What did you like about it?


Good mood:
Glad to hear you're doing well.
Anything making you happy?

Good/Nutral:
If that doesn't work you can always talk to Blank

Bad:
Here is someone you could talk to that could help you.

*/





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
