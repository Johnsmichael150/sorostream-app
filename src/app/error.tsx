"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 sm:p-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>
        <p className="text-slate-500 mb-6 max-w-md text-sm sm:text-base" role="alert">{error.message}</p>
        <button
          onClick={reset}
          className="rounded-lg bg-sky-600 px-5 py-2 font-medium text-white hover:bg-sky-700 transition-colors"
          aria-label="Try again"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
