import fs from 'fs';
import path from 'path';
import https from 'https';

const README_PATH = path.join(process.cwd(), 'README.md');
const START = '<!--START_SAFE_PROPOSALS-->';
const END = '<!--END_SAFE_PROPOSALS-->';

// 🔄 Mock Safe proposal data
const proposals = [
  { id: 1, title: 'Transfer ETH to Treasury', status: '✅ Executed' },
  { id: 2, title: 'Add New Signer to Safe', status: '🕒 Pending' },
];

const generateMarkdown = () => {
  return proposals.map(p => `- **#${p.id}**: ${p.title} — ${p.status}`).join('\n');
};

const updateReadme = () => {
  const readme = fs.readFileSync(README_PATH, 'utf8');
  const [before, rest] = readme.split(START);
  const [, after] = rest.split(END);

  const newContent = `${before}${START}
${generateMarkdown()}
${END}${after}`;

  fs.writeFileSync(README_PATH, newContent.trim());
  console.log('✅ README.md updated with latest Safe proposals.');
};

const notifySlack = () => {
  const slackWebhook = process.env.SLACK_WEBHOOK;

  if (!slackWebhook) {
    console.error('❌ SLACK_WEBHOOK not set.');
    return;
  }

  const payload = JSON.stringify({
    text: `✅ Safe proposals synced to \`README.md\`\n\n${generateMarkdown()}`,
  });

  const req = https.request(
    slackWebhook,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    },
    res => {
      console.log(`🔔 Slack webhook response: ${res.statusCode}`);
    }
  );

  req.on('error', err => console.error('Slack Error:', err));
  req.write(payload);
  req.end();
};

updateReadme();
notifySlack();
