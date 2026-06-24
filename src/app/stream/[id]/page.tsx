"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import StreamTimeline from "@/components/StreamTimeline";
import LiveCounter from "@/components/LiveCounter";
import { Button, Card } from "@/components/ui";
import { sorostream } from "@/src/lib/sorostream";
import { useTranslations } from "@/src/lib/i18n";

type Stream = Awaited<ReturnType<typeof sorostream.getStream>>;

export default function StreamDetail({ params }: { params: { id: string } }) {
  const t = useTranslations("stream_detail");
  const [stream, setStream] = useState<Stream | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sorostream.getStream().then((data) => {
      setStream(data);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <p className="text-gray-400">{t("loading")}</p>
      </main>
    );
  }

  if (!stream) {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-2xl mx-auto text-center mt-24">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-2">{t("not_found_title")}</h1>
          <p className="text-gray-400 mb-8">{t("not_found_desc", { id: params.id })}</p>
          <Link href="/dashboard">
            <Button>{t("back_to_dashboard")}</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">{t("title", { id: params.id })}</h1>
        <Card padding="md" className="space-y-6">
          <StreamTimeline />
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">{t("claimable_now")}</p>
            <div className="text-3xl font-bold">
              <LiveCounter flowRate={0} lastWithdrawTime={new Date()} />
            </div>
          </div>
          <div className="flex gap-4">
            <Button fullWidth>{t("withdraw")}</Button>
            <Button fullWidth variant="danger">{t("cancel")}</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
