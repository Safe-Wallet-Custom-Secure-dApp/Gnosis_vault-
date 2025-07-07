import fs from 'fs';
import path from 'path';
import https from 'https';
import { ethers } from 'ethers';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import dotenv from 'dotenv';

dotenv.config();

// 🧠 Safe config
const SAFES = [
  { name: 'Ethereum Treasury 1', address: process.env.SAFE_ETH_1!, rpc: process.env.ETH_RPC!, network: 'Ethereum' },
  { name: 'Ethereum Treasury 2', address: process.env.SAFE_ETH_2!, rpc: process.env.ETH_RPC!, network: 'Ethereum' },
  { name: 'Arbitrum DAO Vault',   address: process.env.SAFE_ARB!,   rpc: process.env.ARB_RPC!, network: 'Arbitrum' }
];

const README_PATH = path.join(process.cwd(), 'README.md');
const START = '<!--START_SAFE_PROPOSALS-->';
const END = '<!--END_SAFE_PROPOSALS-->';

const getProposalsFromSafe = async ({ name, address, rpc, network }: any) => {
  try {
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = provider.getSigner();
    const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer });
    const safe = await Safe.create({ ethAdapter, safeAddress: address });

    const txHistory = await safe.getTransactionHistory();
    const txs = txHistory.results.slice(-3); // Last 3 proposals

    return txs.map((tx: any) => ({
      safe: name,
      network,
      nonce: tx.nonce,
      to: tx.to,
      executed: tx.executionDate ? '✅ Executed' : '🕒 Pending'
    }));
  } catch (err) {
    console.error(`Failed to fetch for ${name} on ${network}:`, err.message);
    return [];
  }
};

const generateMarkdown = async () => {
  const allProposals = (await Promise.all(SAFES.map(getProposalsFromSafe))).flat();

  return allProposals
    .sort((a, b) => b.nonce - a.nonce)
    .map(p => `- [${p.network}] **${p.safe}**: To \`${p.to.slice(0, 6)}...\` — ${p.executed}`)
    .join('\n');
};

const updateReadme = async () => {
  const readme = fs.readFileSync(README_PATH, 'utf8');
  const [before, rest] = readme.split(START);
  const [, after] = rest.split(END);

  const markdown = await generateMarkdown();
  const newContent = `${before}${START}
${markdown}
${END}${after}`;

  fs.writeFileSync(README_PATH, newContent.trim());
  console.log('✅ README.md updated with Safe proposals');
};

const notifySlack = async () => {
  const payload = JSON.stringify({
    text: `🔄 Synced multi-chain Safe proposals to README.md at ${new Date().toISOString()}`
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
    res => {
      console.log(`🔔 Slack response: ${res.statusCode}`);
    }
  );

  req.on('error', err => console.error('Slack error:', err));
  req.write(payload);
  req.end();
};

(async () => {
  await updateReadme();
  await notifySlack();
})();
