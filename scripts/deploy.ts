import { ethers } from "hardhat";

async function main() {
  console.log("Deploying CosmicBridge contract...");

  // Get the contract factory
  const CosmicBridge = await ethers.getContractFactory("CosmicBridge");

  // Deploy the contract with a verifier address (you can change this to your verifier address)
  const verifierAddress = "0x742d35Cc6686C49c9F3B2b36c9A36B46bEaD5C28"; // Replace with actual verifier address
  
  const cosmicBridge = await CosmicBridge.deploy(verifierAddress);

  await cosmicBridge.waitForDeployment();

  const contractAddress = await cosmicBridge.getAddress();
  
  console.log("CosmicBridge deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
  
  // Verify deployment
  const owner = await cosmicBridge.owner();
  console.log("Contract owner:", owner);
  
  // Test chain info
  const ethChain = await cosmicBridge.getChainInfo(1);
  console.log("Ethereum chain info:", ethChain);
  
  const polygonChain = await cosmicBridge.getChainInfo(137);
  console.log("Polygon chain info:", polygonChain);
  
  // Test token info
  const ethToken = await cosmicBridge.getTokenInfo(1);
  console.log("ETH token info:", ethToken);
  
  const usdcToken = await cosmicBridge.getTokenInfo(2);
  console.log("USDC token info:", usdcToken);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
