import { Transaction } from "./tx-listener";
import { SpendingCategory } from "./classifier";

export interface TreasuryMetrics {
  address: string;
  totalAssets: bigint;
  monthlyBurn: number;
  runwayMonths: number;
  topRecipients: Array<{ address: string; amount: bigint; count: number }>;
  categoryDistribution: Record<SpendingCategory, number>;
  lastUpdated: number;
}

export class MetricsEngine {
  private metrics: Map<string, TreasuryMetrics> = new Map();
  private transactions: Map<string, Transaction[]> = new Map();

  async processTransaction(tx: Transaction, category: SpendingCategory) {
    // Determine which treasury this transaction belongs to
    const treasuryAddress = this.getTreasuryAddress(tx);
    if (!treasuryAddress) return;

    // Store transaction
    if (!this.transactions.has(treasuryAddress)) {
      this.transactions.set(treasuryAddress, []);
    }
    this.transactions.get(treasuryAddress)!.push(tx);

    // Update metrics
    await this.updateMetrics(treasuryAddress);
  }

  private getTreasuryAddress(tx: Transaction): string | null {
    // If transaction is from a treasury, it's an outgoing transaction
    // For now, we'll track both directions
    // In a real implementation, we'd check against registered treasuries
    return tx.from || null;
  }

  private async updateMetrics(treasuryAddress: string) {
    const txs = this.transactions.get(treasuryAddress) || [];
    
    // Calculate metrics
    const totalOutgoing = txs.reduce((sum, tx) => sum + tx.value, 0n);
    
    // Get last 30 days of transactions
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;
    const recentTxs = txs.filter((tx) => tx.timestamp >= thirtyDaysAgo);
    const monthlyBurn = Number(recentTxs.reduce((sum, tx) => sum + tx.value, 0n)) / 1e18;

    // Calculate runway (simplified - would need current balance)
    const runwayMonths = monthlyBurn > 0 ? 12 : Infinity; // Placeholder

    // Top recipients
    const recipientMap = new Map<string, { amount: bigint; count: number }>();
    txs.forEach((tx) => {
      const recipient = tx.to.toLowerCase();
      const current = recipientMap.get(recipient) || { amount: 0n, count: 0 };
      recipientMap.set(recipient, {
        amount: current.amount + tx.value,
        count: current.count + 1,
      });
    });

    const topRecipients = Array.from(recipientMap.entries())
      .map(([address, data]) => ({ address, ...data }))
      .sort((a, b) => (a.amount > b.amount ? -1 : 1))
      .slice(0, 10);

    // Category distribution (would need to track categories per tx)
    const categoryDistribution: Record<SpendingCategory, number> = {
      GRANT: 0,
      SALARY: 0,
      DEVELOPMENT: 0,
      LIQUIDITY: 0,
      MARKETING: 0,
      INFRASTRUCTURE: 0,
      OPERATIONS: 0,
      UNKNOWN: 0,
    };

    const metrics: TreasuryMetrics = {
      address: treasuryAddress,
      totalAssets: 0n, // Would need to fetch current balance
      monthlyBurn,
      runwayMonths,
      topRecipients,
      categoryDistribution,
      lastUpdated: Math.floor(Date.now() / 1000),
    };

    this.metrics.set(treasuryAddress, metrics);
  }

  getMetrics(treasuryAddress: string): TreasuryMetrics | null {
    return this.metrics.get(treasuryAddress) || null;
  }

  getAllMetrics(): TreasuryMetrics[] {
    return Array.from(this.metrics.values());
  }
}

