import fs from 'fs';
import path from 'path';
import https from 'https';

const README_PATH = path.join(process.cwd(), 'README.md');
const START = '<!--START_SAFE_PROPOSALS-->';
const END = '<!--END_SAFE_PROPOSALS-->';

// Dummy Safe proposal data
const proposals = [
  { id: 1, title: 'Transfer USDC to Treasury', status: '✅ Executed' },
  { id: 2, title: 'Add New Signer', status: '🕒 Pending' },
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
  console.log('✅ README.md updated');
};

const notifySlack = () => {
  const payload = JSON.stringify({
    text: `✅ Safe proposals synced to README.md\n\n${generateMarkdown()}`,
  });

  const req = https.request(
    process.env.SLACK_WEBHOOK!,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    },
    res => {
      console.log(`🔔 Slack response: ${res.statusCode}`);
    }
  );

  req.on('error', err => console.error('Slack error:', err));
  req.write(payload);
  req.end();
};

updateReadme();
notifySlack();
