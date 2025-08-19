import { useSOLPrice } from "@hooks/useSolPrice";

export const WithSolPrice: React.FC<{ amount: number | string }> = ({
  amount,
}) => {
  const { data } = useSOLPrice();
  const price =
    parseFloat(amount.toString()) * (parseFloat(data?.toString() ?? "0") ?? 0);

  return <>${parseFloat(price as any).toFixed(2)}</>;
};
