import { ethers } from "ethers";

export interface TreasuryOverview {
  address: string;
  balance: string;
  balanceWei: string;
  monthlyBurn: number;
  runwayMonths: number;
  topCategory: string;
}

export interface TreasurySpending {
  total: string;
  byCategory: Record<string, string>;
  transactions: any[];
}

export interface TreasuryRunway {
  address: string;
  currentBalance: number;
  monthlyBurn: number;
  runwayMonths: number;
}

export class BaseTreasury {
  private apiUrl: string;

  constructor(apiUrl: string = "https://api.basetreasury.org") {
    this.apiUrl = apiUrl;
  }

  /**
   * Get treasury overview
   */
  async getOverview(address: string): Promise<TreasuryOverview> {
    const response = await fetch(`${this.apiUrl}/treasury/${address}/overview`);
    if (!response.ok) {
      throw new Error(`Failed to get overview: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get spending breakdown
   */
  async getSpending(address: string): Promise<TreasurySpending> {
    const response = await fetch(`${this.apiUrl}/treasury/${address}/spending`);
    if (!response.ok) {
      throw new Error(`Failed to get spending: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get runway analysis
   */
  async getRunway(address: string): Promise<TreasuryRunway> {
    const response = await fetch(`${this.apiUrl}/treasury/${address}/runway`);
    if (!response.ok) {
      throw new Error(`Failed to get runway: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get top recipients
   */
  async getRecipients(address: string): Promise<{ recipients: any[] }> {
    const response = await fetch(
      `${this.apiUrl}/treasury/${address}/recipients`
    );
    if (!response.ok) {
      throw new Error(`Failed to get recipients: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get top treasuries
   */
  async getTopTreasuries(): Promise<{ treasuries: any[] }> {
    const response = await fetch(`${this.apiUrl}/treasuries/top`);
    if (!response.ok) {
      throw new Error(`Failed to get top treasuries: ${response.statusText}`);
    }
    return response.json();
  }
}

// Export default instance
export const baseTreasury = new BaseTreasury();

