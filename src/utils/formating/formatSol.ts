import BigNumber from "bignumber.js";
/**
 * Formats a token balance from raw units (e.g., lamports) to human-readable form.
 * @param rawAmount raw amount in base units (e.g., lamports or smallest token unit)
 * @param mintDecimals number of decimals defined by the token mint (e.g., 9 for SOL, 6 for USDC)
 * @param displayDecimals number of decimals to show (default = 2)
 * @param suffix optional suffix like "SOL" or "USDC"
 * @returns formatted balance string
 */

type Options = {
  rawAmount: number | bigint | string;
  mintDecimals?: number;
  suffix?: string;
  decimals?: number | "auto"; // allow "auto"
  compact?: boolean;
  prefix?: string;
};

export function formatTokenBalance({
  rawAmount,
  mintDecimals = 9,
  suffix = "",
  decimals = "auto",
  compact = true,
  prefix = "",
}: Options): string {
  const divisor = new BigNumber(10).pow(mintDecimals);
  const balance = new BigNumber(rawAmount).div(divisor);

  // 🔹 Compact formatting (K, M, B, T)
  if (compact) {
    const absBalance = balance.abs();
    const units = [
      { value: 1e12, symbol: "T" },
      { value: 1e9, symbol: "B" },
      { value: 1e6, symbol: "M" },
      { value: 1e3, symbol: "K" },
    ];

    for (const unit of units) {
      if (absBalance.gte(unit.value)) {
        const val = balance.div(unit.value);
        return (
          `${prefix ? prefix + " " : ""}` +
          `${formatWithAutoDecimals(val, decimals)}` +
          unit.symbol +
          `${suffix ? ` ${suffix}` : ""}`
        );
      }
    }
  }

  // 🔹 Non-compact formatting
  return (
    `${prefix ? prefix + " " : ""}` +
    `${formatWithAutoDecimals(balance, decimals)}` +
    `${suffix ? ` ${suffix}` : ""}`
  );
}

function formatWithAutoDecimals(
  val: BigNumber,
  decimals: number | "auto"
): string {
  if (decimals === "auto") {
    if (val.gte(1)) {
      // Show up to 2 decimals for >= 1
      return val.decimalPlaces(2).toFormat();
    } else if (val.gte(0.0001)) {
      // Show up to 4 decimals for small values
      return val.decimalPlaces(4).toFormat();
    } else {
      // Tiny balances → scientific or trimmed
      return val.toPrecision(2);
    }
  } else {
    return val.decimalPlaces(decimals).toFormat();
  }
}

/**
 * Converts a human-readable amount to a BigNumber in base units.
 * E.g., "1.23" USDC → 1230000 (with 6 decimals)
 *
 * @param amount string | number input (e.g., "1.23")
 * @param decimals number of token decimals (e.g., 6 for USDC)
 * @returns BigNumber representing base units (e.g., lamports or smallest unit)
 */
export function toRawAmount(
  amount: string | number,
  decimals: number
): BigNumber {
  return new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals));
}

export const fromRawAmount = (
  rawAmount: string | number,
  decimals: number
): BigNumber => {
  return new BigNumber(rawAmount).dividedBy(new BigNumber(10).pow(decimals));
};
