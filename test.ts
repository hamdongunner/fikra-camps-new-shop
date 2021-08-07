const accountSid = ''; 
const authToken = ''; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({         
        body: 'Hello',     
        to: '+9647819898919',
        from: "+12566732568"
       }) 
      .then(message => console.log(message.sid)) 
      .done();