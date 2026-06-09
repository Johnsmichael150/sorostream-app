"use client";
import { useState } from "react";
import DurationPicker from "../../../components/DurationPicker";
import FlowRatePreview from "../../../components/FlowRatePreview";

export default function NewStream() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState(0);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-8">Create Stream</h1>
        <div className="space-y-6">
          <div>
            <label className="text-gray-400 text-sm block mb-2">Recipient Address</label>
            <input value={recipient} onChange={e => setRecipient(e.target.value)}
              placeholder="G..." className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white" />
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-2">Amount (USDC)</label>
            <input value={amount} onChange={e => setAmount(e.target.value)}
              placeholder="100" type="number" className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white" />
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-2">Duration</label>
            <DurationPicker onChange={setDuration} />
          </div>
          {amount && duration > 0 && <FlowRatePreview amount={amount} durationSeconds={duration} />}
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">
            Create Stream
          </button>
        </div>
      </div>
    </main>
  );
}
