import BigNumber from "bignumber.js";

/**
 * Formats a token balance from raw units (e.g., lamports) to human-readable form.
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

  if (compact) {
    const compacted = formatCompact(balance, decimals);
    if (compacted) {
      return (
        `${prefix ? prefix + " " : ""}` +
        compacted +
        `${suffix ? ` ${suffix}` : ""}`
      );
    }
  }

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
      return val.decimalPlaces(2).toFormat();
    } else if (val.gte(0.0001)) {
      return val.decimalPlaces(4).toFormat();
    } else {
      return val.toPrecision(2);
    }
  } else {
    return val.decimalPlaces(decimals).toFormat();
  }
}

function formatCompact(
  val: BigNumber,
  decimals: number | "auto"
): string | null {
  const abs = val.abs();
  const units = [
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "K" },
  ];
  for (const unit of units) {
    if (abs.gte(unit.value)) {
      const scaled = val.div(unit.value);
      return `${formatWithAutoDecimals(scaled, decimals)}${unit.symbol}`;
    }
  }
  return null;
}

/**
 * Formats a USD value with compact notation and smart decimals.
 * @param value number | string | BigNumber
 * @param decimals number | "auto" (default "auto")
 * @param compact show K, M, B, T (default true)
 */
export function formatUsdValue(
  value: number | string | BigNumber,
  decimals: number | "auto" = "auto",
  compact: boolean = true
): string {
  const val = new BigNumber(value);

  if (val.isNaN()) return "$0";

  if (compact) {
    const compacted = formatCompact(val, decimals);
    if (compacted) return `$${compacted}`;
  }

  return `$${formatWithAutoDecimals(val, decimals)}`;
}

/**
 * Converts a human-readable amount to a BigNumber in base units.
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
