"use client";
import { useEffect } from "react";
import StreamTimeline from "@/components/StreamTimeline";
import LiveCounter from "@/components/LiveCounter";
import { trackEvent } from "@/src/lib/analytics";

export default function StreamDetail({ params }: { params: { id: string } }) {
  useEffect(() => {
    trackEvent({ type: 'stream_view', streamId: params.id });
  }, [params.id]);

  function handleWithdraw() {
    trackEvent({ type: 'stream_withdraw', streamId: params.id, success: true });
    // Withdraw logic would go here
  }

  function handleCancel() {
    trackEvent({ type: 'stream_cancel', streamId: params.id, success: true });
    // Cancel logic would go here
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Stream #{params.id}</h1>
        <div className="bg-gray-800 rounded-xl p-6 space-y-6">
          <StreamTimeline />
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">Claimable now</p>
            <div className="text-3xl font-bold">
              <LiveCounter flowRate={0} lastWithdrawTime={new Date()} />
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={handleWithdraw} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">Withdraw</button>
            <button onClick={handleCancel} className="flex-1 border border-red-600 text-red-400 py-3 rounded-lg font-medium hover:bg-red-900">Cancel</button>
          </div>
        </div>
      </div>
    </main>
  );
}
