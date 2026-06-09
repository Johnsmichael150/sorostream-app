"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import StreamTimeline from "@/components/StreamTimeline";
import LiveCounter from "@/components/LiveCounter";
import WalletConnect from "@/components/WalletConnect";
import { getFreighterAdapter } from "@/src/lib/freighter";
import { createClient } from "@/src/lib/sorostream";

function DetailSkeleton() {
  return (
    <div className="space-y-4 animate-pulse" aria-busy="true">
      <div className="h-8 w-48 rounded-lg bg-slate-200" />
      <div className="h-32 rounded-xl bg-slate-200" />
      <div className="h-16 rounded-xl bg-slate-200" />
    </div>
  );
}

export default function StreamDetailPage() {
  const params = useParams<{ id: string }>();
  const [stream, setStream] = useState<Stream | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  async function loadStream() {
    try {
      const adapter = await getFreighterAdapter();
      const client = createClient(adapter);
      const s = await client.getStream(params.id);
      setStream(s);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load stream");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadStream(); }, [params.id]);

  async function handleWithdraw() {
    if (!stream) return;
    setActionLoading(true);
    try {
      const adapter = await getFreighterAdapter();
      const client = createClient(adapter);
      await client.withdraw({ streamId: stream.id });
      await loadStream();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Withdraw failed");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleCancel() {
    if (!stream) return;
    setActionLoading(true);
    try {
      const adapter = await getFreighterAdapter();
      const client = createClient(adapter);
      await client.cancelStream({ streamId: stream.id });
      await loadStream();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cancel failed");
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <Link href="/dashboard" className="text-xl font-bold text-slate-900">SoroStream</Link>
        <WalletConnect />
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-10">
        <Link href="/dashboard" className="text-sm text-sky-600 hover:underline mb-4 inline-block">
          ← Back to Dashboard
        </Link>

        <h1 className="mb-6 text-2xl font-bold text-slate-900">Stream #{params.id}</h1>

        {loading && <DetailSkeleton />}
        {error && <p className="text-red-600" role="alert">{error}</p>}

        {stream && (
          <div className="space-y-6">
            {/* Timeline */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <StreamTimeline stream={stream} />
            </div>

            {/* Details */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-3 text-sm">
              <dl className="space-y-2">
                {[
                  ["From", `${stream.sender.slice(0, 8)}…${stream.sender.slice(-6)}`],
                  ["To", `${stream.recipient.slice(0, 8)}…${stream.recipient.slice(-6)}`],
                  ["Total Deposit", `${formatUSDC(stream.deposit)} USDC`],
                  ["Flow Rate", `${formatUSDC(stream.flowRate * 86_400n)} USDC/day`],
                  ["Status", stream.status],
                  ["Auto-renew", stream.autoRenew ? "Yes" : "No"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="font-medium text-slate-800 font-mono">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Live claimable */}
            {stream.status === "Active" && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center">
                <p className="text-sm text-slate-600 mb-1">Currently Claimable</p>
                <LiveCounter
                  initialStroops={stream.flowRate * BigInt(Math.max(0, Math.floor(Date.now() / 1000) - stream.lastWithdrawTime))}
                  flowRatePerSecond={stream.flowRate}
                  endTime={stream.endTime}
                />
              </div>
            )}

            {/* Actions */}
            {stream.status === "Active" && (
              <div className="flex gap-3">
                <button
                  onClick={handleWithdraw}
                  disabled={actionLoading}
                  className="flex-1 rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  Withdraw
                </button>
                <button
                  onClick={handleCancel}
                  disabled={actionLoading}
                  className="flex-1 rounded-xl border border-red-300 py-3 font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
