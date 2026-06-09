"use client";
import StreamTimeline from "../../../components/StreamTimeline";
import LiveCounter from "../../../components/LiveCounter";

export default function StreamDetail({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Stream #{params.id}</h1>
        <div className="bg-gray-800 rounded-xl p-6 space-y-6">
          <StreamTimeline />
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">Claimable now</p>
            <div className="text-3xl font-bold">
              <LiveCounter />
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">Withdraw</button>
            <button className="flex-1 border border-red-600 text-red-400 py-3 rounded-lg font-medium hover:bg-red-900">Cancel</button>
          </div>
        </div>
      </div>
    </main>
  );
}
