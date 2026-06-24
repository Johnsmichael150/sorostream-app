"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import StreamCard from "@/components/StreamCard";
import { sorostream, onStreamEvent } from "@/src/lib/sorostream";

interface Stream {
  id: string;
  sender: string;
  recipient: string;
  flowRate: number;
  status: string;
  deposit: number;
}

export default function Dashboard() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);

  const loadStreams = useCallback(async () => {
    const [sent, received] = await Promise.all([
      sorostream.getStreamsBySender(),
      sorostream.getStreamsByRecipient(),
    ]);
    const all = [...(sent || []), ...(received || [])] as Stream[];
    setStreams(all);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadStreams();

    const unsub1 = onStreamEvent('streamCreated', () => { loadStreams(); });
    const unsub2 = onStreamEvent('streamCancelled', () => { loadStreams(); });
    const unsub3 = onStreamEvent('streamToppedUp', () => { loadStreams(); });
    const unsub4 = onStreamEvent('streamWithdrawn', () => { loadStreams(); });

    return () => {
      unsub1();
      unsub2();
      unsub3();
      unsub4();
    };
  }, [loadStreams]);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
          <Link
            href="/stream/new"
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors inline-block"
            aria-label="Create a new stream"
          >
            + New Stream
          </Link>
        </div>
        {loading ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center" role="status" aria-live="polite">
            <p className="text-gray-400">Loading streams…</p>
          </div>
        ) : streams.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400 mb-4">No streams yet</p>
            <Link href="/stream/new" className="text-green-400 hover:text-green-300">
              Create your first stream →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {streams.map(stream => (
              <Link key={stream.id} href={`/stream/${stream.id}`} className="block hover:opacity-80 transition-opacity">
                <StreamCard {...stream} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
