
const NETWORK_PASSPHRASES: Record<Network, string> = {
  mainnet: "Public Global Stellar Network ; September 2015",
  testnet: "Test SDF Network ; September 2015",
  futurenet: "Test SDF Future Network ; October 2022",
};

/**
 * Creates a WalletAdapter backed by the Freighter browser extension.
 * Safe to call in Next.js (guards against SSR).
 */
export async function getFreighterAdapter(): Promise<WalletAdapter> {
  if (typeof window === "undefined") {
    throw new Error("Freighter is only available in the browser");
  }
  const freighter = await import("@stellar/freighter-api");

  return {
    async isConnected() {
      const result = await freighter.isConnected();
      return result.isConnected;
    },
    async getPublicKey() {
      const result = await freighter.getAddress();
      if (result.error) throw new Error(result.error.message);
      return result.address;
    },
    async signTransaction(xdr: string, network: Network) {
      const result = await freighter.signTransaction(xdr, {
        networkPassphrase: NETWORK_PASSPHRASES[network],
      });
      if (result.error) throw new Error(result.error.message);
      return result.signedTxXdr;
    },
  };
}
