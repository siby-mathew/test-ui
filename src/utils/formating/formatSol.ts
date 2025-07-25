/**
 * Formats a token balance from raw units (e.g., lamports) to human-readable form.
 * @param rawAmount raw amount in base units (e.g., lamports or smallest token unit)
 * @param mintDecimals number of decimals defined by the token mint (e.g., 9 for SOL, 6 for USDC)
 * @param displayDecimals number of decimals to show (default = 2)
 * @param suffix optional suffix like "SOL" or "USDC"
 * @returns formatted balance string
 */
export function formatTokenBalance(
  rawAmount: number | bigint,
  mintDecimals: number,

  suffix?: string,
  displayDecimals: number = 2
): string {
  const divisor = 10 ** mintDecimals;
  const balance = Number(rawAmount) / divisor;
  return `${balance.toFixed(displayDecimals)}${suffix ? ` ${suffix}` : ""}`;
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
