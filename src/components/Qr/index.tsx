import { encodeURL } from "@solana/pay";
import { createQR } from "@solana/pay";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useRef } from "react";

export const SolanaPayQR: React.FC<{ address: string }> = ({ address }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!address) {
      return;
    }
    const recipient = new PublicKey(address);

    const url = encodeURL({ recipient });

    const qr = createQR(url, 200);

    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  }, [address]);

  return <div ref={qrRef} />;
};
