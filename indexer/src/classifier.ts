import { Transaction } from "./tx-listener";
import { readFileSync } from "fs";
import { join } from "path";
import * as yaml from "yaml";

export type SpendingCategory =
  | "GRANT"
  | "SALARY"
  | "DEVELOPMENT"
  | "LIQUIDITY"
  | "MARKETING"
  | "INFRASTRUCTURE"
  | "OPERATIONS"
  | "UNKNOWN";

interface ClassificationRule {
  conditions: {
    value?: { min?: string; max?: string };
    receiver_type?: "EOA" | "CONTRACT";
    note_contains?: string[];
    to_address?: string[];
  };
}

interface ClassificationRules {
  [key: string]: ClassificationRule;
}

export class Classifier {
  private rules: ClassificationRules = {};

  constructor() {
    this.loadRules();
  }

  private loadRules() {
    try {
      const rulesPath = join(__dirname, "../../classification/rules.yaml");
      const rulesFile = readFileSync(rulesPath, "utf-8");
      this.rules = yaml.parse(rulesFile) as ClassificationRules;
      console.log("📋 Loaded classification rules");
    } catch (error) {
      console.warn("⚠️  Could not load rules.yaml, using defaults");
      this.rules = this.getDefaultRules();
    }
  }

  private getDefaultRules(): ClassificationRules {
    return {
      GRANT: {
        conditions: {
          value: { min: "0.1" },
          receiver_type: "EOA",
        },
      },
      SALARY: {
        conditions: {
          value: { min: "0.5" },
          note_contains: ["salary", "payroll"],
        },
      },
      DEVELOPMENT: {
        conditions: {
          note_contains: ["dev", "development", "code"],
        },
      },
      LIQUIDITY: {
        conditions: {
          to_address: [], // Add known DEX addresses
        },
      },
      MARKETING: {
        conditions: {
          note_contains: ["marketing", "promo", "ad"],
        },
      },
      INFRASTRUCTURE: {
        conditions: {
          note_contains: ["infra", "infrastructure", "hosting"],
        },
      },
      OPERATIONS: {
        conditions: {
          value: { min: "0.01", max: "1" },
        },
      },
    };
  }

  async classify(tx: Transaction): Promise<SpendingCategory> {
    const valueEth = Number.parseFloat(
      (Number(tx.value) / 1e18).toFixed(6)
    );

    // Check each category
    for (const [category, rule] of Object.entries(this.rules)) {
      if (this.matchesRule(tx, rule, valueEth)) {
        return category as SpendingCategory;
      }
    }

    return "UNKNOWN";
  }

  private matchesRule(
    tx: Transaction,
    rule: ClassificationRule,
    valueEth: number
  ): boolean {
    const { conditions } = rule;

    // Check value range
    if (conditions.value) {
      const min = conditions.value.min
        ? Number.parseFloat(conditions.value.min)
        : 0;
      const max = conditions.value.max
        ? Number.parseFloat(conditions.value.max)
        : Infinity;

      if (valueEth < min || valueEth > max) {
        return false;
      }
    }

    // Check receiver type (simplified - would need to check if address is contract)
    // For now, we'll skip this check

    // Check note contains (would need to decode transaction data or check memos)
    // For now, we'll skip this check

    // Check to_address
    if (conditions.to_address && conditions.to_address.length > 0) {
      if (!conditions.to_address.includes(tx.to.toLowerCase())) {
        return false;
      }
    }

    // If we get here and there are conditions, it's a match
    // Otherwise, default to false for strict matching
    return Object.keys(conditions).length > 0;
  }
}

