import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';
import { SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit';
import { SafeServiceClient } from '@safe-global/safe-service-client';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config();

const SAFE_ADDRESSES = [
  { address: '0x10A19e7eE7d7F8a52822f6817de8ea18204F2e4f', network: 'ethereum' },
  { address: '0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0', network: 'ethereum' },
  { address: '0x821f2b40d965b81202b181Aba1c7a380C49Ed675', network: 'arbitrum' }
];

const SERVICE_URLS = {
  ethereum: 'https://safe-transaction-mainnet.safe.global',
  arbitrum: 'https://safe-transaction-arbitrum.safe.global'
};

const START = '<!--START_SAFE_PROPOSALS-->';
const END = '<!--END_SAFE_PROPOSALS-->';
const README_PATH = path.join(process.cwd(), 'README.md');

const fetchProposals = async () => {
  const allProposals: string[] = [];

  for (const { address, network } of SAFE_ADDRESSES) {
    const service = new SafeServiceClient(SERVICE_URLS[network]);

    const txs = await service.getMultisigTransactions(address);
    const items = txs.results.slice(0, 3); // limit to 3 per Safe

    for (const tx of items) {
      const status = tx.isExecuted ? '✅ Executed' : '🕒 Pending';
      allProposals.push(
        `- **${network.toUpperCase()}** Safe \`${address.slice(0, 6)}...${address.slice(-4)}\`: ${tx.dataDecoded?.method || 'Transaction'} — ${status}`
      );
    }
  }

  return allProposals.join('\n');
};

const updateReadme = async () => {
  const proposalsMarkdown = await fetchProposals();
  const readme = fs.readFileSync(README_PATH, 'utf8');
  const [before, rest] = readme.split(START);
  const [, after] = rest.split(END);

  const newContent = `${before}${START}\n${proposalsMarkdown}\n${END}${after}`;
  fs.writeFileSync(README_PATH, newContent.trim());
  console.log('✅ README.md updated with live Safe proposals');
};

const notifySlack = async () => {
  const payload = JSON.stringify({
    text: `📢 Safe proposals synced to README.md\n\n${await fetchProposals()}`
  });

  const req = https.request(
    process.env.SLACK_WEBHOOK!,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    },
    res => console.log(`🔔 Slack webhook response: ${res.statusCode}`)
  );

  req.on('error', err => console.error('Slack error:', err));
  req.write(payload);
  req.end();
};

(async () => {
  await updateReadme();
  await notifySlack();
})();
