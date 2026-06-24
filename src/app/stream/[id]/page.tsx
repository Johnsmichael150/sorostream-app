"use client";
import { useState } from "react";
import StreamTimeline from "@/components/StreamTimeline";
import LiveCounter from "@/components/LiveCounter";
import { sorostream } from "@/src/lib/sorostream";

export default function StreamDetail({ params }: { params: { id: string } }) {
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [topUpLoading, setTopUpLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [txStatus, setTxStatus] = useState<string | null>(null);

  async function handleTopUp() {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) return;
    setTopUpLoading(true);
    setTxStatus(null);
    try {
      const result = await sorostream.topUp(params.id, topUpAmount);
      setTxStatus(`Top-up successful! Tx: ${result.txHash}`);
      setShowTopUp(false);
      setTopUpAmount("");
    } catch {
      setTxStatus("Top-up failed. Please try again.");
    } finally {
      setTopUpLoading(false);
    }
  }

  async function handleWithdraw() {
    setWithdrawLoading(true);
    setTxStatus(null);
    try {
      const result = await sorostream.withdraw();
      setTxStatus(`Withdrawal submitted! Tx: ${result.txHash}`);
    } catch {
      setTxStatus("Withdrawal failed. Please try again.");
    } finally {
      setWithdrawLoading(false);
    }
  }

  async function handleCancel() {
    setCancelLoading(true);
    setTxStatus(null);
    try {
      const result = await sorostream.cancelStream();
      setTxStatus(`Stream cancelled. Tx: ${result.txHash}`);
    } catch {
      setTxStatus("Cancellation failed. Please try again.");
    } finally {
      setCancelLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Stream #{params.id}</h1>
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6 space-y-6">
          <StreamTimeline />
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">Claimable now</p>
            <div className="text-2xl sm:text-3xl font-bold">
              <LiveCounter flowRate={0} lastWithdrawTime={new Date()} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleWithdraw}
              disabled={withdrawLoading}
              className="w-full sm:flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-busy={withdrawLoading}
              aria-label={withdrawLoading ? "Withdrawing, please wait" : "Withdraw from stream"}
            >
              {withdrawLoading ? "Withdrawing…" : "Withdraw"}
            </button>
            <button
              onClick={() => setShowTopUp(true)}
              className="w-full sm:flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              aria-label="Top up stream with additional funds"
            >
              Top Up
            </button>
            <button
              onClick={handleCancel}
              disabled={cancelLoading}
              className="w-full sm:flex-1 border border-red-600 text-red-400 py-3 rounded-lg font-medium hover:bg-red-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-busy={cancelLoading}
              aria-label={cancelLoading ? "Cancelling stream, please wait" : "Cancel stream"}
            >
              {cancelLoading ? "Cancelling…" : "Cancel"}
            </button>
          </div>

          {showTopUp && (
            <div className="bg-gray-700 rounded-lg p-4 space-y-4" role="dialog" aria-label="Top up stream form">
              <div>
                <label htmlFor="topUpAmount" className="text-gray-400 text-sm block mb-2">
                  Additional Amount (USDC)
                </label>
                <input
                  id="topUpAmount"
                  type="number"
                  min={0}
                  step="0.01"
                  value={topUpAmount}
                  onChange={e => setTopUpAmount(e.target.value)}
                  placeholder="100"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white"
                  aria-required="true"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleTopUp}
                  disabled={topUpLoading || !topUpAmount || parseFloat(topUpAmount) <= 0}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-busy={topUpLoading}
                  aria-label={topUpLoading ? "Submitting top-up, please wait" : "Confirm top-up"}
                >
                  {topUpLoading ? "Submitting…" : "Confirm"}
                </button>
                <button
                  onClick={() => { setShowTopUp(false); setTopUpAmount(""); }}
                  className="flex-1 border border-gray-500 text-gray-300 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  aria-label="Cancel top-up"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {txStatus && (
            <div className="text-sm text-center text-green-400" role="status" aria-live="polite">
              {txStatus}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
