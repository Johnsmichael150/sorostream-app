"use client";
import { useState } from "react";
import DurationPicker from "@/components/DurationPicker";
import FlowRatePreview from "@/components/FlowRatePreview";
import { sorostream } from "@/src/lib/sorostream";

export default function NewStream() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    if (!recipient || !amount || duration <= 0) return;
    setLoading(true);
    setError(null);
    try {
      await sorostream.createStream();
    } catch {
      setError("Failed to create stream. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Create Stream</h1>
        <div className="space-y-6">
          <div>
            <label htmlFor="recipient" className="text-gray-400 text-sm block mb-2">
              Recipient Address
            </label>
            <input
              id="recipient"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              placeholder="G..."
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="amount" className="text-gray-400 text-sm block mb-2">
              Amount (USDC)
            </label>
            <input
              id="amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="100"
              type="number"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white"
              aria-required="true"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-2">Duration</label>
            <DurationPicker onChange={setDuration} />
          </div>
          {amount && duration > 0 && <FlowRatePreview amount={amount} durationSeconds={duration} />}
          {error && (
            <div className="text-sm text-center text-red-400" role="alert" aria-live="assertive">
              {error}
            </div>
          )}
          <button
            onClick={handleCreate}
            disabled={loading || !recipient || !amount || duration <= 0}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-busy={loading}
            aria-label={loading ? "Creating stream, please wait" : "Create stream"}
          >
            {loading ? "Creating…" : "Create Stream"}
          </button>
        </div>
      </div>
    </main>
  );
}
