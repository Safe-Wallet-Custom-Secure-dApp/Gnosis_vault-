const slackWebhook = process.env.SLACK_WEBHOOK;
if (slackWebhook) {
  await fetch(slackWebhook, {
    method: 'POST',
    body: JSON.stringify({ text: message }),
    headers: { 'Content-Type': 'application/json' }
  });
}
