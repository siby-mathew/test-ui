/**
 * Converts lamports to formatted SOL string
 * @param lamports number of lamports (1 SOL = 1_000_000_000 lamports)
 * @param decimals how many decimal places to show (default = 4)
 * @returns formatted SOL string (e.g., "1.2345 SOL")
 */
export function formatSolBalance(
  lamports: number,
  decimals: number = 2
): string {
  const sol = lamports / 1_000_000_000;
  return `${sol.toFixed(decimals)} SOL`;
}
