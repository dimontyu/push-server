//генерация вапид ключей node keys.js и записать к себе 
const webpush = require('web-push');
const vapidKeys = webpush.generateVAPIDKeys();

// Prints 2 URL Safe Base64 Encoded Strings
console.log(vapidKeys.publicKey, vapidKeys.privateKey);