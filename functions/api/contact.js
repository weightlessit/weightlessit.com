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


  await sendTeamsMessage(name, message, email, env.TEAMS_WEBHOOK_URL);


  return new Response('Thanks for contacting us! ');
}

// Make sure to set the "TEAMS_WEBHOOK_URL" variable in the CF pages -> variables and secrets section
// Refer to <> for help
// ---
// This function will send a Teams message to the supplied webhook URL

async function sendTeamsMessage(name, message, email, webhookUrl) {
  await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
	  type: 'message',
      summary: 'summary',
      embeds: [
            {
                "contentType":"application/vnd.microsoft.card.adaptive",
             "contentUrl":null,
             "content":{
                "$schema":"http://adaptivecards.io/schemas/adaptive-card.json",
                "type":"AdaptiveCard",
                "version":"1.2",
                "body":[
                    {
                    "type": "TextBlock",
                    "text": "For Samples and Templates, see [https://adaptivecards.io/samples](https://adaptivecards.io/samples)"
                    }
                ]
             }
          }
       ]
    })
    })
}


