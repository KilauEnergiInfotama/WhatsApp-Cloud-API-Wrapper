const { Message, WAParser, WebhookServer } = require('./');

// Replace these values with your own credentials
const apiVersion = 'YOUR_API_VERSION';
const phoneNumberId = 'YOUR_PHONE_NUMBER_ID';
const accessToken = 'YOUR_ACCESS_TOKEN';

// Create a Message instance
const message = new Message(apiVersion, phoneNumberId, accessToken);

// Send a text message
const recipientPhoneNumber = 'RECIPIENT_PHONE_NUMBER';
const messageContent = 'Hello from Whatsapp Cloud API Wrapper!';
message.sendTextMessage(recipientPhoneNumber, messageContent)
  .then(response => {
    console.log('Text message sent:', response);
  })
  .catch(error => {
    console.error('Error sending text message:', error);
  });

// Create a WebhookServer instance
const port = 3000;
const useNgrok = false; // Set to true if you want to use ngrok
const ngrokAuthToken = ''; // Add your ngrok auth token if you're using ngrok

const webhookServer = new WebhookServer(port, useNgrok, ngrokAuthToken);

// Add a listener for incoming messages
webhookServer.on('message', (data) => {
  console.log('Received message:', message);
  const parse = new WAParser(data);
  // parse message
  const parsedMessage = parse.parseMessage();
    console.log('Parsed message:', parsedMessage);
});

// Add a route for webhook verification
const callbackUrl = '/webhook';
const verificationToken = 'YOUR_VERIFICATION_TOKEN';
webhookServer.Verification(callbackUrl, verificationToken);

// Start the webhook server
webhookServer.start();
