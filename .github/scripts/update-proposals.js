const fs = require('fs');
const axios = require('axios');

const SAFE_ADDRESS = '0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0';
const CHAIN = 'arbitrum'; // Change to 'mainnet', 'optimism', 'base' etc.
const SAFE_API = `https://safe-transaction-${CHAIN}.safe.global/api/v1/safes/${SAFE_ADDRESS}/multisig-transactions/`;

const START = '<!--START_SAFE_PROPOSALS-->';
const END = '<!--END_SAFE_PROPOSALS-->';

(async () => {
  const res = await axios.get(SAFE_API);
  const proposals = res.data.results.slice(0, 5); // Limit to last 5 proposals

  const markdownList = proposals.map(p => {
    const nonce = p.nonce;
    const to = p.to;
    const value = (parseInt(p.value) / 1e18).toFixed(4);
    const link = `https://app.safe.global/transactions/tx?id=multisig_${CHAIN}:${p.safe}_${p.nonce}`;
    return `- 🔗 [Proposal #${nonce} → ${to} | ${value} ETH](${link})`;
  }).join('\n');

  const readme = fs.readFileSync('README.md', 'utf8');
  const updated = readme.replace(
    new RegExp(`${START}[\\s\\S]*?${END}`),
    `${START}\n${markdownList}\n${END}`
  );

  fs.writeFileSync('README.md', updated);
})();
