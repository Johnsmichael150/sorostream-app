"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StreamCard from "@/components/StreamCard";
import WalletConnect from "@/components/WalletConnect";
import { getFreighterAdapter } from "@/src/lib/freighter";
import { createClient } from "@/src/lib/sorostream";

function StreamListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-48 animate-pulse rounded-xl bg-slate-200" />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [outgoing, setOutgoing] = useState<Stream[]>([]);
  const [incoming, setIncoming] = useState<Stream[]>([]);
  const [tab, setTab] = useState<"streaming" | "receiving">("streaming");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConnect(key: string) {
    setPublicKey(key);
    setLoading(true);
    setError(null);
    try {
      const adapter = await getFreighterAdapter();
      const client = createClient(adapter);
      const [out, inc] = await Promise.all([
        client.getStreamsBySender(key),
        client.getStreamsByRecipient(key),
      ]);
      setOutgoing(out);
      setIncoming(inc);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load streams");
    } finally {
      setLoading(false);
    }
  }

  const streams = tab === "streaming" ? outgoing : incoming;

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 md:px-12">
        <Link href="/" className="text-xl font-bold text-slate-900">SoroStream</Link>
        <div className="flex items-center gap-4">
          <Link href="/stream/new" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 transition-colors">
            New Stream
          </Link>
          <WalletConnect onConnect={handleConnect} />
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Dashboard</h1>

        {!publicKey && (
          <p className="text-slate-500">Connect your wallet to view your streams.</p>
        )}

        {publicKey && (
          <>
            {/* Tabs */}
            <div className="mb-6 flex gap-2 border-b border-slate-200">
              {(["streaming", "receiving"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    tab === t
                      ? "border-b-2 border-sky-600 text-sky-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {t === "streaming" ? "Streaming (Outgoing)" : "Receiving (Incoming)"}
                </button>
              ))}
            </div>

            {loading && <StreamListSkeleton />}
            {error && <p className="text-red-600" role="alert">{error}</p>}

            {!loading && !error && streams.length === 0 && (
              <p className="text-slate-500">No {tab} streams found.</p>
            )}

            {!loading && !error && streams.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {streams.map((s) => (
                  <Link key={s.id} href={`/stream/${s.id}`}>
                    <StreamCard stream={s} />
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
