import { ethers } from "ethers";
import { Classifier } from "./classifier";
import { MetricsEngine } from "./metrics";

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: bigint;
  timestamp: number;
  blockNumber: number;
  data: string;
}

export class TxListener {
  private provider: ethers.JsonRpcProvider;
  private classifier: Classifier;
  private metricsEngine: MetricsEngine;
  private isRunning: boolean = false;
  private treasuryAddresses: Set<string> = new Set();
  private lastProcessedBlock: number = 0;

  constructor(
    provider: ethers.JsonRpcProvider,
    classifier: Classifier,
    metricsEngine: MetricsEngine
  ) {
    this.provider = provider;
    this.classifier = classifier;
    this.metricsEngine = metricsEngine;
  }

  async start() {
    this.isRunning = true;
    console.log("👂 Listening for transactions...");

    // Load registered treasuries from registry
    await this.loadTreasuries();

    // Start polling
    this.pollBlocks();
  }

  async stop() {
    this.isRunning = false;
    console.log("⏹️  Stopped listening");
  }

  private async loadTreasuries() {
    // TODO: Load from TreasuryRegistry contract
    // For now, use example addresses
    const exampleTreasuries = [
      // Add example treasury addresses here
    ];

    exampleTreasuries.forEach((addr) => {
      this.treasuryAddresses.add(addr.toLowerCase());
    });

    console.log(`📋 Loaded ${this.treasuryAddresses.size} treasuries`);
  }

  private async pollBlocks() {
    while (this.isRunning) {
      try {
        const currentBlock = await this.provider.getBlockNumber();
        
        if (this.lastProcessedBlock === 0) {
          this.lastProcessedBlock = currentBlock - 1;
        }

        if (currentBlock > this.lastProcessedBlock) {
          await this.processBlocks(this.lastProcessedBlock + 1, currentBlock);
          this.lastProcessedBlock = currentBlock;
        }

        // Wait before next poll
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } catch (error) {
        console.error("❌ Error polling blocks:", error);
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    }
  }

  private async processBlocks(fromBlock: number, toBlock: number) {
    console.log(`📦 Processing blocks ${fromBlock} to ${toBlock}`);

    for (let blockNum = fromBlock; blockNum <= toBlock; blockNum++) {
      try {
        const block = await this.provider.getBlock(blockNum, true);
        if (!block || !block.transactions) continue;

        for (const tx of block.transactions) {
          if (typeof tx === "string") continue;
          
          const txHash = tx.hash;
          const from = tx.from?.toLowerCase() || "";
          const to = tx.to?.toLowerCase() || "";

          // Check if transaction involves a treasury
          if (
            this.treasuryAddresses.has(from) ||
            this.treasuryAddresses.has(to)
          ) {
            await this.processTransaction({
              hash: txHash,
              from: tx.from || "",
              to: tx.to || "",
              value: tx.value || 0n,
              timestamp: block.timestamp || 0,
              blockNumber: blockNum,
              data: tx.data || "0x",
            });
          }
        }
      } catch (error) {
        console.error(`❌ Error processing block ${blockNum}:`, error);
      }
    }
  }

  private async processTransaction(tx: Transaction) {
    try {
      // Classify transaction
      const category = await this.classifier.classify(tx);
      
      // Update metrics
      await this.metricsEngine.processTransaction(tx, category);

      console.log(
        `✅ Processed ${tx.hash.slice(0, 10)}... | Category: ${category} | Value: ${ethers.formatEther(tx.value)} ETH`
      );
    } catch (error) {
      console.error(`❌ Error processing transaction ${tx.hash}:`, error);
    }
  }

  addTreasury(address: string) {
    this.treasuryAddresses.add(address.toLowerCase());
    console.log(`➕ Added treasury: ${address}`);
  }
}

