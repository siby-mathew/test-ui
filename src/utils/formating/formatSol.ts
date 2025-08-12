/**
 * Formats a token balance from raw units (e.g., lamports) to human-readable form.
 * @param rawAmount raw amount in base units (e.g., lamports or smallest token unit)
 * @param mintDecimals number of decimals defined by the token mint (e.g., 9 for SOL, 6 for USDC)
 * @param displayDecimals number of decimals to show (default = 2)
 * @param suffix optional suffix like "SOL" or "USDC"
 * @returns formatted balance string
 */

type Options = {
  rawAmount: number | bigint;
  mintDecimals?: number;
  suffix?: string;
  decimals?: number;
  compact?: boolean;
  prefix?: string;
};
export function formatTokenBalance({
  rawAmount,
  mintDecimals = 9,
  suffix = "",
  decimals = 0,
  compact = true,
  prefix = "",
}: Options): string {
  const divisor = 10 ** mintDecimals;
  const balance = Number(rawAmount) / divisor;

  if (compact) {
    const absBalance = Math.abs(balance);
    const units = [
      { value: 1e12, symbol: "T" },
      { value: 1e9, symbol: "B" },
      { value: 1e6, symbol: "M" },
      { value: 1e3, symbol: "K" },
    ];

    for (const unit of units) {
      if (absBalance >= unit.value) {
        const val = balance / unit.value;
        const hasDecimals = val % 1 !== 0;
        return `${val.toLocaleString(undefined, {
          minimumFractionDigits: hasDecimals && decimals > 0 ? 1 : 0,
          maximumFractionDigits: hasDecimals && decimals > 0 ? decimals : 0,
        })}${unit.symbol}${suffix ? ` ${suffix}` : ""}`;
      }
    }
  }

  const hasDecimals = balance % 1 !== 0;
  const formatted = balance.toLocaleString(undefined, {
    minimumFractionDigits: hasDecimals && decimals > 0 ? 1 : 0,
    maximumFractionDigits: hasDecimals && decimals > 0 ? decimals : 0,
  });

  return `${prefix ? `${prefix} ` : ""}${formatted}${suffix ? ` ${suffix}` : ""}`;
}

import BigNumber from "bignumber.js";

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
