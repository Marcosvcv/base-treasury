import { Router } from "express";
import { ethers } from "ethers";
import { config } from "dotenv";

config();

const router = Router();
const provider = new ethers.JsonRpcProvider(
  process.env.BASE_RPC_URL || "https://mainnet.base.org"
);

// Mock data store (in production, use database)
const mockMetrics: Record<string, any> = {};

/**
 * GET /treasury/:address/overview
 * Get treasury overview
 */
router.get("/:address/overview", async (req, res) => {
  try {
    const { address } = req.params;
    
    if (!ethers.isAddress(address)) {
      return res.status(400).json({ error: "Invalid address" });
    }

    // Get current balance
    const balance = await provider.getBalance(address);
    
    // Get metrics (would come from database/indexer)
    const metrics = mockMetrics[address.toLowerCase()] || {
      monthlyBurn: 0,
      runwayMonths: 0,
      topCategory: "UNKNOWN",
    };

    res.json({
      address,
      balance: ethers.formatEther(balance),
      balanceWei: balance.toString(),
      ...metrics,
    });
  } catch (error) {
    console.error("Error getting overview:", error);
    res.status(500).json({ error: "Failed to get overview" });
  }
});

/**
 * GET /treasury/:address/spending
 * Get spending breakdown
 */
router.get("/:address/spending", async (req, res) => {
  try {
    const { address } = req.params;
    
    if (!ethers.isAddress(address)) {
      return res.status(400).json({ error: "Invalid address" });
    }

    // Mock spending data (would come from database/indexer)
    const spending = {
      total: "0",
      byCategory: {
        GRANT: "0",
        SALARY: "0",
        DEVELOPMENT: "0",
        LIQUIDITY: "0",
        MARKETING: "0",
        INFRASTRUCTURE: "0",
        OPERATIONS: "0",
        UNKNOWN: "0",
      },
      transactions: [],
    };

    res.json(spending);
  } catch (error) {
    console.error("Error getting spending:", error);
    res.status(500).json({ error: "Failed to get spending" });
  }
});

/**
 * GET /treasury/:address/runway
 * Get runway analysis
 */
router.get("/:address/runway", async (req, res) => {
  try {
    const { address } = req.params;
    
    if (!ethers.isAddress(address)) {
      return res.status(400).json({ error: "Invalid address" });
    }

    const balance = await provider.getBalance(address);
    const balanceEth = Number.parseFloat(ethers.formatEther(balance));
    
    // Mock monthly burn (would come from metrics)
    const monthlyBurn = 10; // ETH per month
    const runwayMonths = monthlyBurn > 0 ? balanceEth / monthlyBurn : Infinity;

    res.json({
      address,
      currentBalance: balanceEth,
      monthlyBurn,
      runwayMonths: Math.floor(runwayMonths),
    });
  } catch (error) {
    console.error("Error getting runway:", error);
    res.status(500).json({ error: "Failed to get runway" });
  }
});

/**
 * GET /treasury/:address/recipients
 * Get top recipients
 */
router.get("/:address/recipients", async (req, res) => {
  try {
    const { address } = req.params;
    
    if (!ethers.isAddress(address)) {
      return res.status(400).json({ error: "Invalid address" });
    }

    // Mock recipients (would come from database/indexer)
    const recipients = [
      {
        address: "0x0000000000000000000000000000000000000000",
        amount: "0",
        count: 0,
      },
    ];

    res.json({ recipients });
  } catch (error) {
    console.error("Error getting recipients:", error);
    res.status(500).json({ error: "Failed to get recipients" });
  }
});

/**
 * GET /treasuries/top
 * Get top treasuries
 */
router.get("/top", async (req, res) => {
  try {
    // Mock top treasuries (would come from database)
    const topTreasuries = [
      {
        address: "0x0000000000000000000000000000000000000000",
        name: "Example Treasury",
        balance: "0",
        category: "DAO",
      },
    ];

    res.json({ treasuries: topTreasuries });
  } catch (error) {
    console.error("Error getting top treasuries:", error);
    res.status(500).json({ error: "Failed to get top treasuries" });
  }
});

export { router as treasuryRoutes };

