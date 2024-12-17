export async function onRequestPost(context) {
  try {
    return await handleRequest(context);
  } catch (e) {
    console.error(e);
    return new Response("Error sending message", { status: 500 });
  }
}

async function handleRequest({ request }) {
  const ip = request.headers.get("CF-Connecting-IP");

  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const token = formData.get("cf-turnstile-response");

  const tokenValidated = await validateToken(ip, token);

  if (!tokenValidated) {
    return new Response("Token validation failed", { status: 403 });
  }

  await forwardMessage(name, email, message);

  return new Response("OK", { status: 200 });
}

//async function validateToken(ip, token) {
//  const TURNSTILE_SECRET_KEY = "0x4AAAAAAAyI79hOadAGf8B24pIUx6zaSy0";

//  const formData = new FormData();
// formData.append("secret", TURNSTILE_SECRET_KEY);
//  formData.append("response", token);
//  formData.append("remoteip", ip);

//  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

//  const result = await fetch(url, {
//    body: formData,
//    method: "POST",
//  });

//  const outcome = await result.json();

//  return outcome.success;
//}

//async function forwardMessage(name, email, message) {
  // Forward the message to an email address, webhook etc.
  
//const name = data.get('name');
//const name = data.get('message');
//const name = data.get('email');

var formatted_Card_Payload = {
        "type": "message",
        "attachments": [
            {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "contentUrl": null,
                "content": {
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "type": "AdaptiveCard",
                    "version": "1.2",
                    "body": [
                        {
			    "type": "text",
			    "text": name
			},
			{
			    "type": "text",
			    "text": email
			},
			{
                "type": "TextBlock",
                "text": message
                        }
                    ]
                }
            }
        ]
    }

var webhookUrl = "https://weightlessit.webhook.office.com/webhookb2/6f161954-bc31-46fe-b379-c3497e3fa362@f28427fe-7802-4a8a-97ef-3829d92825e6/IncomingWebhook/8467c9aea97f4cebb2e11ca4548d08a9/a9671250-5bf7-4006-abf2-dbe8d1b969ab/V2v129VXIiKA24OFSkiGfo6fivRU23S9lRphEit2AAnA41";

axios.post(webhookUrl , formatted_Card_Payload )
    .then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    })
