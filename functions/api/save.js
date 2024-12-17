export async function onRequestPost(ctx) {
  try {
    return await handleRequest(ctx);
  } catch(e) {
    return new Response(`${e.message}\n${e.stack}`, { status: 500 }); 
  }
}

  // Grab the form fields
  const name = data.get('name');
  const message = data.get('message');
  const email = data.get('email');
  
curl -H 'content-type: application/json' -d '{"text": [name] - [email] - [message]}' "https://weightlessit.webhook.office.com/webhookb2/6f161954-bc31-46fe-b379-c3497e3fa362@f28427fe-7802-4a8a-97ef-3829d92825e6/IncomingWebhook/8467c9aea97f4cebb2e11ca4548d08a9/a9671250-5bf7-4006-abf2-dbe8d1b969ab/V2v129VXIiKA24OFSkiGfo6fivRU23S9lRphEit2AAnA41"