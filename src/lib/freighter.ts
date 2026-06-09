export async function connectWallet(): Promise<string> {
  if (typeof window === 'undefined') return '';
  try {
    const freighter = (window as any).freighter;
    if (!freighter) throw new Error('Freighter not installed');
    return await freighter.getPublicKey();
  } catch (e) {
    console.error(e);
    return '';
  }
}
export async function getPublicKey(): Promise<string> {
  return connectWallet();
}
export async function signTransaction(xdr: string): Promise<string> {
  if (typeof window === 'undefined') return xdr;
  try {
    const freighter = (window as any).freighter;
    return await freighter.signTransaction(xdr);
  } catch (e) {
    console.error(e);
    return xdr;
  }
}
export async function isFreighterInstalled(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  return !!(window as any).freighter;
}
