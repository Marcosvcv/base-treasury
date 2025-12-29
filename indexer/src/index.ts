import { ethers } from "ethers";
import { config } from "dotenv";
import { TxListener } from "./tx-listener";
import { Classifier } from "./classifier";
import { MetricsEngine } from "./metrics";

config();

async function main() {
  const rpcUrl = process.env.BASE_RPC_URL || "https://mainnet.base.org";
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  console.log("🚀 Starting BaseTreasury Indexer...");
  console.log(`📡 Connected to: ${rpcUrl}`);

  const classifier = new Classifier();
  const metricsEngine = new MetricsEngine();
  const txListener = new TxListener(provider, classifier, metricsEngine);

  // Start listening
  await txListener.start();

  // Graceful shutdown
  process.on("SIGINT", async () => {
    console.log("\n🛑 Shutting down indexer...");
    await txListener.stop();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});

