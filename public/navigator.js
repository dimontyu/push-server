//отправка сообщения странице пользователя
/* self.addEventListener('message', async (event) => {
  
    // Exit early if we don't have access to the client.
    // Eg, if it's cross-origin.
    if (!event.clientId) return;

    // Get the client.
    const client = await clients.get(event.clientId);
    // Exit early if we don't get the client.
    // Eg, if it closed.
    if (!client) return;

    // Send a message to the client.
	const eventObj=JSON.stringify({
	agent: 'hello',
	body: 'world'
	})
	
    event.source.postMessage({
      body: eventObj,
      agent: event.client.url
    });
   
  console.log('message');
}); */


addEventListener('message', event => {


  

  event.source.postMessage("Hi client");
});