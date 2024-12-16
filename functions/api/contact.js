export async function onRequestPost(ctx) {
  try {
    return await handleRequest(ctx);
  } catch(e) {
    return new Response(`${e.message}\n${e.stack}`, { status: 500 }); 
  }
}

async function handleRequest({ request, env }) {
  const data = await request.formData();

  // Grab the form fields
  const name = data.get('name');
  const message = data.get('message');
  const email = data.get('email');

  // Validate the JSON
  if (!name || !message || !email) {
    return new Response('Make sure the all the fields are filled out and try again.', { status: 400 });
  }

  if (false) {
    return new Response(JSON.stringify({ env, }), { status: 500 });
  }

  // Send message :)
  // Just remove the comment from whichever one you want
  await sendDiscordMessage(name, message, env.DISCORD_WEBHOOK_URL);
  // await sendEmailWithSendGrid();

  return new Response('Thanks for contacting us! ');
}

// Make sure to set the "DISCORD_WEBHOOK_URL" variable
// Refer to <> for help
// ---
// This function will send a Discord message to the supplied webhook URL

env {
  DISCORD_WEBHOOK_URL="https://weightlessit.webhook.office.com/webhookb2/6f161954-bc31-46fe-b379-c3497e3fa362@f28427fe-7802-4a8a-97ef-3829d92825e6/IncomingWebhook/8467c9aea97f4cebb2e11ca4548d08a9/a9671250-5bf7-4006-abf2-dbe8d1b969ab/V2v129VXIiKA24OFSkiGfo6fivRU23S9lRphEit2AAnA41"
}

async function sendDiscordMessage(name, message, webhookUrl) {
  await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'Website Contact Form',
      embeds: [{
        title: 'New Message',
        type: 'rich',
        fields: [
          {
            name: 'Name',
            value: name,
          },
	  {
	    email: 'Email',
	    value: email,
	  }
          {
            name: 'Message',
            value: message,
          }
        ]
      }]
    }),
  });
}

// Make sure to set the "DISCORD_WEBHOOK_URL" variable
// Refer to <> for help
// ---
// This function will send an email through SendGrid
async function sendEmailWithSendGrid(details) {
  // TODO
} 