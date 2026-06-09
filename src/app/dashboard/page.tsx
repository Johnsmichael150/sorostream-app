"use client";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Link href="/stream/new" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">+ New Stream</Link>
        </div>
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <p className="text-gray-400 mb-4">No streams yet</p>
          <Link href="/stream/new" className="text-green-400 hover:text-green-300">Create your first stream →</Link>
        </div>
      </div>
    </main>
  );
}
