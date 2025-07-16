const { ethers } = require("ethers");
const { SafeFactory } = require("@safe-global/safe-core-sdk");

async function deploySafe() {
  const provider = new ethers.providers.JsonRpcProvider("YOUR_RPC_URL");
  const signer = provider.getSigner("YOUR_PRIVATE_KEY");

  const safeFactory = await SafeFactory.create({ ethers, signer });
  const safe = await safeFactory.deploySafe({
    owners: ["OWNER_ADDRESS_1", "OWNER_ADDRESS_2"],
    threshold: 2,
  });

  console.log("Safe deployed at:", safe.getAddress());
}

deploySafe().catch(console.error);
