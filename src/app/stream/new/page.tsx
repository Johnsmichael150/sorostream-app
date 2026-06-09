"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DurationPicker from "@/components/DurationPicker";
import FlowRatePreview from "@/components/FlowRatePreview";
import WalletConnect from "@/components/WalletConnect";
import { getFreighterAdapter } from "@/src/lib/freighter";
import { createClient } from "@/src/lib/sorostream";

export default function NewStreamPage() {
  const router = useRouter();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [autoRenew, setAutoRenew] = useState(false);
  const [token, setToken] = useState(process.env.NEXT_PUBLIC_USDC_ADDRESS ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const adapter = await getFreighterAdapter();
      const client = createClient(adapter);
      const { streamId } = await client.createStream({
        recipient,
        token,
        amount: toStroops(amount),
        durationSeconds,
        autoRenew,
      });
      router.push(`/stream/${streamId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create stream");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <span className="text-xl font-bold text-slate-900">SoroStream</span>
        <WalletConnect />
      </nav>

      <div className="mx-auto max-w-lg px-6 py-10">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Create Stream</h1>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Recipient */}
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Recipient Address</span>
            <input
              type="text"
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="G…"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </label>

          {/* Token */}
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Token Contract (USDC)</span>
            <input
              type="text"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="C…"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </label>

          {/* Amount */}
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Amount (USDC)</span>
            <input
              type="number"
              required
              min="0.0000001"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </label>

          {/* Duration */}
          <div>
            <span className="text-sm font-medium text-slate-700">Duration</span>
            <div className="mt-1">
              <DurationPicker onChange={setDurationSeconds} />
            </div>
          </div>

          {/* Flow rate preview */}
          {amount && durationSeconds > 0 && (
            <FlowRatePreview amount={amount} durationSeconds={durationSeconds} />
          )}

          {/* Auto-renew */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRenew}
              onChange={(e) => setAutoRenew(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <span className="text-sm text-slate-700">Auto-renew on completion</span>
          </label>

          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={loading || durationSeconds === 0}
            className="w-full rounded-xl bg-sky-600 py-3 font-semibold text-white hover:bg-sky-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Creating…" : "Create Stream"}
          </button>
        </form>
      </div>
    </main>
  );
}
