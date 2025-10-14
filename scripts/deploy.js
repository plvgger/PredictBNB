const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying PredictionMarket contract...");

  const PredictionMarket = await ethers.getContractFactory("PredictionMarket");
  const predictionMarket = await PredictionMarket.deploy();

  await predictionMarket.waitForDeployment();

  const contractAddress = await predictionMarket.getAddress();
  console.log("PredictionMarket deployed to:", contractAddress);

  // Save the contract address for frontend use
  const fs = require('fs');
  const contractInfo = {
    address: contractAddress,
    network: network.name,
    chainId: network.config.chainId,
    deployedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    './contract-info.json',
    JSON.stringify(contractInfo, null, 2)
  );

  console.log("Contract info saved to contract-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
